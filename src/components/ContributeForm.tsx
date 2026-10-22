"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { contributorTopics, OTHER_TOPIC } from "@/content/topics";

const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

const field =
  "mt-2 w-full border-b border-maroon/30 bg-transparent px-1 py-2.5 text-[1rem] text-ink focus:border-maroon focus:outline-none";
const label = "block text-[0.9rem] text-ink-soft";

export default function ContributeForm() {
  const live = Boolean(endpoint);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [topic, setTopic] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // Honeypot: real people leave this empty.
    if ((form.elements.namedItem("website") as HTMLInputElement)?.value) return;
    if (!live) return;
    setState("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setState("done");
        form.reset();
        setTopic("");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="bg-blue px-8 py-12">
        <h3 className="text-[1.5rem] leading-[1.2]">Your idea is with us.</h3>
        <p className="mt-4 max-w-[34rem] text-[1.02rem] leading-[1.8] text-ink">
          Thank you for your interest in contributing to NeuroFlutter. We look
          forward to discovering what you&apos;re curious about. We read every
          proposal and will be in touch if it&apos;s a good fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-9">
      <div className="grid gap-9 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">
            Full Name *
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="affiliation">
            Affiliation (Optional)
          </label>
          <input id="affiliation" name="affiliation" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="area">
            What Is Your Article About? *
          </label>
          <select
            id="area"
            name="area"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            aria-describedby="area-help"
            className={`${field} appearance-none`}
          >
            <option value="">Please choose…</option>
            {contributorTopics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <p id="area-help" className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
            Choose the neuroscience topic that best describes your proposed
            article.
          </p>
        </div>
      </div>

      {topic === OTHER_TOPIC && (
        <div>
          <label className={label} htmlFor="areaOther">
            Which Topic Is It? (Optional)
          </label>
          <input
            id="areaOther"
            name="areaOther"
            className={field}
            placeholder="Tell us briefly what your article covers"
          />
        </div>
      )}

      <div>
        <label className={label} htmlFor="title">
          Proposed Article Title *
        </label>
        <input id="title" name="title" required className={field} />
      </div>

      <div>
        <label className={label} htmlFor="idea">
          Tell Us About Your Idea *
        </label>
        <textarea id="idea" name="idea" required rows={6} className={field} />
      </div>

      <div>
        <label className={label} htmlFor="bio">
          Short Biography (Optional)
        </label>
        <textarea id="bio" name="bio" rows={3} className={field} />
      </div>

      <div>
        <label className={label} htmlFor="links">
          Relevant Links or References (Optional)
        </label>
        <input id="links" name="links" className={field} />
      </div>

      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-4 pt-1">
        <label className="flex items-start gap-3 text-[0.88rem] leading-relaxed text-ink-soft">
          <input type="checkbox" name="ownWork" required className="mt-1 accent-[var(--color-maroon)]" />
          <span>
            This proposal is my own work, and I&apos;m happy to be credited as
            its author if it is published. *
          </span>
        </label>
        <label className="flex items-start gap-3 text-[0.88rem] leading-relaxed text-ink-soft">
          <input type="checkbox" name="privacy" required className="mt-1 accent-[var(--color-maroon)]" />
          <span>
            I understand my details will be used only to review and reply to
            this proposal, as described in the{" "}
            <Link href="/privacy/" className="link-quiet">
              privacy notice
            </Link>
            . *
          </span>
        </label>
      </div>

      <div>
        <button
          type="submit"
          disabled={!live || state === "sending"}
          className={`${live ? "btn-ink" : "btn-outline cursor-not-allowed"}`}
        >
          {state === "sending" ? "Sending…" : "Submit Your Idea"}
        </button>

        <p className="mt-5 max-w-[34rem] text-[0.92rem] leading-relaxed text-ink-soft">
          Thank you for your interest in contributing to NeuroFlutter. We look
          forward to discovering what you&apos;re curious about.
        </p>

        {!live && (
          <p className="mt-4 max-w-[34rem] text-[0.92rem] leading-relaxed text-maroon">
            Submissions by form open shortly. Until then, please send your idea
            to{" "}
            <a href={`mailto:${site.email}`} className="link-quiet">
              {site.email}
            </a>{" "}
            and we&apos;ll reply the same way.
          </p>
        )}
        {state === "error" && (
          <p className="mt-4 max-w-[34rem] text-[0.92rem] leading-relaxed text-maroon">
            Your proposal didn&apos;t reach us. Nothing was sent, so please try
            again, or email it to{" "}
            <a href={`mailto:${site.email}`} className="link-quiet">
              {site.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
