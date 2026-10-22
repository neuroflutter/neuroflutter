import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId, readToken, includeDrafts, apiHost } from "./env";

/**
 * One client, used only while the site is being built. Nothing here runs in a
 * visitor's browser, so the token never leaves the build machine.
 */
export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  // Drafts must never be cached by the CDN, and a preview build wants the
  // very latest content anyway.
  useCdn: !includeDrafts,
  token: readToken || undefined,
  ...(apiHost ? { apiHost, useProjectHostname: false } : {}),
  perspective: includeDrafts ? "drafts" : "published",
});

const builder = imageUrlBuilder({ projectId: projectId || "placeholder", dataset });

/** Turns a Sanity image reference into a CDN URL at a sensible width. */
export function imageUrl(source: unknown, width = 1200): string {
  if (!source) return "";
  try {
    return builder.image(source as never).width(width).fit("max").auto("format").url();
  } catch {
    return "";
  }
}
