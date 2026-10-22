/**
 * Topics offered in the contributor proposal form ("What Is Your Article
 * About?"). These describe the SUBJECT of a proposed article.
 *
 * Deliberately separate from the published-article `categories` in
 * articles.ts, which drive the Learn page filters and must not change:
 * editing this list never affects anything already published.
 */
export const contributorTopics = [
  "Brain Biology & Neuroscience",
  "Memory, Learning & Cognition",
  "Behaviour, Emotion & Mental Health",
  "Neurological & Neurodegenerative Disorders",
  "Brain Development & Ageing",
  "Brain Health & Everyday Life",
  "Treatments & Clinical Research",
  "Neurotechnology & Artificial Intelligence",
  "Neuroscience & Society",
  "Other / Interdisciplinary",
] as const;

export type ContributorTopic = (typeof contributorTopics)[number];

/** The one option that reveals the optional "describe your topic" field. */
export const OTHER_TOPIC: ContributorTopic = "Other / Interdisciplinary";
