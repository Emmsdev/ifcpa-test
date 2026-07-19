"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { SectionIntro } from "@/components/section-intro";
import type { SiteCopy } from "@/components/site-types";

export function ContactSection({ content }: { content: SiteCopy["contact"] }) {
  const [isSent, setIsSent] = useState(false);
  function submitContact(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setIsSent(true); }
  return (
    <section id="contact" className="section-shell border-t border-[#0b4f7e]/10 bg-[var(--surface)] py-24 lg:py-36">
      <div className="mx-auto max-w-[1380px]">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} />
        <div className="mt-16 grid overflow-hidden border border-[var(--outline-variant)] bg-[var(--surface-bright)] shadow-[var(--shadow-soft)] lg:grid-cols-[1.1fr_.9fr]">
          <form onSubmit={submitContact} className="space-y-7 p-7 sm:p-10 lg:p-14">
            <div className="grid gap-7 sm:grid-cols-2">
              <Field label={content.name}><input required name="name" type="text" autoComplete="name" /></Field>
              <Field label={content.email}><input required name="email" type="email" autoComplete="email" /></Field>
            </div>
            <Field label={content.subject}><select name="subject">{content.subjects.map((subject) => <option key={subject}>{subject}</option>)}</select></Field>
            <Field label={content.message}><textarea required name="message" rows={5} /></Field>
            <button type="submit" className="app-button bg-[#06395f] px-7 py-4 text-sm font-bold text-white">{content.send}<span className="ml-3" aria-hidden="true">→</span></button>
            {isSent && <p role="status" className="border-l-2 border-[var(--secondary)] bg-[var(--secondary-fixed)] p-4 text-sm leading-6 text-[#0b4f7e]">{content.sent}</p>}
          </form>

          <div className="relative bg-[var(--primary)] p-7 text-white sm:p-10 lg:p-14">
            <div className="studio-grid absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="relative">
              <h3 className="eyebrow-line text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)]">{content.details}</h3>
              <address className="mt-8 not-italic font-serif text-xl font-semibold leading-9 tracking-[-0.025em] text-white">
                IFCPA / CRTV<br />Ekounou, Yaoundé, Cameroun<br />
                <a href="tel:+237656700852" className="transition hover:text-[var(--secondary)]">+237 6 56 70 08 52</a><br />
                <a href="mailto:ifcpa.crtv@gmail.com" className="break-all transition hover:text-[var(--secondary)]">ifcpa.crtv@gmail.com</a>
              </address>
              <div className="mt-12 border-b border-white/15">
                {content.faq.map((item, index) => (
                  <details key={item.question} open={index === 0} className="border-t border-white/15 py-5">
                    <summary className="cursor-pointer list-none pr-8 text-sm font-semibold text-white marker:content-none">{item.question}<span className="float-right text-xl leading-4 text-[#2ba9df]">+</span></summary>
                    <p className="mt-3 text-sm leading-6 text-white/62">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block"><span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#37627d]">{label}</span><span className="mt-2 block [&_input]:min-h-12 [&_input]:w-full [&_input]:border-b [&_input]:border-[#0b4f7e]/25 [&_input]:bg-transparent [&_input]:px-0 [&_input]:py-3 [&_input]:text-[#06395f] [&_input]:outline-none [&_input:focus]:border-[#2ba9df] [&_select]:min-h-12 [&_select]:w-full [&_select]:border-b [&_select]:border-[#0b4f7e]/25 [&_select]:bg-transparent [&_select]:px-0 [&_select]:py-3 [&_select]:text-[#06395f] [&_select]:outline-none [&_select:focus]:border-[#2ba9df] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:border-b [&_textarea]:border-[#0b4f7e]/25 [&_textarea]:bg-transparent [&_textarea]:px-0 [&_textarea]:py-3 [&_textarea]:text-[#06395f] [&_textarea]:outline-none [&_textarea:focus]:border-[#2ba9df]">{children}</span></label>;
}
