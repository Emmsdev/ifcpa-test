import { SectionIntro } from "@/components/section-intro";
import type { SiteCopy } from "@/components/site-types";

export function ContinuingSection({ content }: { content: SiteCopy["continuing"] }) {
  return <section id="continue" className="border-y border-[#0b4f7e]/10 bg-white px-6 py-24 md:pl-20 md:pr-12 lg:py-32"><div className="mx-auto max-w-7xl"><SectionIntro eyebrow={content.eyebrow} title={content.title} /><p className="mt-5 max-w-2xl text-base leading-7 text-[#37627d]">{content.lead}</p><div className="mt-12 grid border-y border-[#0b4f7e]/15 sm:grid-cols-2 lg:grid-cols-5">{content.formats.map((format) => <div key={format} className="border-b border-r border-[#0b4f7e]/15 p-6 last:border-r-0 sm:last:border-b-0 lg:border-b-0"><span className="font-mono text-[10px] uppercase tracking-widest text-[#2ba9df]">Format</span><h3 className="mt-3 font-serif text-xl">{format}</h3></div>)}</div><div className="mt-10 flex flex-wrap gap-2">{content.topics.map((topic) => <span key={topic} className="border border-[#0b4f7e]/20 px-4 py-2 text-sm text-[#37627d]">{topic}</span>)}</div></div></section>;
}
