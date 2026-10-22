
export default function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative">
<div className="relative mx-auto max-w-[76rem] px-6 pb-14 pt-10 md:px-10 md:pb-20 md:pt-16">
        <p className="text-[0.92rem] text-maroon-soft">{eyebrow}</p>
        <h1 className="mt-5 max-w-[20ch] text-[2.5rem] leading-[1.06] tracking-[-0.02em] md:text-[3.4rem]">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-[38rem] text-[1.1rem] leading-relaxed text-ink-soft">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
