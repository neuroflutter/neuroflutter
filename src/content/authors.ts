import type { Author } from "./types";

export const authors: Author[] = [
  {
    id: "hala",
    name: "Hala Al Masri",
    role: "Founder, NeuroFlutter | Neuroscience Researcher",
    affiliation: "King's College London",
    expertise: ["Neurodegeneration", "Neuroinflammation", "Biomarkers"],
    // Supplied by Hala. Third-person, professional, no invented credentials.
    bio:
      "Hala Al Masri is the founder of NeuroFlutter and a neuroscience " +
      "researcher working with an ALS research team at King's College London. " +
      "Her research focuses on neurodegeneration, neuroinflammation and " +
      "biomarkers, including inflammatory cytokine profiling in post-mortem " +
      "ALS brain tissue. She also supports MND/ALS clinical research and " +
      "biobank activities at King's College Hospital NHS Foundation Trust and " +
      "contributes to postgraduate neuroscience teaching. Through " +
      "NeuroFlutter, she hopes to make neuroscience more accessible and " +
      "encourage curiosity, learning and scientific collaboration.",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/neuroflutter" },
      { label: "Instagram", href: "https://www.instagram.com/neuroflutter/" },
      { label: "Email", href: "mailto:neuroflutter@outlook.com" },
    ],
  },
  {
    id: "demo-contributor",
    name: "Sample Contributor",
    role: "Demonstration profile",
    bio:
      "This is a demonstration author profile used to show how contributor pages look. " +
      "It does not describe a real person and should be deleted before launch.",
    links: [],
  },
];

export const getAuthor = (id: string) =>
  authors.find((a) => a.id === id) ?? authors[0];
