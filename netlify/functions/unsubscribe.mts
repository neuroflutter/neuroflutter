/**
 * Unsubscribe.
 *
 * Reached from the link at the foot of every NeuroFlutter email. The address
 * is carried in the link along with a signature, so the link works without a
 * login and cannot be used against anyone else's address.
 *
 * Answers with a page in the site's own colours rather than bare text.
 */
import { verifyUnsubscribe } from "../lib/unsubscribe-token.mjs";

const RESEND_API = "https://api.resend.com";

const PAPER = "#f3fafd";
const BLUE_DEEP = "#c9e2f0";
const MAROON = "#78364d";
const INK = "#465560";
const INK_SOFT = "#6e7c87";
const SERIF = "Georgia, 'Times New Roman', Times, serif";

function page(heading: string, body: string, status: number) {
  return new Response(
    `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${heading} · NeuroFlutter</title>
</head>
<body style="margin:0;background:${PAPER};">
  <div style="max-width:34rem;margin:0 auto;padding:18vh 24px 0;text-align:center;">
    <p style="margin:0 0 28px;font-family:${SERIF};font-size:26px;color:${MAROON};">NeuroFlutter</p>
    <div style="height:1px;background:${BLUE_DEEP};"></div>
    <h1 style="margin:36px 0 16px;font-family:${SERIF};font-size:30px;font-style:italic;font-weight:400;line-height:1.2;color:${INK};">${heading}</h1>
    <p style="margin:0 0 32px;font-family:${SERIF};font-size:16px;line-height:1.8;color:${INK_SOFT};">${body}</p>
    <a href="https://neuroflutter.com/"
       style="display:inline-block;padding:13px 28px;background:${MAROON};color:#f6fbfd;font-family:${SERIF};font-size:13px;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none;">
      Back to NeuroFlutter
    </a>
  </div>
</body>
</html>`,
    { status, headers: { "content-type": "text/html; charset=utf-8" } },
  );
}

async function removeFromAudience(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("Resend is not configured.");

  const res = await fetch(
    `${RESEND_API}/contacts/${encodeURIComponent(email)}`,
    {
      method: "PATCH",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({ unsubscribed: true }),
    },
  );

  // A contact that is not there is already, in effect, unsubscribed.
  if (!res.ok && res.status !== 404) {
    throw new Error(`Resend answered ${res.status}: ${await res.text()}`);
  }
}

export default async (request: Request) => {
  const url = new URL(request.url);
  const email = verifyUnsubscribe(url.searchParams.get("e"), url.searchParams.get("t"));

  if (!email) {
    return page(
      "That link didn't work.",
      "It may have been broken by your email app. Reply to any NeuroFlutter email with the word <em>unsubscribe</em> and you will be removed by hand.",
      400,
    );
  }

  try {
    await removeFromAudience(email);
  } catch (error) {
    console.error("Unsubscribe failed", error);
    return page(
      "Something went wrong.",
      "You have not been removed. Please reply to any NeuroFlutter email with the word <em>unsubscribe</em> and it will be done by hand.",
      502,
    );
  }

  return page(
    "You're unsubscribed.",
    "You won't receive any more emails from NeuroFlutter. Thank you for the time you spent with us — the door stays open if you change your mind.",
    200,
  );
};

export const config = {
  path: "/api/unsubscribe",
};
