/**
 * Contributor proposals from the Contribute page.
 *
 * Runs on Netlify, not in the visitor's browser, for the same reason as
 * subscribe.mts: the Resend API key is a password and this is the only place
 * it is read.
 *
 * What it does, in order:
 *   1. checks the required answers are there and the address looks like one
 *   2. emails the proposal to the editorial inbox
 *
 * The email is sent with reply-to set to the contributor, so answering a
 * proposal is just hitting Reply.
 */
import { welcomeEmail } from "../lib/welcome-email.mjs";
import { unsubscribeUrl } from "../lib/unsubscribe-token.mjs";

const RESEND_API = "https://api.resend.com";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Every field the form can send, in the order they appear on the page. */
const FIELDS = [
  "name",
  "email",
  "affiliation",
  "area",
  "areaOther",
  "title",
  "idea",
  "bio",
  "links",
  "ownWork",
  "privacy",
] as const;

type Field = (typeof FIELDS)[number];
type Submission = Record<Field, string> & {
  website: string;
  newsletter: boolean;
  formPost: boolean;
};

type Outcome = { ok: true } | { ok: false; message: string };

function json(body: Outcome, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

/** Reads the answers out of either a plain form post or a JSON body. */
async function readSubmission(request: Request): Promise<Submission> {
  const type = request.headers.get("content-type") || "";
  const out = {} as Submission;

  if (type.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    for (const field of FIELDS) out[field] = String(body[field] ?? "").trim();
    out.website = String((body as Record<string, unknown>).website ?? "").trim();
    out.newsletter = Boolean((body as Record<string, unknown>).newsletter);
    out.formPost = false;
    return out;
  }

  const form = await request.formData();
  for (const field of FIELDS) out[field] = String(form.get(field) ?? "").trim();
  out.website = String(form.get("website") ?? "").trim();
  // An unticked checkbox is absent from the form data entirely.
  out.newsletter = form.get("newsletter") !== null;
  out.formPost = true;
  return out;
}

/** Trims anything absurd before it reaches an inbox. */
function clamp(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

/** "NeuroFlutter <hello@neuroflutter.com>" -> "hello@neuroflutter.com" */
function addressOnly(from: string) {
  const match = /<([^>]+)>/.exec(from);
  return (match ? match[1] : from).trim();
}

/**
 * A display name safe to put in a header. Quotes, angle brackets and line
 * breaks are what header injection is made of.
 */
function displayName(value: string) {
  return value.replace(/["<>\r\n]/g, " ").replace(/\s+/g, " ").trim().slice(0, 60);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const LABELS: Record<Field, string> = {
  name: "Name",
  email: "Email",
  affiliation: "Affiliation",
  area: "Topic",
  areaOther: "Topic (other)",
  title: "Proposed title",
  idea: "The idea",
  bio: "Short biography",
  links: "Links and references",
  ownWork: "Confirmed own work",
  privacy: "Accepted privacy wording",
};

/** The proposal, laid out so it reads well in an inbox. */
function proposalText(sub: Submission) {
  const lines = ["NEW CONTRIBUTOR PROPOSAL", ""];
  for (const field of FIELDS) {
    const value = sub[field];
    if (!value) continue;
    lines.push(`${LABELS[field].toUpperCase()}`, value, "");
  }
  lines.push(
    "MAILING LIST",
    sub.newsletter ? "Asked to be added" : "Not requested",
    "",
    "—",
    "Sent from the Contribute form on neuroflutter.com",
  );
  return lines.join("\n");
}

function proposalHtml(sub: Submission) {
  const rows = FIELDS.filter((field) => sub[field])
    .map((field) => {
      const value = escapeHtml(sub[field]).replace(/\n/g, "<br>");
      return `
      <tr>
        <td style="padding:10px 16px 10px 0;font-family:Georgia,serif;font-size:13px;color:#6e7c87;vertical-align:top;white-space:nowrap;">${LABELS[field]}</td>
        <td style="padding:10px 0;font-family:Georgia,serif;font-size:15px;line-height:1.6;color:#465560;">${value}</td>
      </tr>`;
    })
    .join("");

  return `<!doctype html>
<html lang="en-GB"><body style="margin:0;padding:24px;background:#f3fafd;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;margin:0 auto;background:#ffffff;padding:28px 32px;">
    <tr><td style="padding-bottom:18px;border-bottom:1px solid #c9e2f0;font-family:Georgia,serif;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#9a6779;">New contributor proposal</td></tr>
    <tr><td style="padding-top:8px;"><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;">${rows}</table></td></tr>
    <tr><td style="padding-top:14px;font-family:Georgia,serif;font-size:13px;color:#6e7c87;">Mailing list: ${sub.newsletter ? "asked to be added" : "not requested"}</td></tr>
    <tr><td style="padding-top:18px;border-top:1px solid #c9e2f0;font-family:Georgia,serif;font-size:12px;color:#8a939b;">Sent from the Contribute form on neuroflutter.com</td></tr>
  </table>
</body></html>`;
}

export default async (request: Request) => {
  if (request.method !== "POST") {
    return json({ ok: false, message: "Method not allowed." }, 405);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM || "NeuroFlutter <hello@neuroflutter.com>";
  // Where proposals land. The editorial inbox unless told otherwise.
  const to = process.env.CONTACT_TO || "neuroflutter@outlook.com";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set.");
    return json(
      { ok: false, message: "The form is not connected yet. Please email us instead." },
      503,
    );
  }

  const sub = await readSubmission(request);

  // Honeypot: real people leave this empty. Answer as though it worked, so a
  // bot learns nothing from the response.
  if (sub.website) return json({ ok: true }, 200);

  if (!sub.name || !sub.title || !sub.idea) {
    return json({ ok: false, message: "Please fill in the required fields." }, 400);
  }
  if (!EMAIL_PATTERN.test(sub.email) || sub.email.length > 254) {
    return json({ ok: false, message: "That email address doesn't look right." }, 400);
  }

  // Keep a single oversized paste from bouncing the whole message.
  for (const field of FIELDS) sub[field] = clamp(sub[field], 5000);

  try {
    const res = await fetch(`${RESEND_API}/emails`, {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        // Shows in the inbox as "Jane Okafor via NeuroFlutter", so you can see
        // who wrote in without opening it. Replies still go to them.
        from: `"${displayName(sub.name)} via NeuroFlutter" <${addressOnly(from)}>`,
        to: [to],
        reply_to: sub.email,
        subject: `Contributor proposal — ${clamp(displayName(sub.name), 60)} — ${clamp(sub.title, 90)}`,
        text: proposalText(sub),
        html: proposalHtml(sub),
      }),
    });

    if (!res.ok) {
      console.error("Resend proposal email failed", res.status, await res.text());
      return json(
        { ok: false, message: "We couldn't send that just now. Please try again in a moment." },
        502,
      );
    }
  } catch (error) {
    console.error("Resend proposal email threw", error);
    return json(
      { ok: false, message: "We couldn't send that just now. Please try again in a moment." },
      502,
    );
  }

  /* ------------------------------------------- optional mailing-list signup */
  // Only where the person ticked the box. Proposing is never enough on its
  // own: the privacy notice promises that, and consent has to be a separate,
  // positive act. A failure here must not lose the proposal, which has
  // already been sent, so everything below only logs.
  if (sub.newsletter) {
    const auth = { authorization: `Bearer ${apiKey}`, "content-type": "application/json" };
    const segmentId = process.env.RESEND_SEGMENT_ID;
    try {
      const res = await fetch(`${RESEND_API}/contacts`, {
        method: "POST",
        headers: auth,
        body: JSON.stringify({
          email: sub.email,
          unsubscribed: false,
          ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
        }),
      });

      const detail = res.ok ? "" : await res.text();
      const already = !res.ok && (res.status === 409 || /already exists/i.test(detail));
      if (!res.ok && !already) {
        console.error("Newsletter opt-in: contact create failed", res.status, detail);
      }

      if (res.ok) {
        const unsubscribe = unsubscribeUrl(new URL(request.url).origin, sub.email);
        const welcome = await fetch(`${RESEND_API}/emails`, {
          method: "POST",
          headers: auth,
          body: JSON.stringify({
            from,
            to: [sub.email],
            subject: "Welcome to NeuroFlutter",
            html: welcomeEmail({ unsubscribeUrl: unsubscribe }),
            headers: {
              "List-Unsubscribe": `<${unsubscribe}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
          }),
        });
        if (!welcome.ok) {
          console.error("Newsletter opt-in: welcome email failed", welcome.status, await welcome.text());
        }
      }
    } catch (error) {
      console.error("Newsletter opt-in threw", error);
    }
  }

  // A plain form post (JavaScript switched off) gets a redirect it can follow.
  if (sub.formPost) {
    const site = new URL(request.url).origin;
    return Response.redirect(`${site}/contribute/?sent=1`, 303);
  }

  return json({ ok: true }, 200);
};

export const config = {
  path: "/api/contribute",
};
