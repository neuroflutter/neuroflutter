/**
 * Sanity connection settings.
 *
 * Project ID and dataset are PUBLIC identifiers — they are safe in the browser
 * and appear in the built HTML. The read token is NOT public: it is only ever
 * read during the build (server side) and never shipped to a visitor.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
export const apiVersion = "2026-01-01";

/**
 * Lets a build read from somewhere other than Sanity's own servers. Used for
 * offline testing of the publishing path; unset everywhere in normal use.
 */
export const apiHost = process.env.SANITY_API_HOST?.trim() || "";

/** Build-time only. Required to read drafts for the preview site. */
export const readToken = process.env.SANITY_API_READ_TOKEN?.trim() || "";

/** True once a project ID is set. Until then the site uses its built-in content. */
export const sanityConfigured = projectId.length > 0;

/**
 * Set on the preview deploy only. Makes the build show unpublished drafts so
 * work in progress can be checked in the real design before going live.
 */
export const includeDrafts =
  (process.env.SANITY_INCLUDE_DRAFTS || "").toLowerCase() === "true";
