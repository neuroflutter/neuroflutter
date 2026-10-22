import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ArticleTeaser from "@/components/ArticleTeaser";
import { getArticles, getAuthors, getAuthor } from "@/lib/content";
import { profilePageSchema, jsonLd } from "@/lib/schema";

export async function generateStaticParams() {
  const [authors, articles] = await Promise.all([getAuthors(), getArticles()]);
  return authors
    .filter((a) => articles.some((x) => x.authorId === a.id))
    .map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const author = await getAuthor(id);
  if (!author) return {};
  return {
    title: author.name,
    // Purpose-written, and inside the ~160 characters search engines show.
    description: `${author.name} — ${author.role}. Author profile and published articles on NeuroFlutter.`,
    alternates: { canonical: `/authors/${author.id}/` },
    openGraph: {
      title: `${author.name} · NeuroFlutter`,
      description: author.bio,
      url: `/authors/${author.id}/`,
      type: "profile",
      ...(author.image ? { images: [{ url: author.image }] } : {}),
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const author = await getAuthor(id);
  if (!author) notFound();

  const written = (await getArticles()).filter((a) => a.authorId === author.id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(profilePageSchema(author))}
      />
      <PageHeader eyebrow={author.role} title={author.name} intro={author.bio}>
        {author.affiliation && (
          <p className="mt-4 text-[0.9rem] text-ink-soft">{author.affiliation}</p>
        )}
        {author.expertise && author.expertise.length > 0 && (
          <p className="mt-2 text-[0.9rem] text-ink-soft">
            <span className="text-maroon-soft">Research interests: </span>
            {author.expertise.join(" · ")}
          </p>
        )}
        {author.links && author.links.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-5">
            {author.links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="link-quiet text-[0.92rem] text-maroon">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </PageHeader>

      {author.image && (
        <div className="mx-auto max-w-[76rem] px-6 pb-4 md:px-10">
          <Image
            src={author.image}
            alt={author.imageAlt || author.name}
            width={220}
            height={220}
            className="h-auto w-[11rem]"
          />
        </div>
      )}

      <section className="mx-auto max-w-[76rem] px-6 pb-24 md:px-10">
        <p className="text-[0.92rem] text-maroon-soft">Published work</p>
        <hr className="plate-rule mt-5" />
        {written.length === 0 ? (
          <p className="mt-10 text-ink-soft">Nothing published here yet.</p>
        ) : (
          <div className="mt-12 grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {written.map((a) => (
              <ArticleTeaser key={a.slug} article={a} />
            ))}
          </div>
        )}
        <p className="mt-16">
          <Link href="/learn/" className="link-quiet text-[0.95rem] text-maroon">
            Back to all articles
          </Link>
        </p>
      </section>
    </>
  );
}
