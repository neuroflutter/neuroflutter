import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { imageUrl } from "@/sanity/client";

/**
 * Renders a body written in Sanity. Deliberately produces the same markup and
 * the same `prose-nf` wrapper as ArticleBody, so an article written in the CMS
 * is indistinguishable from one written in code.
 */
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href || "#";
      const external = /^https?:\/\//i.test(href);
      return (
        <a
          href={href}
          className="text-maroon underline underline-offset-2"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = imageUrl(value, 1120);
      if (!src) return null;
      const { alt, caption, credit } = (value || {}) as {
        alt?: string;
        caption?: string;
        credit?: string;
      };
      return (
        <figure className="my-12">
          <div className="flex justify-center">
            <Image
              src={src}
              alt={alt || ""}
              width={560}
              height={420}
              className="h-auto w-full max-w-sm"
            />
          </div>
          {(caption || credit) && (
            <figcaption className="mt-4 text-center text-[0.82rem] text-ink-soft">
              {caption}
              {credit && <span className="block italic opacity-80">{credit}</span>}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function PortableBody({ blocks }: { blocks: PortableTextBlock[] }) {
  return (
    <div className="prose-nf">
      <PortableText value={blocks} components={components} />
    </div>
  );
}
