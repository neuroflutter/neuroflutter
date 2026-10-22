"use client";

import { useMemo, useState } from "react";
import ArticleTeaser from "./ArticleTeaser";
import type { Article } from "@/content/types";

export default function LearnBrowser({
  articles,
  categories,
}: {
  articles: Article[];
  categories: readonly string[];
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("All");

  const used = useMemo(
    () => categories.filter((c) => articles.some((a) => a.category === c)),
    [articles, categories],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const inCategory = active === "All" || a.category === active;
      if (!inCategory) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.standfirst.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    });
  }, [articles, query, active]);

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-blue-deep/50 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {["All", ...used].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              data-nf-filter={c}
              className={`text-[0.92rem] transition-colors ${
                active === c
                  ? "text-maroon underline underline-offset-[6px]"
                  : "text-ink-soft hover:text-maroon"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative lg:w-72">
          <label className="sr-only" htmlFor="learn-search">
            Search articles
          </label>
          <input
            id="learn-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="w-full border-b border-maroon/25 bg-transparent py-2 pr-7 text-[0.95rem] placeholder:text-ink-soft/60 focus:border-maroon focus:outline-none"
          />
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="pointer-events-none absolute right-0 top-2.5 h-4 w-4 text-ink-soft"
          >
            <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13.5 13.5 L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <p className="mt-6 text-[0.85rem] text-ink-soft" role="status" data-nf-count>
        {results.length} {results.length === 1 ? "article" : "articles"}
        {active !== "All" && ` in ${active}`}
      </p>

      {results.length === 0 ? (
        <p data-nf-empty className="mt-16 max-w-md text-ink-soft">
          Nothing matches that yet. Try a different search, or browse all
          categories.
        </p>
      ) : (
        <div
          data-nf-grid
          className="mt-12 grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {results.map((a) => (
            <ArticleTeaser key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
