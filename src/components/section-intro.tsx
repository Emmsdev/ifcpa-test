export function SectionIntro({ eyebrow, title, inverse = false }: { eyebrow: string; title: string; inverse?: boolean }) {
  return (
    <div>
      <p className={`font-mono text-sm uppercase tracking-[0.14em] ${inverse ? "text-[#7ad4f4]" : "text-[#2ba9df]"}`}>{eyebrow}</p>
      <h2 className={`mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl ${inverse ? "text-white" : "text-[#06395f]"}`}>{title}</h2>
    </div>
  );
}
