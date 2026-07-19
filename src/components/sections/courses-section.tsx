"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionIntro } from "@/components/section-intro";
import type { SiteCopy } from "@/components/site-types";

export function CoursesSection({ content }: { content: SiteCopy["courses"] }) {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  return (
    <section id="formations" className="section-shell bg-[var(--surface-bright)] py-24 lg:py-36">
      <div className="mx-auto max-w-[1380px]">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} />
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#37627d]">{content.lead}</p>

        <div data-scroll-item className="mt-12 grid min-h-[280px] overflow-hidden bg-[var(--primary)] shadow-[var(--shadow-soft)] sm:grid-cols-[1.35fr_.65fr]">
          <figure className="frame-corners group relative min-h-[280px] overflow-hidden">
            <Image src="/ifcpa-campus-life.png" alt="" fill sizes="(min-width: 1024px) 65vw, 100vw" className="object-cover transition duration-1000 group-hover:scale-[1.025] motion-reduce:transition-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/30 via-transparent to-transparent" />
            <figcaption className="absolute bottom-6 left-7 bg-[var(--primary)]/82 px-4 py-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">IMAGE · SON · PRODUCTION</figcaption>
          </figure>
          <figure className="relative hidden overflow-hidden border-l border-white/15 sm:block">
            <Image src="/ifcpa-film-production.jpg" alt="" fill sizes="34vw" className="object-cover opacity-80 transition duration-1000 hover:scale-105 motion-reduce:transition-none" />
            <div className="absolute inset-0 bg-[var(--primary)]/20" />
          </figure>
        </div>

        <div className="mt-20 space-y-16">
          {content.groups.map((group, groupIndex) => (
            <div key={group.label}>
              <h3 className="eyebrow-line border-b border-[#0b4f7e]/20 pb-5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[#2ba9df]">{group.label}</h3>
              <div>
                {group.courses.map((course) => {
                  const key = `${group.label}-${course.code}`;
                  const panelId = `course-panel-${groupIndex}-${course.code}`;
                  const isExpanded = expandedCourse === key;

                  return (
                    <article key={key} className="border-b border-[#0b4f7e]/15 transition-colors hover:bg-[var(--surface)]">
                      <button
                        type="button"
                        className="button-no-fill grid w-full grid-cols-[2.5rem_1fr_auto] gap-3 px-3 py-6 text-left sm:grid-cols-[4rem_1fr_minmax(10rem,14rem)_auto] sm:gap-5"
                        onClick={() => setExpandedCourse(isExpanded ? null : key)}
                        aria-expanded={isExpanded}
                        aria-controls={panelId}
                      >
                        <span className="font-mono text-xs font-bold text-[#2ba9df]">{course.code}</span>
                        <span className="font-serif text-xl font-semibold leading-tight tracking-[-0.025em] text-[#06395f]">{course.title}</span>
                        <span className="hidden text-right text-xs leading-5 text-[#37627d] sm:block">{course.outcome}</span>
                        <span aria-hidden="true" className="relative mt-0.5 h-5 w-5 text-[#2ba9df]">
                          <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-current" />
                          <span className={`absolute left-1/2 top-0 h-5 w-0.5 -translate-x-1/2 bg-current transition-transform duration-300 motion-reduce:transition-none ${isExpanded ? "scale-y-0" : "scale-y-100"}`} />
                        </span>
                        <span className="sr-only">{isExpanded ? content.close : content.open}</span>
                      </button>
                      <div
                        id={panelId}
                        aria-hidden={!isExpanded}
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="pb-6 pl-12 pr-8 text-sm leading-6 text-[#37627d] sm:pl-[5.25rem]">
                            <p className="sm:hidden"><strong>{course.outcome}</strong></p>
                            <p className="mt-2">{course.description}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
