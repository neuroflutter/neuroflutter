import type { Metadata } from "next";
import Image from "next/image";
import { founderNote } from "@/content/founder";

export const metadata: Metadata = {
  title: "About NeuroFlutter",
  description:
    "NeuroFlutter is a neuroscience publication and platform founded by Hala Al Masri. Read about our mission, vision and story.",
  alternates: { canonical: "/about/" },
};

const panel = "flex flex-col justify-center px-7 py-14 md:px-12 md:py-20 lg:px-16";

export default function About() {
  return (
    <>
      {/* ───────── 1. About NeuroFlutter ───────── */}
      <section className="mx-auto max-w-[72rem] px-6 pt-16 md:px-8 md:pt-24">
        <div className="mx-auto max-w-[40rem] text-center">
          <h1 className="text-[2.6rem] leading-[1.08] md:text-[3.1rem]">
            About NeuroFlutter
          </h1>
          <div className="mt-8 space-y-5 text-[1.05rem] leading-[1.8] text-ink">
            <p>
              NeuroFlutter was born from a love of neuroscience and a belief
              that scientific curiosity should have no boundaries.
            </p>
            <p>
              Inspired by the journey of a caterpillar becoming a butterfly,
              NeuroFlutter celebrates the beauty of learning, transformation and
              discovery. It is a space for sharing knowledge, welcoming
              different perspectives and encouraging people to explore the
              extraordinary world of the brain.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── 2. A Note From the Founder ───────── */}
      <section id="founder" className="mx-auto max-w-[72rem] scroll-mt-20 px-6 pt-20 md:px-8 md:pt-28">
        <hr className="plate-rule" />
        <h2 className="mt-16 text-center text-[2rem] leading-[1.12] md:text-[2.3rem]">
          A Note From the Founder
        </h2>

        <div className="mx-auto mt-12 max-w-[36rem]">
          <p className="text-[1.12rem] leading-[1.7] text-maroon">
            {founderNote.lead}
          </p>

          <div className="mt-6 space-y-5 text-[1.05rem] leading-[1.85] text-ink">
            {founderNote.before.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <p className="my-10 text-[1.22rem] font-medium leading-[1.55] text-maroon">
            {founderNote.question}
          </p>

          <div className="space-y-5 text-[1.05rem] leading-[1.85] text-ink">
            {founderNote.after.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>{founderNote.closing}</p>
          </div>

          <div className="mt-12">
            <p className="text-[1.02rem] text-ink">With love and curiosity,</p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-[1.7rem] leading-none text-maroon">
              Hala Al Masri
            </p>
            <p className="mt-2 text-[0.9rem] text-ink-soft">Founder, NeuroFlutter</p>
          </div>
        </div>
      </section>

      {/* ───────── 3. Mission and Vision ───────── */}
      <section className="mx-auto mt-24 max-w-[72rem] px-6 pb-8 md:mt-32 md:px-8">
        <div className="grid border-t border-blue-deep md:grid-cols-2">
          <div className={`${panel} items-center border-b border-blue-deep md:border-r`}>
            <Image
              src="/illustrations/caterpillar.webp"
              alt="Watercolour illustration of a green and yellow caterpillar."
              width={810}
              height={570}
              className="w-[58%] max-w-[15rem] md:w-[70%] md:max-w-[17rem]"
            />
          </div>

          <div className={`${panel} border-b border-blue-deep`}>
            <div className="mx-auto w-full max-w-[26rem]">
              <h2 className="text-center text-[1.85rem] leading-[1.12] md:text-[2.05rem]">
                Mission
              </h2>
              <p className="mt-5 text-center text-[1.02rem] text-maroon-soft">
                Transforming minds, stage by stage.
              </p>
              <div className="mt-5 space-y-4 text-[0.99rem] leading-[1.8] text-ink">
                <p>
                  Our mission is to make neuroscience more accessible, engaging
                  and collaborative.
                </p>
                <p>
                  We want to encourage curiosity about the brain by bringing
                  scientific discoveries, thoughtful perspectives and
                  educational writing beyond traditional academic spaces.
                </p>
                <p>
                  Through NeuroFlutter, we hope to create opportunities for
                  people to learn from one another, share their knowledge and
                  contribute to conversations about the brain and human
                  experience.
                </p>
              </div>
            </div>
          </div>

          <div className={`${panel} border-b border-blue-deep md:border-r`}>
            <div className="mx-auto w-full max-w-[26rem]">
              <h2 className="text-center text-[1.85rem] leading-[1.12] md:text-[2.05rem]">
                Vision
              </h2>
              <p className="mt-5 text-center text-[1.02rem] text-maroon-soft">
                Growth in every thought, reflecting the butterfly&apos;s journey.
              </p>
              <div className="mt-5 space-y-4 text-[0.99rem] leading-[1.8] text-ink">
                <p>
                  We envision a community where neuroscience is not limited to
                  laboratories, universities or scientific publications, but is
                  something people from different backgrounds can explore and
                  appreciate.
                </p>
                <p>
                  Just as a caterpillar gradually transforms into a butterfly,
                  we believe learning is a continuous journey of growth,
                  discovery and new possibilities.
                </p>
                <p>
                  Our vision is to nurture a community of curious minds,
                  encouraging meaningful conversations, new perspectives and a
                  shared enthusiasm for understanding the brain.
                </p>
              </div>
            </div>
          </div>

          <div className={`${panel} items-center border-b border-blue-deep`}>
            <Image
              src="/illustrations/butterfly-teal.webp"
              alt="Watercolour illustration of a teal butterfly with raised wings."
              width={1046}
              height={944}
              className="w-[72%] max-w-[19rem] md:w-[88%] md:max-w-[22rem]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
