"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Mailing list signup.
 *
 * Posts to /api/subscribe, a small function running on Netlify that holds the
 * Resend key privately and never exposes it to the browser. The form action is
 * set as well, so with JavaScript switched off the browser posts normally and
 * the function redirects back — a signup is never silently lost.
 */

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done"; already: boolean }
  | { kind: "error"; message: string };

const GENERIC_ERROR =
  "That didn’t go through. Please try again in a moment, or email us and we’ll add you by hand.";

export default function Newsletter() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = data.get("email");
    if (typeof email !== "string" || !email) return;

    setState({ kind: "sending" });
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({ email, website: data.get("website") ?? "" }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; already?: boolean; message?: string }
        | null;

      if (response.ok && result?.ok) {
        setState({ kind: "done", already: Boolean(result.already) });
        form.reset();
        return;
      }

      setState({ kind: "error", message: result?.message || GENERIC_ERROR });
    } catch {
      setState({ kind: "error", message: GENERIC_ERROR });
    }
  }

  if (state.kind === "done") {
    return (
      <div aria-live="polite">
        <p className="text-[1.02rem] leading-[1.8] text-ink">
          {state.already
            ? "You’re already on the NeuroFlutter mailing list."
            : "Thank you for joining the NeuroFlutter mailing list."}
        </p>
        <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-soft">
          {state.already
            ? "Nothing more to do — the next update will reach you."
            : "A welcome email is on its way. It occasionally lands in spam, so it is worth a glance there too."}
        </p>
      </div>
    );
  }

  return (
    <form
      action="/api/subscribe"
      method="post"
      onSubmit={onSubmit}
      className="newsletter-form"
    >
      <p
        className="mb-4 text-[0.92rem] text-maroon empty:hidden"
        role="alert"
        aria-live="assertive"
      >
        {state.kind === "error" ? state.message : ""}
      </p>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="nf-email" className="block text-[0.9rem] text-ink-soft">
            Email address
          </label>
          <input
            id="nf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-label="Email address"
            className="mt-2 w-full border-b border-maroon/30 bg-transparent px-1 py-2.5 text-[1rem] text-ink focus:border-maroon focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={state.kind === "sending"}
          className="btn-ink shrink-0"
        >
          <span>{state.kind === "sending" ? "Joining…" : "Join the Mailing List"}</span>
        </button>
      </div>

      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 overflow-hidden">
        <label htmlFor="nf-website">Website</label>
        <input id="nf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-5 flex items-start gap-3 text-[0.88rem] leading-relaxed text-ink-soft">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          className="mt-1 accent-[var(--color-maroon)]"
        />
        <span>
          I agree to receive emails from NeuroFlutter and understand my address
          will be stored for this purpose only, as described in the{" "}
          <Link href="/privacy/" className="link-quiet">
            privacy notice
          </Link>
          .
        </span>
      </label>

      <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-soft">
        Occasional updates, always with curiosity. Unsubscribe whenever you
        like.
      </p>
    </form>
  );
}
