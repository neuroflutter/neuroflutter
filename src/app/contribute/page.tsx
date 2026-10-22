import type { Metadata } from "next";
import ContributeForm from "@/components/ContributeForm";

export const metadata: Metadata = {
  title: "Write With NeuroFlutter",
  description:
    "Share a neuroscience idea with NeuroFlutter Learn. We welcome thoughtful contributions from students, researchers and science communicators.",
  alternates: { canonical: "/contribute/" },
};

export default function Contribute() {
  return (
    <>
      <section className="mx-auto max-w-[72rem] px-6 pt-16 md:px-8 md:pt-24">
        <div className="mx-auto max-w-[40rem] text-center">
          <h1 className="text-[2.5rem] leading-[1.08] md:text-[2.9rem]">
            Write With NeuroFlutter
          </h1>
          <p className="mt-6 text-[1.22rem] leading-[1.5] text-maroon-deep">
            Have an idea worth sharing?
          </p>
          <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.8] text-ink">
            <p>
              NeuroFlutter Learn is built around the belief that knowledge grows
              when we share it.
            </p>
            <p>
              We&apos;re always excited to hear from people who are curious
              about the brain and have something meaningful to contribute.
            </p>
            <p>
              Whether you&apos;re a neuroscience student, an early-career
              researcher, an experienced scientist or someone with a passion for
              science communication, we welcome fresh perspectives and
              thoughtful ideas.
            </p>
            <p>
              You don&apos;t need to have a finished article to get in touch. If
              there&apos;s a topic you&apos;d love to write about, we&apos;d be
              happy to hear your idea.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-[72rem] px-6 md:mt-24 md:px-8">
        <hr className="plate-rule" />
        <div className="grid gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-20">
          <div>
            <h2 className="text-[1.55rem] leading-[1.18] md:text-[1.7rem]">
              What Can You Write About?
            </h2>
            <div className="mt-5 space-y-4 text-[1.02rem] leading-[1.8] text-ink">
              <p>
                We welcome neuroscience explainers, research perspectives,
                discussions of new discoveries, reflections on scientific topics
                and accessible educational articles.
              </p>
              <p>
                We particularly value writing that is clear, engaging,
                scientifically responsible and encourages readers to think a
                little differently.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-[1.55rem] leading-[1.18] md:text-[1.7rem]">
              How to Contribute
            </h2>
            <div className="mt-5 space-y-4 text-[1.02rem] leading-[1.8] text-ink">
              <p>
                Simply tell us a little about yourself and the article
                you&apos;d like to write.
              </p>
              <p>
                We&apos;ll review your proposal and get in touch if it&apos;s a
                good fit for NeuroFlutter Learn.
              </p>
              <p>
                If your idea is selected, we&apos;ll work together on the next
                steps before publication. All published work is credited to its
                author.
              </p>
            </div>
          </div>
        </div>
        <hr className="plate-rule" />
      </section>

      <section className="mx-auto max-w-[72rem] px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[44rem]">
          <h2 className="text-[1.55rem] leading-[1.18] md:text-[1.7rem]">
            Tell Us Your Idea
          </h2>
          <div className="mt-9">
            <ContributeForm />
          </div>
        </div>
      </section>
    </>
  );
}
