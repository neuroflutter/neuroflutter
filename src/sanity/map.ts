import { imageUrl } from "./client";
import type { Article, Author, Category, ContributionKind } from "@/content/types";

/** The six categories the Learn filters are built around. */
const KNOWN_CATEGORIES: Category[] = [
  "Neuroscience Explained",
  "Neurodegenerative Diseases",
  "Brain and Behaviour",
  "Research and Discovery",
  "Neuroscience and Society",
  "Perspectives",
];

const KNOWN_KINDS: ContributionKind[] = [
  "Research",
  "Explainer",
  "Perspective",
  "Artwork",
];

/**
 * Keeps a category coming out of the CMS inside the set the site renders, so a
 * typo in Sanity can never break the Learn page filters.
 */
function safeCategory(value: unknown): Category {
  const found = KNOWN_CATEGORIES.find((c) => c === value);
  return found ?? "Neuroscience Explained";
}

function safeKind(value: unknown): ContributionKind {
  const found = KNOWN_KINDS.find((k) => k === value);
  return found ?? "Explainer";
}

/** Rough reading time, used only when an editor leaves the field blank. */
function estimateMinutes(blocks: unknown): number {
  if (!Array.isArray(blocks)) return 1;
  let words = 0;
  for (const block of blocks) {
    const children = (block as { children?: { text?: string }[] })?.children;
    if (!Array.isArray(children)) continue;
    for (const child of children) {
      words += (child?.text || "").trim().split(/\s+/).filter(Boolean).length;
    }
  }
  return Math.max(1, Math.round(words / 200));
}

type RawAuthor = {
  id: string;
  name: string;
  role?: string;
  bio?: string;
  affiliation?: string;
  expertise?: string[];
  links?: { label?: string; href?: string }[];
  imageRef?: unknown;
  imageAlt?: string;
};

export function mapAuthor(raw: RawAuthor): Author {
  return {
    id: raw.id,
    name: raw.name,
    role: raw.role || "",
    bio: raw.bio || "",
    affiliation: raw.affiliation || undefined,
    expertise: (raw.expertise || []).filter(Boolean),
    links: (raw.links || [])
      .filter((l) => l?.label && l?.href)
      .map((l) => ({ label: l.label as string, href: l.href as string })),
    image: raw.imageRef ? imageUrl(raw.imageRef, 640) || undefined : undefined,
    imageAlt: raw.imageAlt || undefined,
  };
}

type RawArticle = {
  slug: string;
  title: string;
  standfirst?: string;
  authorId?: string;
  category?: string;
  kind?: string;
  date?: string;
  readingMinutes?: number;
  imageRef?: unknown;
  imageAlt?: string;
  imageCredit?: string;
  featured?: boolean;
  portableBody?: unknown[];
  references?: { text?: string; href?: string }[];
  tags?: string[];
  externalLinks?: { label?: string; href?: string }[];
  supportingFiles?: { label?: string; href?: string }[];
  seo?: {
    title?: string;
    description?: string;
    imageRef?: unknown;
    noIndex?: boolean;
  };
  isDraft?: boolean;
};

export function mapArticle(raw: RawArticle): Article {
  const links = (raw.externalLinks || [])
    .filter((l) => l?.label && l?.href)
    .map((l) => ({ label: l.label as string, href: l.href as string }));

  const files = (raw.supportingFiles || [])
    .filter((f) => f?.label && f?.href)
    .map((f) => ({ label: f.label as string, href: f.href as string }));

  return {
    slug: raw.slug,
    title: raw.title,
    standfirst: raw.standfirst || "",
    authorId: raw.authorId || "",
    category: safeCategory(raw.category),
    kind: safeKind(raw.kind),
    date: (raw.date || "").slice(0, 10),
    readingMinutes: raw.readingMinutes || estimateMinutes(raw.portableBody),
    image: raw.imageRef ? imageUrl(raw.imageRef, 1200) : "",
    imageAlt: raw.imageAlt || "",
    imageCredit: raw.imageCredit || undefined,
    featured: Boolean(raw.featured),
    // Legacy field kept empty: Sanity bodies render through `portableBody`.
    body: [],
    portableBody: (raw.portableBody || []) as Article["portableBody"],
    references: (raw.references || [])
      .filter((r) => r?.text)
      .map((r) => ({ text: r.text as string, href: r.href || undefined })),
    tags: (raw.tags || []).filter(Boolean),
    externalLinks: links.length ? links : undefined,
    supportingFiles: files.length ? files : undefined,
    seo: raw.seo
      ? {
          title: raw.seo.title || undefined,
          description: raw.seo.description || undefined,
          image: raw.seo.imageRef ? imageUrl(raw.seo.imageRef, 1200) : undefined,
          noIndex: Boolean(raw.seo.noIndex),
        }
      : undefined,
    isDraft: Boolean(raw.isDraft),
  };
}
