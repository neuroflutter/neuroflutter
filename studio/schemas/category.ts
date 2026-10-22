import { defineField, defineType } from "sanity";

/**
 * The six Learn categories. These drive the filter buttons on the Learn page,
 * so the titles must stay exactly as they are — the website matches on them.
 * Add a new one only if you also want a new filter button.
 */
export const CATEGORY_TITLES = [
  "Neuroscience Explained",
  "Neurodegenerative Diseases",
  "Brain and Behaviour",
  "Research and Discovery",
  "Neuroscience and Society",
  "Perspectives",
] as const;

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category",
      type: "string",
      description:
        "One of the six categories the Learn page filters by. Choose from the list.",
      options: { list: [...CATEGORY_TITLES] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "What this category covers",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "order",
      title: "Order in the filter list",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  orderings: [
    { name: "manual", title: "Filter order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "title", subtitle: "description" } },
});
