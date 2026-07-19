"use client";

import { useState } from "react";
import { SectionIntro } from "@/components/section-intro";
import type { SiteCopy } from "@/components/site-types";

export function CoursesSection({ content }: { content: SiteCopy["courses"] }) {
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  return (
    <section id="formations" className="px-6 py-24 md:pl-20 md:pr-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} />
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#37627d]">{content.lead}</p>
        <div className="mt-14 space-y-14">
          {content.groups.map((group, groupIndex) => (
            <div key={group.label}>
              <h3 className="border-b border-[#0b4f7e]/20 pb-4 font-mono text-sm uppercase tracking-[0.15em] text-[#2ba9df]">{group.label}</h3>
              <div>
                {group.courses.map((course) => {
                  const key = `${group.label}-${course.code}`;
                  const panelId = `course-panel-${groupIndex}-${course.code}`;
                  const isExpanded = expandedCourse === key;

                  return (
                    <article key={key} className="border-b border-dotted border-[#0b4f7e]/25">
                      <button
                        type="button"
                        className="button-no-fill grid w-full grid-cols-[2.5rem_1fr_auto] gap-3 py-5 text-left sm:grid-cols-[4rem_1fr_minmax(10rem,14rem)_auto] sm:gap-5"
                        onClick={() => setExpandedCourse(isExpanded ? null : key)}
                        aria-expanded={isExpanded}
                        aria-controls={panelId}
                      >
                        <span className="font-mono text-xs text-[#37627d]">{course.code}</span>
                        <span className="font-serif text-xl leading-tight text-[#06395f]">{course.title}</span>
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
                          <div className="pb-5 pl-10 pr-8 text-sm leading-6 text-[#37627d] sm:pl-16">
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
