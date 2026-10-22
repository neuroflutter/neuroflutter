import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/content/types";
import { getAuthor } from "@/content/authors";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** The original Articles page layout: illustration left, text right. */
export default function ArticleRow({ article }: { article: Article }) {
  const author = getAuthor(article.authorId);
  const href = `/learn/${article.slug}/`;

  return (
    <article className="group grid items-center gap-7 py-10 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:gap-12 md:py-12">
      <Link href={href} tabIndex={-1} aria-hidden className="block">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden">
          <span
            aria-hidden
            className="absolute inset-[12%] rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, var(--color-blue) 0%, var(--color-blue) 45%, transparent 73%)",
              opacity: 0.55,
            }}
          />
          <Image
            src={article.image}
            alt={article.imageAlt}
            width={620}
            height={500}
            className="relative h-[82%] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </Link>

      <div>
        <p className="text-[0.86rem] text-ink-soft">
          {author.name} — <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
        <p className="mt-1 text-[0.86rem] text-maroon-soft">{article.category}</p>

        <h3 className="mt-3 text-[1.6rem] leading-[1.18] md:text-[1.8rem]">
          <Link href={href} className="transition-opacity duration-300 hover:opacity-70">
            {article.title}
          </Link>
        </h3>

        <p className="mt-4 max-w-[34rem] text-[1rem] leading-[1.75] text-ink">
          {article.standfirst}
        </p>

        <Link href={href} className="link-quiet mt-5 inline-block text-[0.95rem]">
          Read the article
        </Link>
      </div>
    </article>
  );
}
