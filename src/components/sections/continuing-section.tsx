import { SectionIntro } from "@/components/section-intro";
import type { SiteCopy } from "@/components/site-types";

export function ContinuingSection({ content }: { content: SiteCopy["continuing"] }) {
  return (
    <section id="continue" className="section-shell relative overflow-hidden border-y border-[#0b4f7e]/10 bg-[var(--surface)] py-24 lg:py-36">
      <span className="pointer-events-none absolute -right-8 top-0 font-serif text-[15rem] font-bold leading-none tracking-[-0.1em] text-[var(--primary)]/[0.025]" aria-hidden="true">PRO</span>
      <div className="relative mx-auto max-w-[1380px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <SectionIntro eyebrow={content.eyebrow} title={content.title} />
          <p className="max-w-2xl text-base leading-8 text-[#37627d] lg:justify-self-end">{content.lead}</p>
        </div>

        <div className="mt-16 grid border-l border-t border-[#0b4f7e]/15 sm:grid-cols-2 lg:grid-cols-5">
          {content.formats.map((format, index) => (
            <article key={format} className="group min-h-48 border-b border-r border-[#0b4f7e]/15 bg-[var(--surface-bright)] p-6 transition-colors duration-300 hover:bg-[var(--secondary-fixed)]">
              <span className="font-serif text-4xl font-semibold tracking-[-0.06em] text-[var(--secondary)]/45">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-8 font-serif text-xl font-semibold tracking-[-0.025em] text-[var(--primary)]">{format}</h3>
            </article>
          ))}
        </div>

        <div className="mt-12 border-l-2 border-[var(--error)] pl-6">
          <p className="mb-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--on-surface-variant)]">Compétences / Skills</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {content.topics.map((topic) => <span key={topic} className="text-sm font-semibold text-[var(--primary)]">{topic}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
