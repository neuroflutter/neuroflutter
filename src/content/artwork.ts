import type { Artwork } from "./types";

/**
 * Demonstration gallery entries. The `rights` block is where permission to
 * publish and the agreed licence are recorded for each contributor — it is
 * stored with the artwork but never rendered publicly.
 */
const allArtworks: Artwork[] = [
  {
    slug: "demo-metamorphosis-study",
    title: "Metamorphosis Study",
    artist: "Sample Artist",
    artistBio:
      "Demonstration artist profile. Replace with a real contributor biography once permission is in place.",
    medium: "Watercolour on paper",
    statement:
      "A demonstration artist statement, showing how a contributor's own words about their work are presented beneath the image.",
    image: "/illustrations/butterfly-teal.webp",
    imageAlt:
      "Watercolour illustration of a teal and grey butterfly with its wings raised.",
    credit: "Illustration © NeuroFlutter",
    rights: { permissionGranted: false, licence: "To be agreed" },
    placeholder: true,
  },
  {
    slug: "demo-early-stage",
    title: "Early Stage",
    artist: "Sample Artist",
    artistBio:
      "Demonstration artist profile. Replace with a real contributor biography once permission is in place.",
    medium: "Watercolour on paper",
    statement:
      "A second demonstration entry, included to show how the gallery behaves with more than one work.",
    image: "/illustrations/caterpillar.webp",
    imageAlt: "Watercolour illustration of a green and yellow caterpillar.",
    credit: "Illustration © NeuroFlutter",
    rights: { permissionGranted: false, licence: "To be agreed" },
    placeholder: true,
  },
];

import { SHOW_DEMO_CONTENT } from "./articles";

export const artworks = allArtworks.filter(
  (a) => SHOW_DEMO_CONTENT || !a.placeholder,
);
