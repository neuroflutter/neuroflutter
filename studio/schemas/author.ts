import { defineField, defineType } from "sanity";

/**
 * A contributor profile. Every article is linked to one of these, and the
 * profile appears beneath the article and on its own page at
 * neuroflutter.com/authors/<the slug below>/
 */
export const author = defineType({
  name: "author",
  title: "Contributor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full name",
      type: "string",
      description: "As it should appear in the byline.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Profile web address",
      type: "slug",
      description:
        "Decides the page address: neuroflutter.com/authors/<this>/. Press Generate. Do not change it once a profile is published, or existing links will break.",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Current position",
      type: "string",
      description: 'For example "PhD Candidate in Neuroscience" or "Consultant Neurologist".',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "affiliation",
      title: "Institution",
      type: "string",
      description: 'For example "King’s College London".',
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 6,
      description:
        "Written in the third person. Two to four sentences works well.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "researchInterests",
      title: "Research interests",
      type: "array",
      of: [{ type: "string" }],
      description:
        'A few short phrases, one per line — for example "Neuroinflammation", "Biomarkers".',
      options: { layout: "tags" },
    }),
    defineField({
      name: "image",
      title: "Photograph",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          description:
            "A short description for screen readers, e.g. “Portrait of Hala Al Masri”.",
          validation: (r) => r.required(),
        },
      ],
    }),
    defineField({
      name: "links",
      title: "Professional links",
      type: "array",
      description:
        "LinkedIn, ORCID, an institutional profile, Google Scholar. Professional only.",
      of: [
        {
          type: "object",
          name: "link",
          fields: [
            {
              name: "label",
              type: "string",
              description: 'What the link is called, e.g. "LinkedIn" or "ORCID".',
              validation: (r) => r.required(),
            },
            { name: "href", title: "Web address", type: "url", validation: (r) => r.required() },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email (private)",
      type: "string",
      description:
        "For your records only. This is never shown on the website and never leaves Sanity.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
