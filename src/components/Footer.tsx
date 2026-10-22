import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-[72rem] px-6 pb-12 pt-20 md:px-8 md:pb-16">
      <div className="flex flex-col-reverse items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-[family-name:var(--font-display)] text-[0.92rem] text-maroon">
          © {new Date().getFullYear()} by NeuroFlutter
          <span aria-hidden className="mx-2 text-maroon/50">·</span>
          <Link href="/privacy/" className="hover:text-maroon-deep">
            Privacy
          </Link>
        </p>
        <ul className="flex items-center gap-6">
          {site.social.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                aria-label={s.label}
                className="block transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Image src={s.icon} alt="" width={30} height={30} className="h-[30px] w-auto" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
