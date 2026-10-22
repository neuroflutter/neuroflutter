import { site } from "@/lib/site";

export default function ShareLinks({
  title,
  path,
}: {
  title: string;
  path: string;
}) {
  const url = `${site.url}${path}`;
  const links = [
    {
      label: "Share on LinkedIn",
      short: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "Share on X",
      short: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "Share by email",
      short: "Email",
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <span className="text-[0.88rem] text-ink-soft">
        Share
      </span>
      {links.map((l) => (
        <a
          key={l.short}
          href={l.href}
          aria-label={l.label}
          className="link-quiet text-[0.9rem] text-maroon"
          target="_blank"
          rel="noopener noreferrer"
        >
          {l.short}
        </a>
      ))}
    </div>
  );
}
