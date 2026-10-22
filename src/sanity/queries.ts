/**
 * GROQ queries. Each one asks for exactly the fields the site renders, so the
 * build stays fast and nothing private (editorial notes, contributor contact
 * details, rights records) is ever fetched into a public page.
 */

const authorFields = `
  "id": coalesce(slug.current, _id),
  name,
  "role": coalesce(role, ""),
  "bio": coalesce(bio, ""),
  affiliation,
  "expertise": coalesce(researchInterests, []),
  "links": coalesce(links[]{ label, "href": href }, []),
  "imageRef": image,
  "imageAlt": image.alt
`;

const articleFields = `
  "slug": slug.current,
  title,
  "standfirst": coalesce(standfirst, ""),
  "authorId": coalesce(author->slug.current, author->_id),
  "category": coalesce(category->title, "Neuroscience Explained"),
  "kind": coalesce(kind, "Explainer"),
  "date": coalesce(publishedAt, _createdAt),
  "readingMinutes": coalesce(readingMinutes, 0),
  "imageRef": mainImage,
  "imageAlt": coalesce(mainImage.alt, ""),
  "imageCredit": mainImage.credit,
  "featured": coalesce(featured, false),
  "portableBody": coalesce(body, []),
  "references": coalesce(references[]{ text, href }, []),
  "tags": coalesce(tags, []),
  "externalLinks": coalesce(externalLinks[]{ label, href }, []),
  "supportingFiles": coalesce(supportingFiles[]{ label, "href": file.asset->url }, []),
  "seo": {
    "title": seo.title,
    "description": seo.description,
    "imageRef": seo.image,
    "noIndex": coalesce(seo.noIndex, false)
  },
  "isDraft": _id in path("drafts.**")
`;

/** Every article that is ready for the public site. */
export const articlesQuery = `
*[_type == "article" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
  ${articleFields}
}`;

/** Every author, whether or not they have published yet. */
export const authorsQuery = `
*[_type == "author" && defined(name)] | order(name asc) {
  ${authorFields}
}`;

/** The six Learn categories, so the filter list can come from the CMS. */
export const categoriesQuery = `
*[_type == "category" && defined(title)] | order(coalesce(order, 99) asc, title asc).title`;
