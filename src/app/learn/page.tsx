import type { Metadata } from "next";
import Link from "next/link";
import ArticleRow from "@/components/ArticleRow";
import LearnBrowser from "@/components/LearnBrowser";
import { getArticles, categories } from "@/lib/content";

export const metadata: Metadata = {
  title: "NeuroFlutter Learn",
  description:
    "Neuroscience articles, explainers and perspectives from NeuroFlutter Learn — a collaborative space for writing, ideas and shared knowledge about the brain.",
  alternates: { canonical: "/learn/" },
};

export default async function Learn() {
  const all = await getArticles();
  const featured = all.slice(0, 2);
  const rest = all.slice(2);

  return (
    <>
      <section className="mx-auto max-w-[72rem] px-6 pt-16 md:px-8 md:pt-24">
        <div className="mx-auto max-w-[42rem] text-center">
          <h1 className="text-[2.5rem] leading-[1.08] md:text-[3rem]">
            NeuroFlutter Learn
          </h1>
          <p className="mt-6 text-[1.25rem] leading-[1.5] text-maroon-deep">
            Curiosity begins with a question.
          </p>
          <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.8] text-ink">
            <p>
              Welcome to NeuroFlutter Learn, a collaborative space dedicated to
              exploring neuroscience through writing, ideas and shared
              knowledge.
            </p>
            <p>
              Whether you&apos;re a student discovering neuroscience for the
              first time, a researcher sharing insights from your field, or
              simply someone fascinated by the human brain, NeuroFlutter Learn
              is a place to explore new perspectives and deepen your
              understanding.
            </p>
            <p>
              From the latest scientific discoveries to thoughtful discussions
              about the brain and human behaviour, our articles aim to make
              neuroscience engaging, accessible and worth talking about.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Featured Articles ───────── */}
      <section className="mx-auto mt-20 max-w-[72rem] px-6 md:mt-24 md:px-8">
        <h2 className="text-[1.8rem] leading-[1.15] md:text-[2rem]">
          Featured Articles
        </h2>
        <div className="mt-6 divide-y divide-blue-rule border-t border-blue-rule">
          {featured.map((a) => (
            <ArticleRow key={a.slug} article={a} />
          ))}
        </div>
      </section>

      {/* ───────── Explore Our Articles ───────── */}
      {rest.length > 0 && (
        <section className="mx-auto mt-20 max-w-[72rem] px-6 md:mt-24 md:px-8">
          <h2 className="text-[1.8rem] leading-[1.15] md:text-[2rem]">
            Explore Our Articles
          </h2>
          <div className="mt-6">
            <LearnBrowser articles={rest} categories={categories} />
          </div>
        </section>
      )}

      {/* ───────── Have Something to Share? ───────── */}
      <section className="mx-auto mt-24 max-w-[72rem] px-6 md:mt-28 md:px-8">
        <hr className="plate-rule" />
        <div className="grid gap-8 py-16 md:grid-cols-[auto_1fr] md:gap-16 md:py-20">
          <h2 className="text-[1.8rem] leading-[1.15] md:max-w-[14rem] md:text-[2rem]">
            Have Something to Share?
          </h2>
          <div className="max-w-[36rem]">
            <div className="space-y-4 text-[1.02rem] leading-[1.8] text-ink">
              <p>
                Neuroscience is shaped by people who ask questions, challenge
                ideas and share what they discover.
              </p>
              <p>
                At NeuroFlutter Learn, we welcome thoughtful contributions from
                students, researchers, science communicators and anyone with a
                meaningful perspective on the brain.
              </p>
              <p>
                If there&apos;s a topic you&apos;re passionate about or an idea
                you&apos;d love to explore, we&apos;d love to hear from you.
              </p>
            </div>
            <Link href="/contribute/" className="btn-ink mt-8">
              Write With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
