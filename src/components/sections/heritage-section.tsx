import Image from "next/image";
import { SectionIntro } from "@/components/section-intro";
import type { SiteCopy } from "@/components/site-types";

export function HeritageSection({ content, archiveImage }: { content: SiteCopy["heritage"]; archiveImage: string }) {
  return (
    <section id="patrimoine" className="relative overflow-hidden bg-[#06395f] text-white">
      <div className="studio-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1600px] lg:grid-cols-[.96fr_1.04fr]">
        <div className="section-shell py-24 lg:py-36">
          <div className="mx-auto max-w-2xl lg:ml-auto lg:mr-0 lg:pr-10">
            <SectionIntro eyebrow={content.eyebrow} title={content.title} inverse />
            <p className="mt-7 max-w-xl text-base leading-8 text-white/68">{content.lead}</p>
            <ul className="mt-10 max-w-xl border-b border-white/15">
              {content.points.map((point, index) => (
                <li key={point} className="grid grid-cols-[2.25rem_1fr] gap-4 border-t border-white/15 py-5 text-sm leading-6 text-white/88">
                  <span className="font-serif text-lg font-semibold text-[#2ba9df]">{String(index + 1).padStart(2, "0")}</span>{point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <figure data-scroll-item className="frame-corners relative min-h-[560px] overflow-hidden lg:min-h-full">
          <Image src={archiveImage} alt="Conservation et numérisation du patrimoine audiovisuel de la CRTV" fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)] via-[var(--primary)]/12 to-transparent lg:bg-gradient-to-r lg:from-[var(--primary)]/35 lg:via-transparent lg:to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-6 sm:bottom-12 sm:left-12 sm:right-12">
            <figcaption className="max-w-xs bg-[var(--primary)]/85 px-5 py-4 text-[0.68rem] font-bold uppercase leading-5 tracking-[0.16em] text-white backdrop-blur-md">{content.label}</figcaption>
            <div className="archive-reel relative hidden h-36 w-36 shrink-0 rounded-full border-[14px] border-white/22 bg-[var(--primary)]/40 backdrop-blur-sm sm:block" aria-hidden="true">
              <span className="absolute inset-5 rounded-full border border-dashed border-[var(--secondary)]" />
              <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--secondary)] bg-[var(--primary)]" />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
