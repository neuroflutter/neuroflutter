import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Newsletter from "@/components/Newsletter";
import ArticleRow from "@/components/ArticleRow";
import { getArticles } from "@/lib/content";
import { founderPreview } from "@/content/founder";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const latest = (await getArticles()).slice(0, 3);

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="relative">
<div className="relative mx-auto grid max-w-[72rem] items-center gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:gap-10 md:px-8 md:pb-28 md:pt-28">
          <div className="plate-in">
            <h1 className="text-[3.1rem] leading-[1.05] tracking-[0.005em] md:text-[3.75rem]">
              NeuroFlutter
            </h1>
            <p className="mt-6 text-[1.3rem] leading-[1.5] text-maroon-deep md:text-[1.45rem]">
              Transforming minds, stage by stage.
            </p>
            <div className="mt-6 max-w-[30rem] space-y-4 text-[1.02rem] leading-[1.75] text-ink">
              <p>
                NeuroFlutter is a space dedicated to exploring the fascinating
                world of neuroscience, bringing together scientific knowledge,
                curiosity and the people who share a passion for understanding
                the brain.
              </p>
              <p>
                Through accessible writing, thoughtful perspectives and
                collaboration, we hope to make neuroscience something more
                people can discover, engage with and contribute to.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/about/#founder" className="btn-ink">
                Discover Our Story
              </Link>
              <Link href="/learn/" className="btn-outline">
                Explore NeuroFlutter Learn
              </Link>
            </div>
          </div>

          <div className="plate-in-late flex justify-center md:justify-end">
            <Image
              src="/illustrations/brain-butterfly-soft.webp"
              alt="Watercolour illustration of a human brain overlaid with a pale blue butterfly, its wing resting across the frontal lobe."
              width={1260}
              height={1066}
              priority
              className="w-[78%] max-w-[26rem] md:w-full"
            />
          </div>
        </div>
      </section>

      {/* ───────── A Note From the Founder ───────── */}
      <section className="mx-auto max-w-[72rem] px-6 md:px-8">
        <hr className="plate-rule" />
        <div className="grid gap-8 py-16 md:grid-cols-[auto_1fr] md:gap-16 md:py-20">
          <h2 className="text-[1.9rem] leading-[1.15] md:max-w-[16rem] md:text-[2.1rem]">
            {founderPreview.heading}
          </h2>
          <div className="max-w-[36rem]">
            <div className="space-y-4 text-[1.02rem] leading-[1.8] text-ink">
              {founderPreview.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-7 font-[family-name:var(--font-display)] text-[1.35rem] leading-none text-maroon">
              {founderPreview.name}
            </p>
            <p className="mt-2 text-[0.88rem] text-ink-soft">{founderPreview.role}</p>
            <Link href="/about/#founder" className="btn-outline mt-8">
              Read My Story
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── Explore NeuroFlutter Learn ───────── */}
      <section className="mx-auto max-w-[72rem] px-6 md:px-8">
        <hr className="plate-rule" />
        <div className="py-16 md:py-20">
          <h2 className="text-[1.9rem] leading-[1.15] md:text-[2.1rem]">
            Explore NeuroFlutter Learn
          </h2>
          <p className="mt-5 max-w-[40rem] text-[1.02rem] leading-[1.8] text-ink">
            A home for curious minds and thoughtful voices. Discover
            neuroscience articles, research perspectives and ideas shared by
            people who are passionate about understanding the brain.
          </p>

          <div className="mt-8 divide-y divide-blue-rule border-t border-blue-rule">
            {latest.map((a) => (
              <ArticleRow key={a.slug} article={a} />
            ))}
          </div>

          <Link href="/learn/" className="btn-outline mt-10">
            Explore All Articles
          </Link>
        </div>
      </section>

      {/* ───────── Stay Curious With NeuroFlutter ───────── */}
      <section id="mailing" className="mx-auto max-w-[72rem] scroll-mt-24 px-6 md:px-8">
        <hr className="plate-rule" />
        <div className="grid gap-8 py-16 md:grid-cols-[auto_1fr] md:gap-16 md:py-20">
          <div className="md:max-w-[19rem]">
            <h2 className="text-[1.9rem] leading-[1.15] md:text-[2.1rem]">
              Stay Curious With NeuroFlutter
            </h2>
          </div>
          <div className="max-w-[36rem]">
            <p className="text-[1.02rem] leading-[1.8] text-ink">
              Join our mailing list to discover new neuroscience articles, hear
              about opportunities to contribute and follow NeuroFlutter as our
              community grows.
            </p>
            <div className="mt-7">
              <Newsletter />
            </div>
          </div>
        </div>
        <hr className="plate-rule" />
      </section>
    </>
  );
}
