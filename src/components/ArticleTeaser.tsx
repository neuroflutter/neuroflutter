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

export default function ArticleTeaser({
  article,
  size = "default",
}: {
  article: Article;
  size?: "default" | "large";
}) {
  const author = getAuthor(article.authorId);
  const large = size === "large";

  return (
    <article
      data-nf-item
      data-nf-category={article.category}
      data-nf-text={`${article.title} ${article.standfirst} ${article.category}`.toLowerCase()}
      className={
        large
          ? "grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-14"
          : "grid gap-5"
      }
    >
      <Link
        href={`/learn/${article.slug}/`}
        className="group block"
        tabIndex={-1}
        aria-hidden
      >
        <div
          className={`relative flex items-center justify-center ${
            large ? "aspect-[4/3]" : "aspect-[5/4]"
          }`}
        >
          <span
            aria-hidden
            className="absolute inset-[12%] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, var(--color-blue) 0%, var(--color-blue) 45%, transparent 72%)",
              opacity: 0.55,
            }}
          />
          <Image
            src={article.image}
            alt=""
            width={520}
            height={420}
            className="relative h-[82%] w-auto object-contain transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      <div>
        <p className="text-[0.86rem] text-maroon-soft">{article.category}</p>

        <h3
          className={`mt-3 leading-tight ${
            large ? "text-[2rem] md:text-[2.4rem]" : "text-[1.4rem]"
          }`}
        >
          <Link
            href={`/learn/${article.slug}/`}
            className="transition-colors hover:text-maroon"
          >
            {article.title}
          </Link>
        </h3>

        <p
          className={`mt-3 text-ink-soft ${
            large ? "text-[1.05rem] leading-relaxed" : "text-[0.95rem] leading-relaxed"
          }`}
        >
          {article.standfirst}
        </p>

        <p className="mt-4 text-[0.84rem] text-ink-soft">
          {author.name} — {formatDate(article.date)}
          {article.placeholder && (
            <span className="ml-2 rounded-full bg-blue px-2 py-0.5 text-[0.72rem] text-maroon">
              Demo
            </span>
          )}
        </p>
      </div>
    </article>
  );
}
