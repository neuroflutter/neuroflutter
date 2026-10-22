import { defineField, defineType } from "sanity";

/**
 * An article. Groups keep the form short: everything needed to publish is in
 * "Article", and the optional extras sit behind their own tabs.
 */
export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  groups: [
    { name: "main", title: "Article", default: true },
    { name: "body", title: "Text" },
    { name: "sources", title: "References & links" },
    { name: "seo", title: "Search & sharing" },
    { name: "editorial", title: "Editorial (private)" },
  ],
  fields: [
    /* ---------------------------------------------------------------- main */
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "main",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      group: "main",
      description:
        "Decides the page address: neuroflutter.com/learn/<this>/. Press Generate. Do not change it once published, or existing links and shares will break.",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "standfirst",
      title: "Standfirst",
      type: "text",
      rows: 3,
      group: "main",
      description:
        "The one-sentence summary under the headline. Also used as the description in Google results and link previews unless you override it under Search & sharing.",
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: "kind",
      title: "Kind of contribution",
      type: "string",
      group: "main",
      description: "Keeps research, explanation, opinion and artwork visibly distinct for readers.",
      options: {
        list: ["Research", "Explainer", "Perspective", "Artwork"],
        layout: "radio",
      },
      initialValue: "Explainer",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "main",
      to: [{ type: "category" }],
      description: "Decides which Learn filter the article appears under.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "main",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description:
        "Finer-grained than the category — for example “biomarkers”, “ALS”. Used for search engines; does not change the Learn filters.",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "main",
      to: [{ type: "author" }],
      description:
        "Create the contributor profile first, under Contributors, then choose them here.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Publication date",
      type: "datetime",
      group: "main",
      description:
        "Shown on the article and used to order the Learn page, newest first. A future date is fine — it simply sorts to the top once published.",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readingMinutes",
      title: "Reading time in minutes",
      type: "number",
      group: "main",
      description: "Leave blank and it is worked out from the length of the text.",
      validation: (r) => r.min(1).max(120),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      group: "main",
      options: { hotspot: true },
      description: "Appears at the top of the article and in the Learn listing.",
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "A short description of the image for screen readers. Required.",
          validation: (r) => r.required(),
        },
        {
          name: "credit",
          title: "Image credit",
          type: "string",
          description: 'For example "Illustration © NeuroFlutter".',
        },
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Mark as featured",
      type: "boolean",
      group: "main",
      initialValue: false,
      description: "Reserved for future use on the home page.",
    }),

    /* ---------------------------------------------------------------- body */
    defineField({
      name: "body",
      title: "Article text",
      type: "array",
      group: "body",
      description:
        "Write here. Use Heading 2 for section titles, Quote for a pull quote, and the image button to place a figure inside the text.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bulleted list", value: "bullet" },
            { title: "Numbered list", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", title: "Web address", type: "url" }],
              },
            ],
          },
        },
        {
          type: "image",
          title: "Figure",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (r) => r.required(),
            },
            { name: "caption", title: "Caption", type: "string" },
            { name: "credit", title: "Credit", type: "string" },
          ],
        },
      ],
    }),

    /* ------------------------------------------------------------- sources */
    defineField({
      name: "references",
      title: "Academic references",
      type: "array",
      group: "sources",
      description:
        "Appears as a numbered reference list at the end of the article. Paste the full citation; add a DOI or web address if there is one.",
      of: [
        {
          type: "object",
          name: "citation",
          fields: [
            {
              name: "text",
              title: "Citation",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            },
            { name: "href", title: "DOI or web address", type: "url" },
          ],
          preview: { select: { title: "text", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "externalLinks",
      title: "Further reading",
      type: "array",
      group: "sources",
      description: "External pages worth reading next. Shown as a short list of links.",
      of: [
        {
          type: "object",
          name: "link",
          fields: [
            { name: "label", title: "Link text", type: "string", validation: (r) => r.required() },
            { name: "href", title: "Web address", type: "url", validation: (r) => r.required() },
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({
      name: "supportingFiles",
      title: "Supporting material",
      type: "array",
      group: "sources",
      description:
        "Supplementary PDFs, data files or figure sources. Readers get a download link at the end of the article.",
      of: [
        {
          type: "object",
          name: "material",
          fields: [
            {
              name: "label",
              title: "What it is",
              type: "string",
              validation: (r) => r.required(),
            },
            { name: "file", title: "File", type: "file", validation: (r) => r.required() },
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),

    /* ----------------------------------------------------------------- seo */
    defineField({
      name: "seo",
      title: "Search & sharing",
      type: "object",
      group: "seo",
      description:
        "All optional. Leave blank and the title and standfirst are used, which is usually right.",
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: "title",
          title: "Title for Google",
          type: "string",
          description: "Aim for under about 60 characters.",
          validation: (r) => r.max(70),
        },
        {
          name: "description",
          title: "Description for Google",
          type: "text",
          rows: 3,
          description: "Aim for about 150 characters.",
          validation: (r) => r.max(180),
        },
        {
          name: "image",
          title: "Image for social sharing",
          type: "image",
          description: "Used when the article is shared. Falls back to the main image.",
        },
        {
          name: "noIndex",
          title: "Hide from search engines",
          type: "boolean",
          initialValue: false,
          description:
            "The page stays live and anyone with the link can read it, but Google is asked not to list it.",
        },
      ],
    }),

    /* ----------------------------------------------------------- editorial */
    defineField({
      name: "editorial",
      title: "Editorial",
      type: "object",
      group: "editorial",
      description:
        "Your private notes. None of this is fetched by the website or visible to readers.",
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: "status",
          title: "Where this has got to",
          type: "string",
          options: {
            list: [
              { title: "Idea", value: "idea" },
              { title: "Commissioned", value: "commissioned" },
              { title: "Submitted — awaiting my review", value: "submitted" },
              { title: "In review", value: "in-review" },
              { title: "Revisions requested", value: "revisions" },
              { title: "Approved — ready to publish", value: "approved" },
            ],
            layout: "radio",
          },
          initialValue: "idea",
        },
        {
          name: "submittedVia",
          title: "How it reached you",
          type: "string",
          options: {
            list: [
              { title: "Email to neuroflutter@outlook.com", value: "email" },
              { title: "Website submission form", value: "form" },
              { title: "Commissioned directly", value: "direct" },
            ],
          },
        },
        {
          name: "submittedOn",
          title: "Date received",
          type: "date",
        },
        {
          name: "contributorContact",
          title: "Contributor's contact details",
          type: "string",
          description: "Private. Never published.",
        },
        {
          name: "notes",
          title: "Review notes",
          type: "text",
          rows: 5,
          description: "Private. Never published.",
        },
      ],
    }),
  ],
  orderings: [
    {
      name: "newest",
      title: "Publication date, newest first",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      kind: "kind",
      media: "mainImage",
      date: "publishedAt",
    },
    prepare({ title, author, kind, media, date }) {
      const when = date ? new Date(date).toLocaleDateString("en-GB") : "no date";
      return {
        title: title || "Untitled",
        subtitle: [kind, author, when].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
