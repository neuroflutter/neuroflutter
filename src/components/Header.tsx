"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * The original site showed a short centred nav that omitted the page you were
 * already on. That behaviour is preserved here.
 */
const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Learn", href: "/learn/" },
  { label: "Contribute", href: "/contribute/" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  const current = pathname === "/" ? "/" : `/${pathname.split("/")[1]}/`;
  const visible = pages.filter((p) => p.href !== current);

  return (
    <header className="relative z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-maroon focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-[72rem] px-6 pt-7 md:px-8 md:pt-9">
        <nav aria-label="Primary" className="hidden justify-center md:flex">
          <ul className="flex items-baseline gap-16 lg:gap-20">
            {visible.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-[family-name:var(--font-display)] text-[1.15rem] text-maroon transition-opacity duration-300 hover:opacity-65"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-between md:hidden">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-[1.3rem] text-maroon"
          >
            NeuroFlutter
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 flex h-10 w-10 items-center justify-center text-maroon"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg width="22" height="12" viewBox="0 0 22 12" aria-hidden>
              <path
                d={open ? "M3 1 L19 11 M19 1 L3 11" : "M1 2 H21 M1 10 H21"}
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="mt-5 border-y border-blue-deep md:hidden">
        <ul className="mx-auto max-w-[72rem] px-6">
          {visible.map((item) => (
            <li key={item.href} className="border-b border-blue-rule last:border-0">
              <Link
                href={item.href}
                className="block py-3.5 font-[family-name:var(--font-display)] text-[1.2rem] text-maroon"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
