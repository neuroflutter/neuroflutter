"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Mailing list signup, posting to Kit (kit.com).
 *
 * The form submits itself rather than relying on Kit's ck.5.js embed script.
 * That script intercepts the submit and then renders its result into markup
 * this form does not have, so a signup could finish with the form simply
 * disappearing and no confirmation shown. Posting directly keeps the outcome
 * explicit and on the page.
 *
 * The form action is still set, so with JavaScript switched off the browser
 * posts to Kit normally and nothing is lost. The form id is a public
 * identifier from Kit's embed code — there is no key or token here.
 */

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done" }
  | { kind: "error"; message: string };

const GENERIC_ERROR =
  "That didn’t go through. Please try again in a moment, or email us and we’ll add you by hand.";

export default function Newsletter() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = new FormData(form).get("email_address");
    if (typeof email !== "string" || !email) return;

    setState({ kind: "sending" });
    try {
      const response = await fetch(site.newsletterEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email_address: email }).toString(),
      });

      const result = (await response.json().catch(() => null)) as
        | { status?: string; message?: string; error?: { message?: string } }
        | null;

      if (response.ok && result?.status === "success") {
        setState({ kind: "done" });
        form.reset();
        return;
      }

      if (result?.status === "quarantined") {
        // Kit's anti-abuse guard, usually after repeated attempts.
        setState({
          kind: "error",
          message:
            "Kit has paused signups from this connection for a short while. Please try again later, or email us and we’ll add you.",
        });
        return;
      }

      setState({
        kind: "error",
        message: result?.error?.message || result?.message || GENERIC_ERROR,
      });
    } catch {
      setState({ kind: "error", message: GENERIC_ERROR });
    }
  }

  if (state.kind === "done") {
    return (
      <div aria-live="polite">
        <p className="text-[1.02rem] leading-[1.8] text-ink">
          Thank you for joining the NeuroFlutter mailing list.
        </p>
        <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-soft">
          Look out for an email from us shortly. It occasionally lands in spam,
          so it is worth a glance there too.
        </p>
      </div>
    );
  }

  return (
    <form
      action={site.newsletterEndpoint}
      method="post"
      onSubmit={onSubmit}
      className="seva-form formkit-form"
      data-sv-form={site.kitFormId}
      data-uid={site.kitFormUid}
      data-format="inline"
      data-version="5"
    >
      <p
        className="formkit-alert formkit-alert-error mb-4 text-[0.92rem] text-maroon empty:hidden"
        data-element="errors"
        data-group="alert"
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
            name="email_address"
            type="email"
            required
            autoComplete="email"
            aria-label="Email address"
            className="formkit-input mt-2 w-full border-b border-maroon/30 bg-transparent px-1 py-2.5 text-[1rem] text-ink focus:border-maroon focus:outline-none"
          />
        </div>
        <button
          type="submit"
          data-element="submit"
          disabled={state.kind === "sending"}
          className="btn-ink shrink-0"
        >
          <span>{state.kind === "sending" ? "Joining…" : "Join the Mailing List"}</span>
        </button>
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
