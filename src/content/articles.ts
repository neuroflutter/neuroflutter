import type { Article } from "./types";
import { brainBeforeSymptoms, originalIntelligence } from "./bodies";

/**
 * Two entries below are your real published pieces, carried over from the
 * original site — titles and standfirsts are taken from it. Their bodies are
 * marked so you can paste the original text in (or add them in Sanity later).
 *
 * Everything flagged `placeholder: true` is demonstration material and should
 * be deleted before launch.
 */
export const articles: Article[] = [
  {
    slug: "the-brain-before-symptoms",
    title: "The Brain Before Symptoms",
    standfirst:
      "How neuroscience is learning to detect disease before it becomes visible.",
    authorId: "hala",
    category: "Neurodegenerative Diseases",
    kind: "Explainer",
    date: "2026-04-27",
    readingMinutes: 6,
    image: "/illustrations/brain-plain.webp",
    imageAlt:
      "Watercolour illustration of a human brain in soft pink and cream tones, shown in profile.",
    imageCredit: "Illustration © NeuroFlutter",
    featured: true,
    body: brainBeforeSymptoms,
  },
  {
    slug: "the-brain-has-always-been-the-original-intelligence",
    title: "The Brain Has Always Been the Original Intelligence",
    standfirst:
      "AI may be changing the future of neuroscience, but the brain remains the most extraordinary intelligence we know.",
    authorId: "hala",
    category: "Perspectives",
    kind: "Perspective",
    date: "2026-07-04",
    readingMinutes: 2,
    image: "/illustrations/lightbulb-flower.webp",
    imageAlt:
      "Watercolour illustration of a lightbulb resting on layered red and green petals.",
    imageCredit: "Illustration © NeuroFlutter",
    featured: true,
    body: originalIntelligence,
  },
  {
    slug: "demo-what-a-biomarker-actually-is",
    title: "What a Biomarker Actually Is",
    standfirst:
      "A demonstration explainer showing how a longer NeuroFlutter Learn piece is laid out, with headings, pull quotes and a reference list.",
    authorId: "demo-contributor",
    category: "Neuroscience Explained",
    kind: "Explainer",
    date: "2026-09-12",
    readingMinutes: 7,
    image: "/illustrations/butterfly-teal.webp",
    imageAlt:
      "Watercolour illustration of a teal and grey butterfly with its wings raised.",
    imageCredit: "Illustration © NeuroFlutter",
    placeholder: true,
    body: [
      {
        type: "p",
        text: "This is demonstration content. It exists only to show how an article reads on the page and will be removed before launch.",
      },
      { type: "h2", text: "A heading looks like this" },
      {
        type: "p",
        text: "Body paragraphs sit in a comfortable reading measure, around seventy characters a line, so that long scientific writing stays easy to follow on both desktop and phone.",
      },
      {
        type: "quote",
        text: "Pull quotes can be used to lift a single idea out of a longer argument.",
      },
      { type: "h3", text: "Sub-headings step down in weight" },
      {
        type: "ul",
        items: [
          "Lists use soft watercolour-blue markers rather than default bullets.",
          "Figures can be placed between paragraphs with their own caption and credit.",
          "References appear in a dedicated block at the end of the article.",
        ],
      },
      {
        type: "figure",
        src: "/illustrations/caterpillar.webp",
        alt: "Watercolour illustration of a green and yellow caterpillar.",
        caption: "Figures carry a caption and a visible image credit.",
        credit: "Illustration © NeuroFlutter",
      },
      {
        type: "p",
        text: "The layout is deliberately quiet so that the illustrations and the science carry the page.",
      },
    ],
    references: [
      {
        text: "Demonstration reference entry — real citations will appear in this style.",
      },
    ],
  },
  {
    slug: "demo-drawing-the-nervous-system",
    title: "Drawing the Nervous System",
    standfirst:
      "A demonstration piece showing how illustration-led contributions and artistic interpretation are presented alongside research writing.",
    authorId: "demo-contributor",
    category: "Perspectives",
    kind: "Artwork",
    date: "2026-08-02",
    readingMinutes: 3,
    image: "/illustrations/butterflies-three.webp",
    imageAlt:
      "Watercolour illustration of three butterflies in orange, blue and yellow.",
    imageCredit: "Illustration © NeuroFlutter",
    placeholder: true,
    body: [
      {
        type: "p",
        text: "This is demonstration content showing how an artwork-led contribution appears. Artistic interpretation is labelled distinctly from research reporting so readers always know what they are looking at.",
      },
    ],
  },
];

/**
 * Set to true while you are designing, false for the public site.
 * Demonstration entries stay in this file either way, so you keep the
 * examples without them appearing on the live site.
 */
export const SHOW_DEMO_CONTENT = false;

export const liveArticles = articles.filter(
  (a) => SHOW_DEMO_CONTENT || !a.placeholder,
);

export const sortedArticles = [...liveArticles].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const getArticle = (slug: string) =>
  liveArticles.find((a) => a.slug === slug);

export const categories = [
  "Neuroscience Explained",
  "Neurodegenerative Diseases",
  "Brain and Behaviour",
  "Research and Discovery",
  "Neuroscience and Society",
  "Perspectives",
] as const;
