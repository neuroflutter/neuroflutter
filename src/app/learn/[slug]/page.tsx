import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/ArticleBody";
import PortableBody from "@/components/PortableBody";
import AuthorProfile from "@/components/AuthorProfile";
import ArticleTeaser from "@/components/ArticleTeaser";
import ShareLinks from "@/components/ShareLinks";
import { getArticles, getArticle, getAuthorOrFirst } from "@/lib/content";
import { articleSchema, jsonLd } from "@/lib/schema";

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  const author = await getAuthorOrFirst(article.authorId);

  // Anything set in the CMS "Search & sharing" panel takes precedence.
  const title = article.seo?.title || article.title;
  const description = article.seo?.description || article.standfirst;
  const shareImage = article.seo?.image || article.image;

  return {
    title,
    description,
    alternates: { canonical: `/learn/${article.slug}/` },
    authors: [{ name: author.name, url: `/authors/${author.id}/` }],
    ...(article.seo?.noIndex || article.isDraft
      ? { robots: { index: false, follow: false } }
      : {}),
    keywords: article.tags && article.tags.length > 0 ? article.tags : undefined,
    openGraph: {
      title,
      description,
      url: `/learn/${article.slug}/`,
      type: "article",
      publishedTime: article.date,
      authors: [author.name],
      section: article.category,
      images: [{ url: shareImage, alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const author = await getAuthorOrFirst(article.authorId);
  const all = await getArticles();
  const related = all
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category))
    .slice(0, 3);

  const hasRichBody = Boolean(article.portableBody && article.portableBody.length > 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(articleSchema(article, author))}
      />
      <article>
        <header className="relative">
<div className="relative mx-auto max-w-[46rem] px-6 pt-10 text-center md:pt-16">
            <p className="text-[0.92rem] text-maroon-soft">
              <Link href="/learn/" className="hover:text-maroon">
                {article.category}
              </Link>
            </p>

            <h1 className="mt-6 text-[2.3rem] leading-[1.08] tracking-[-0.02em] md:text-[3.1rem]">
              {article.title}
            </h1>

            <p className="mx-auto mt-6 max-w-[34rem] text-[1.1rem] leading-relaxed text-ink-soft">
              {article.standfirst}
            </p>

            <p className="mt-8 text-[0.86rem] text-ink-soft">
              <Link href={`/authors/${author.id}/`} className="text-maroon hover:text-maroon">
                {author.name}
              </Link>
              {" · "}
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              {" · "}
              {article.readingMinutes} min read
            </p>

            {article.isDraft && (
              <p className="mx-auto mt-8 max-w-md rounded-sm bg-blue/70 px-4 py-2.5 text-[0.8rem] text-maroon">
                Unpublished draft — visible on the preview site only.
              </p>
            )}

            {article.placeholder && (
              <p className="mx-auto mt-8 max-w-md rounded-sm bg-blue/70 px-4 py-2.5 text-[0.8rem] text-maroon">
                Demonstration article — remove before launch.
              </p>
            )}
          </div>

          <div className="relative mx-auto mt-12 flex max-w-[46rem] justify-center px-6">
            <Image
              src={article.image}
              alt={article.imageAlt}
              width={620}
              height={500}
              priority
              className="h-auto w-full max-w-md"
            />
          </div>
          {article.imageCredit && (
            <p className="mt-4 text-center text-[0.78rem] italic text-ink-soft">
              {article.imageCredit}
            </p>
          )}
        </header>

        <div className="mx-auto mt-16 max-w-[40rem] px-6">
          {hasRichBody ? (
            <PortableBody blocks={article.portableBody!} />
          ) : (
            <ArticleBody blocks={article.body} />
          )}

          {article.references && article.references.length > 0 && (
            <section className="mt-16 border-t border-blue-deep/60 pt-8">
              <h2 className="text-[1.15rem] text-maroon">
                References
              </h2>
              <ol className="mt-5 space-y-3 text-[0.9rem] leading-relaxed text-ink-soft">
                {article.references.map((r, i) => (
                  <li key={i}>
                    {r.href ? (
                      <a href={r.href} className="text-maroon underline underline-offset-2">
                        {r.text}
                      </a>
                    ) : (
                      r.text
                    )}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {article.externalLinks && article.externalLinks.length > 0 && (
            <section className="mt-16 border-t border-blue-deep/60 pt-8">
              <h2 className="text-[1.15rem] text-maroon">Further reading</h2>
              <ul className="mt-5 space-y-3 text-[0.9rem] leading-relaxed text-ink-soft">
                {article.externalLinks.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-maroon underline underline-offset-2"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {article.supportingFiles && article.supportingFiles.length > 0 && (
            <section className="mt-16 border-t border-blue-deep/60 pt-8">
              <h2 className="text-[1.15rem] text-maroon">Supporting material</h2>
              <ul className="mt-5 space-y-3 text-[0.9rem] leading-relaxed text-ink-soft">
                {article.supportingFiles.map((f) => (
                  <li key={f.href}>
                    <a
                      href={f.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-maroon underline underline-offset-2"
                    >
                      {f.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-14 border-t border-blue-deep/60 pt-8">
            <ShareLinks title={article.title} path={`/learn/${article.slug}/`} />
          </div>

          <div className="mt-14">
            <AuthorProfile author={author} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto mt-28 max-w-[76rem] px-6 pb-8 md:px-10">
          <p className="text-[0.9rem] text-ink-soft">Keep reading</p>
          <hr className="plate-rule mt-5" />
          <div className="mt-12 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleTeaser key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
