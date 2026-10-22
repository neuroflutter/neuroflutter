import type { StructureResolver } from "sanity/structure";

/**
 * The left-hand menu of the editorial dashboard. Grouped the way the work
 * actually happens: what needs attention first, then everything else.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("NeuroFlutter")
    .items([
      S.listItem()
        .title("Articles")
        .child(
          S.list()
            .title("Articles")
            .items([
              S.listItem()
                .title("All articles")
                .child(
                  S.documentTypeList("article")
                    .title("All articles")
                    .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
                ),
              S.divider(),
              S.listItem()
                .title("Awaiting my review")
                .child(
                  S.documentList()
                    .title("Awaiting my review")
                    .filter(
                      '_type == "article" && editorial.status in ["submitted", "in-review"]',
                    )
                    .defaultOrdering([{ field: "editorial.submittedOn", direction: "asc" }]),
                ),
              S.listItem()
                .title("Revisions requested")
                .child(
                  S.documentList()
                    .title("Revisions requested")
                    .filter('_type == "article" && editorial.status == "revisions"'),
                ),
              S.listItem()
                .title("Approved, ready to publish")
                .child(
                  S.documentList()
                    .title("Approved, ready to publish")
                    .filter('_type == "article" && editorial.status == "approved"'),
                ),
              S.divider(),
              S.listItem()
                .title("By category")
                .child(
                  S.documentTypeList("category")
                    .title("By category")
                    .child((categoryId) =>
                      S.documentList()
                        .title("Articles")
                        .filter('_type == "article" && category._ref == $categoryId')
                        .params({ categoryId })
                        .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
                    ),
                ),
            ]),
        ),

      S.listItem()
        .title("Contributors")
        .child(S.documentTypeList("author").title("Contributors")),

      S.listItem().title("Artwork").child(S.documentTypeList("artwork").title("Artwork")),

      S.divider(),

      S.listItem()
        .title("Categories")
        .child(
          S.documentTypeList("category")
            .title("Categories")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.listItem()
        .title("Site settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings").title("Site settings"),
        ),
    ]);
