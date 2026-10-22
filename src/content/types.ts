import type { PortableTextBlock } from "@portabletext/types";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "figure"; src: string; alt: string; caption?: string; credit?: string };

export type Category =
  | "Neuroscience Explained"
  | "Neurodegenerative Diseases"
  | "Brain and Behaviour"
  | "Research and Discovery"
  | "Neuroscience and Society"
  | "Perspectives";

/** Keeps research reporting, opinion and artwork visibly distinct. */
export type ContributionKind = "Research" | "Explainer" | "Perspective" | "Artwork";

/** A labelled link — used for author profiles, further reading and materials. */
export type LabelledLink = { label: string; href: string };

/** Search-engine and social-sharing overrides. All optional. */
export type Seo = {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
};

export type Author = {
  id: string;
  name: string;
  /** Professional line shown under the name, e.g. "Founder, NeuroFlutter | Neuroscience Researcher". */
  role: string;
  /** Short third-person professional biography. */
  bio: string;
  /** Institution or affiliation, where applicable. */
  affiliation?: string;
  /** Main areas of research or expertise. */
  expertise?: string[];
  /** Professional links only — LinkedIn, ORCID, an institutional profile. */
  links?: LabelledLink[];
  /** Watercolour portrait or motif; optional. */
  image?: string;
  /** Alt text for the portrait, when one is set. */
  imageAlt?: string;
};

export type Article = {
  slug: string;
  title: string;
  standfirst: string;
  authorId: string;
  category: Category;
  kind: ContributionKind;
  /** ISO date */
  date: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  imageCredit?: string;
  featured?: boolean;
  /** Demonstration content that must be replaced before launch. */
  placeholder?: boolean;
  body: Block[];
  references?: { text: string; href?: string }[];

  /* ---- Additions for the CMS. All optional, so existing content is unaffected. ---- */

  /** Free-form tags, finer-grained than category. Does not affect Learn filters. */
  tags?: string[];
  /** Further reading and related external pages. */
  externalLinks?: LabelledLink[];
  /** Supplementary material: data, supplementary PDFs, figure sources. */
  supportingFiles?: LabelledLink[];
  /** Per-article search and sharing overrides. */
  seo?: Seo;
  /** Rich body from Sanity. When present this is rendered instead of `body`. */
  portableBody?: PortableTextBlock[];
  /** True when this item is an unpublished draft shown on the preview site only. */
  isDraft?: boolean;
};

export type Artwork = {
  slug: string;
  title: string;
  artist: string;
  artistBio: string;
  medium?: string;
  statement: string;
  image: string;
  imageAlt: string;
  credit: string;
  /** Recorded for rights tracking; never shown publicly. */
  rights: {
    permissionGranted: boolean;
    licence: string;
    agreedOn?: string;
  };
  links?: LabelledLink[];
  placeholder?: boolean;
};
