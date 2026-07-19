export function SectionIntro({ eyebrow, title, inverse = false }: { eyebrow: string; title: string; inverse?: boolean }) {
  return (
    <div>
      <p className={`eyebrow-line font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] ${inverse ? "text-[#7ad4f4]" : "text-[#2ba9df]"}`}>{eyebrow}</p>
      <h2 className={`mt-6 max-w-4xl font-serif text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[3.5rem] ${inverse ? "text-white" : "text-[#06395f]"}`}>{title}</h2>
    </div>
  );
}
