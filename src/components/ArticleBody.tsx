import Image from "next/image";
import type { Block } from "@/content/types";

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-nf">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "quote":
            return <blockquote key={i}>{b.text}</blockquote>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            );
          case "figure":
            return (
              <figure key={i} className="my-12">
                <div className="flex justify-center">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    width={560}
                    height={420}
                    className="w-full max-w-sm"
                  />
                </div>
                {(b.caption || b.credit) && (
                  <figcaption className="mt-4 text-center text-[0.82rem] text-ink-soft">
                    {b.caption}
                    {b.credit && (
                      <span className="block italic opacity-80">{b.credit}</span>
                    )}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return <p key={i}>{b.text}</p>;
        }
      })}
    </div>
  );
}
