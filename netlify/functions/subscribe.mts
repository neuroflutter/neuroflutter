/**
 * Mailing-list signup.
 *
 * Runs on Netlify, not in the visitor's browser. That matters: the Resend API
 * key is a password, and this is the only place it is ever read. Nothing in
 * the website's HTML or JavaScript contains it.
 *
 * What it does, in order:
 *   1. checks the address looks like an address
 *   2. adds the person to the Resend audience
 *   3. sends them the welcome email
 *
 * A person who is already subscribed gets a polite "you're already on the
 * list" rather than a second welcome email.
 */
import { welcomeEmail } from "../lib/welcome-email.mjs";
import { unsubscribeUrl } from "../lib/unsubscribe-token.mjs";

const RESEND_API = "https://api.resend.com";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Outcome = { ok: true; already?: boolean } | { ok: false; message: string };

function json(body: Outcome, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

/** Reads the address out of either a JSON body or a plain form post. */
async function readSubmission(request: Request) {
  const type = request.headers.get("content-type") || "";
  if (type.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    return {
      email: String(body.email ?? "").trim(),
      website: String(body.website ?? "").trim(),
      formPost: false,
    };
  }
  const form = await request.formData();
  return {
    email: String(form.get("email") ?? "").trim(),
    website: String(form.get("website") ?? "").trim(),
    formPost: true,
  };
}

export default async (request: Request) => {
  if (request.method !== "POST") {
    return json({ ok: false, message: "Method not allowed." }, 405);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const from = process.env.MAIL_FROM || "NeuroFlutter <hello@neuroflutter.com>";

  if (!apiKey || !audienceId) {
    console.error("RESEND_API_KEY or RESEND_AUDIENCE_ID is not set.");
    return json(
      { ok: false, message: "The mailing list is not connected yet. Please try again later." },
      503,
    );
  }

  const { email, website, formPost } = await readSubmission(request);

  // Honeypot: real people leave this empty. Answer as though it worked, so a
  // bot learns nothing from the response.
  if (website) return json({ ok: true }, 200);

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return json({ ok: false, message: "That email address doesn't look right." }, 400);
  }

  const auth = { authorization: `Bearer ${apiKey}`, "content-type": "application/json" };

  /* ----------------------------------------------------- add to the list */
  let already = false;
  try {
    const res = await fetch(`${RESEND_API}/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: auth,
      body: JSON.stringify({ email, unsubscribed: false }),
    });

    if (!res.ok) {
      const detail = await res.text();
      // Resend answers with a conflict when the address is already there.
      if (res.status === 409 || /already exists/i.test(detail)) {
        already = true;
      } else {
        console.error("Resend contact create failed", res.status, detail);
        return json(
          { ok: false, message: "We couldn't add you just now. Please try again in a moment." },
          502,
        );
      }
    }
  } catch (error) {
    console.error("Resend contact create threw", error);
    return json(
      { ok: false, message: "We couldn't add you just now. Please try again in a moment." },
      502,
    );
  }

  /* --------------------------------------------------- the welcome email */
  if (!already) {
    const origin = new URL(request.url).origin;
    const unsubscribe = unsubscribeUrl(origin, email);
    try {
      const res = await fetch(`${RESEND_API}/emails`, {
        method: "POST",
        headers: auth,
        body: JSON.stringify({
          from,
          to: [email],
          subject: "Welcome to NeuroFlutter",
          html: welcomeEmail({ unsubscribeUrl: unsubscribe }),
          text: welcomeEmailText(unsubscribe),
          headers: {
            // Lets Gmail and Apple Mail show their own one-click unsubscribe.
            "List-Unsubscribe": `<${unsubscribe}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          },
        }),
      });
      if (!res.ok) {
        // The person IS subscribed; only the greeting failed. Not worth an error.
        console.error("Resend welcome email failed", res.status, await res.text());
      }
    } catch (error) {
      console.error("Resend welcome email threw", error);
    }
  }

  // A plain form post (JavaScript switched off) gets a redirect it can follow.
  if (formPost) {
    const site = new URL(request.url).origin;
    return Response.redirect(`${site}/?subscribed=1`, 303);
  }

  return json({ ok: true, already }, 200);
};

function welcomeEmailText(unsubscribe: string) {
  return [
    "WELCOME TO NEUROFLUTTER",
    "",
    "You're part of the beginning.",
    "",
    "Thank you for joining NeuroFlutter!",
    "",
    "NeuroFlutter is a space where neuroscience meets research, art and",
    "creativity. A place to explore ideas, discover different perspectives on",
    "the brain and connect with the people behind the science.",
    "",
    "We're so happy you're here.",
    "",
    "WHAT TO EXPECT",
    "",
    "Thoughtful articles, research insights, scientific illustrations and",
    "creative perspectives from our growing community of researchers and",
    "creatives. You'll also be the first to hear about new features, exciting",
    "developments and opportunities to contribute your own work.",
    "",
    "Curiosity connects us. Science brings us together.",
    "",
    "BE PART OF THE CONVERSATION",
    "",
    "Have something you'd love to share? Whether it's research, artwork, an",
    "interesting idea or simply a question, we'd love to hear from you.",
    "",
    "Just reply to this email. NeuroFlutter is all about the people and ideas",
    "that make science worth exploring.",
    "",
    "Explore NeuroFlutter: https://neuroflutter.com/",
    "",
    "Hala Al Masri",
    "Founder, NeuroFlutter",
    "",
    "You're receiving this email because you subscribed to NeuroFlutter at",
    "neuroflutter.com. You can unsubscribe from future emails at any time:",
    unsubscribe,
  ].join("\n");
}

export const config = {
  path: "/api/subscribe",
};
