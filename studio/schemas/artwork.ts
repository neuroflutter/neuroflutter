import { defineField, defineType } from "sanity";

/**
 * Carried over unchanged from the original content models. Records a rights
 * agreement alongside the image so permission is never left undocumented.
 */
export const artwork = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "artist",
      type: "reference",
      to: [{ type: "author" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "medium", type: "string" }),
    defineField({ name: "statement", title: "Artist statement", type: "text", rows: 4 }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", title: "Alt text", type: "string", validation: (r) => r.required() },
        { name: "credit", title: "Credit", type: "string", validation: (r) => r.required() },
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "rights",
      title: "Rights (private — never published)",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: "permissionGranted",
          title: "Permission to publish received",
          type: "boolean",
          initialValue: false,
        },
        { name: "licence", title: "Agreed licence or terms", type: "string" },
        { name: "agreedOn", title: "Agreed on", type: "date" },
        { name: "notes", type: "text", rows: 2 },
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "artist.name", media: "image" } },
});
