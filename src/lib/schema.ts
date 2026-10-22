import { site } from "@/lib/site";
import type { Article, Author } from "@/content/types";

/**
 * schema.org structured data. Everything here is derived from real site
 * content — no invented addresses, registrations, ratings or credentials.
 */
const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

export const organisationSchema = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  url: `${site.url}/`,
  description: site.shortDescription,
  email: site.email,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/illustrations/butterfly-teal.webp`,
  },
  sameAs: site.sameAs,
  founder: { "@type": "Person", name: "Hala Al Masri" },
  knowsAbout: [
    "Neuroscience",
    "Neurodegeneration",
    "Neuroinflammation",
    "Science communication",
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: `${site.url}/`,
  name: site.name,
  description: site.shortDescription,
  inLanguage: "en-GB",
  publisher: { "@id": ORG_ID },
};

/** Organization + WebSite, emitted once site-wide. */
export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [organisationSchema, websiteSchema],
};

export const personSchema = (author: Author) => ({
  "@type": "Person",
  "@id": `${site.url}/authors/${author.id}/#person`,
  name: author.name,
  url: `${site.url}/authors/${author.id}/`,
  description: author.bio,
  jobTitle: author.role,
  ...(author.affiliation
    ? { affiliation: { "@type": "Organization", name: author.affiliation } }
    : {}),
  ...(author.expertise ? { knowsAbout: author.expertise } : {}),
  ...(author.image ? { image: author.image } : {}),
});

/**
 * Images are site-relative for articles written in code and absolute (on
 * Sanity's CDN) for articles written in the CMS. Structured data needs an
 * absolute URL either way.
 */
const absolute = (src: string) =>
  /^https?:\/\//i.test(src) ? src : `${site.url}${src}`;

export const articleSchema = (article: Article, author: Author) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: article.title,
  description: article.standfirst,
  datePublished: article.date,
  dateModified: article.date,
  inLanguage: "en-GB",
  url: `${site.url}/learn/${article.slug}/`,
  mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/learn/${article.slug}/` },
  image: absolute(article.image),
  articleSection: article.category,
  author: personSchema(author),
  publisher: { "@id": ORG_ID },
  isPartOf: { "@id": SITE_ID },
});

export const profilePageSchema = (author: Author) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${site.url}/authors/${author.id}/`,
  mainEntity: personSchema(author),
  isPartOf: { "@id": SITE_ID },
});

/** Renders a JSON-LD block. */
export const jsonLd = (data: object) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
});
