import { defineField, defineType } from "sanity";

/**
 * Carried over unchanged. The website does not read these yet — its name,
 * description and contact details still live in src/lib/site.ts, which keeps
 * them identical to what is published today.
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({
      name: "social",
      type: "array",
      of: [
        {
          type: "object",
          name: "link",
          fields: [
            { name: "label", type: "string" },
            { name: "href", type: "url" },
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
