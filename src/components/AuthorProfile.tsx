import Image from "next/image";
import type { Author } from "@/content/types";

/**
 * The standard NeuroFlutter author profile, shown beneath every article and
 * reused by the author pages. Authors come from Sanity once the CMS is
 * connected, so updating a profile there updates every article they wrote.
 */
export default function AuthorProfile({ author }: { author: Author }) {
  return (
    <aside className="bg-blue px-7 py-8">
      <p className="text-[0.72rem] uppercase tracking-[0.16em] text-maroon-soft">
        About the Author
      </p>

      {author.image && (
        <Image
          src={author.image}
          alt={author.imageAlt || author.name}
          width={160}
          height={160}
          className="mt-4 h-auto w-[5.5rem]"
        />
      )}

      <h2 className="mt-4 text-[1.35rem] leading-[1.2]">{author.name}</h2>

      <p className="mt-1.5 text-[0.88rem] text-maroon-soft">{author.role}</p>

      {author.affiliation && (
        <p className="mt-0.5 text-[0.88rem] text-ink-soft">
          {author.affiliation}
        </p>
      )}

      {author.expertise && author.expertise.length > 0 && (
        <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-soft">
          <span className="text-maroon-soft">Research interests: </span>
          {author.expertise.join(" · ")}
        </p>
      )}

      <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">
        {author.bio}
      </p>

      {author.links && author.links.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {author.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="link-quiet text-[0.88rem] text-maroon">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
