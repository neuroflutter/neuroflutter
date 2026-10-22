/**
 * The single place the site asks for its content.
 *
 * Two sources, in this order of authority:
 *
 *   1. Sanity — once NEXT_PUBLIC_SANITY_PROJECT_ID is set.
 *   2. The original text files in src/content — which still hold the two
 *      articles carried over from the first version of the site.
 *
 * Sanity wins where both describe the same thing, matched on the article slug
 * or the author id. That means nothing already published disappears when the
 * CMS is switched on, and every URL stays exactly where it was.
 *
 * All of this runs while the site is being built. None of it runs in a
 * visitor's browser, so no token is ever exposed.
 */
import { sanityClient } from "@/sanity/client";
import { sanityConfigured, includeDrafts, projectId } from "@/sanity/env";
import { articlesQuery, authorsQuery } from "@/sanity/queries";
import { mapArticle, mapAuthor } from "@/sanity/map";
import { sortedArticles as localArticles, categories } from "@/content/articles";
import { authors as localAuthors } from "@/content/authors";
import type { Article, Author } from "@/content/types";

export { categories };

let cache: { articles: Article[]; authors: Author[] } | null = null;

/** Later entries win. Used so Sanity overrides the built-in content. */
function mergeBy<T>(key: (item: T) => string, ...groups: T[][]): T[] {
  const out = new Map<string, T>();
  for (const group of groups) {
    for (const item of group) {
      const k = key(item);
      if (k) out.set(k, item);
    }
  }
  return [...out.values()];
}

async function load(): Promise<{ articles: Article[]; authors: Author[] }> {
  if (cache) return cache;

  if (!sanityConfigured) {
    // Exactly the behaviour the site had before the CMS existed.
    cache = { articles: [...localArticles], authors: [...localAuthors] };
    return cache;
  }

  let rawArticles: unknown[];
  let rawAuthors: unknown[];
  try {
    [rawArticles, rawAuthors] = await Promise.all([
      sanityClient.fetch(articlesQuery),
      sanityClient.fetch(authorsQuery),
    ]);
  } catch (error) {
    // Deliberately fatal. Falling back quietly would rebuild the site without
    // whatever was just published, which looks like content vanishing.
    throw new Error(
      `Could not read content from Sanity (project "${projectId}"). ` +
        `The build has been stopped so the live site is not replaced with ` +
        `out-of-date content. Original error: ${(error as Error).message}`,
    );
  }

  const fromSanity = (rawArticles as Parameters<typeof mapArticle>[0][])
    .filter((a) => a?.slug && a?.title)
    .map(mapArticle)
    // A draft and its published version share a slug; on the preview site the
    // draft is the one worth looking at.
    .sort((a, b) => Number(a.isDraft) - Number(b.isDraft));

  const articles = mergeBy<Article>(
    (a) => a.slug,
    localArticles,
    fromSanity,
  ).sort((a, b) => b.date.localeCompare(a.date));

  const authors = mergeBy<Author>(
    (a) => a.id,
    localAuthors,
    (rawAuthors as Parameters<typeof mapAuthor>[0][])
      .filter((a) => a?.id && a?.name)
      .map(mapAuthor),
  );

  cache = { articles, authors };
  return cache;
}

/** Everything that should appear on the public site, newest first. */
export async function getArticles(): Promise<Article[]> {
  const { articles } = await load();
  return articles.filter((a) => includeDrafts || !a.isDraft);
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  return (await getArticles()).find((a) => a.slug === slug);
}

export async function getAuthors(): Promise<Author[]> {
  const { authors } = await load();
  return authors;
}

export async function getAuthor(id: string): Promise<Author | undefined> {
  return (await getAuthors()).find((a) => a.id === id);
}

/**
 * Used where a page needs an author but must not crash if a reference is
 * missing — mirrors the old getAuthor() fallback behaviour.
 */
export async function getAuthorOrFirst(id: string): Promise<Author> {
  const authors = await getAuthors();
  return authors.find((a) => a.id === id) ?? authors[0];
}
