/**
 * Signed unsubscribe links.
 *
 * The link in an email carries the address plus a signature. Without the
 * signature the address is ignored, so nobody can unsubscribe somebody else
 * by editing a URL, and the links cannot be guessed.
 *
 * The signing key is UNSUBSCRIBE_SECRET when it is set. If it is not, the
 * Resend API key is used instead — it is already a server-only secret, and it
 * saves setting up another variable. Setting UNSUBSCRIBE_SECRET is tidier:
 * rotating the Resend key would otherwise invalidate links already sent.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

const b64url = (buffer) =>
  Buffer.from(buffer).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const fromB64url = (text) =>
  Buffer.from(text.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");

function signingKey() {
  const key = process.env.UNSUBSCRIBE_SECRET || process.env.RESEND_API_KEY;
  if (!key) throw new Error("No signing key available for unsubscribe links.");
  return key;
}

const sign = (email) =>
  b64url(createHmac("sha256", signingKey()).update(email.toLowerCase()).digest());

/** The full link to put in an email. */
export function unsubscribeUrl(origin, email) {
  const e = b64url(email);
  const t = sign(email);
  return `${origin}/api/unsubscribe?e=${e}&t=${t}`;
}

/** Returns the address when the signature checks out, otherwise null. */
export function verifyUnsubscribe(e, t) {
  if (!e || !t) return null;
  let email;
  try {
    email = fromB64url(e);
  } catch {
    return null;
  }
  const expected = Buffer.from(sign(email));
  const given = Buffer.from(t);
  if (expected.length !== given.length) return null;
  return timingSafeEqual(expected, given) ? email : null;
}
