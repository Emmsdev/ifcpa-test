"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { SectionIntro } from "@/components/section-intro";
import type { SiteCopy } from "@/components/site-types";

export function ContactSection({ content }: { content: SiteCopy["contact"] }) {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [senderName, setSenderName] = useState("");

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const subject = String(formData.get("subject") ?? "");
    const message = String(formData.get("message") ?? "");

    setErrorMessage(null);
    setIsSending(true);
    setSenderName(name);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = (await response.json()) as { message?: string; success?: boolean };
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Une erreur est survenue lors de l'envoi.");
      }

      form.reset();
      setIsSent(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Erreur lors de l'envoi.");
    } finally {
      setIsSending(false);
    }
  }

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
            
            {errorMessage && (
              <p role="alert" className="border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="app-button bg-[#06395f] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#0b4f7e] disabled:opacity-60 disabled:cursor-wait"
            >
              {isSending ? "Transmission en cours…" : content.send}<span className="ml-3" aria-hidden="true">→</span>
            </button>
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

      {/* Pop-up Modal de Confirmation de Message */}
      {isSent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div role="dialog" aria-modal="true" className="relative w-full max-w-md overflow-hidden rounded-none bg-white p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-none bg-emerald-100 text-emerald-600 shadow-inner">
              <svg className="h-9 w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="mt-5 font-serif text-2xl font-bold text-[#06395f]">Message envoyé avec succès !</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {senderName ? `Merci ${senderName} ! ` : ""}Votre demande a bien été transmise au service de contact de l&apos;IFCPA. Notre équipe vous répondra par email dans les meilleurs délais.
            </p>
            
            <div className="mt-6 rounded-none bg-slate-50 p-4 text-xs font-semibold text-[#06395f]">
              ✨ Confirmation de prise en charge instantanée
            </div>
            
            <button
              type="button"
              onClick={() => setIsSent(false)}
              className="mt-7 w-full rounded-none bg-[#06395f] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#06395f]/20 transition hover:bg-[#0b4f7e] focus:outline-none"
            >
              Fermer la confirmation
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block"><span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#37627d]">{label}</span><span className="mt-2 block [&_input]:min-h-12 [&_input]:w-full [&_input]:border-b [&_input]:border-[#0b4f7e]/25 [&_input]:bg-transparent [&_input]:px-0 [&_input]:py-3 [&_input]:text-[#06395f] [&_input]:outline-none [&_input:focus]:border-[#2ba9df] [&_select]:min-h-12 [&_select]:w-full [&_select]:border-b [&_select]:border-[#0b4f7e]/25 [&_select]:bg-transparent [&_select]:px-0 [&_select]:py-3 [&_select]:text-[#06395f] [&_select]:outline-none [&_select:focus]:border-[#2ba9df] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:border-b [&_textarea]:border-[#0b4f7e]/25 [&_textarea]:bg-transparent [&_textarea]:px-0 [&_textarea]:py-3 [&_textarea]:text-[#06395f] [&_textarea]:outline-none [&_textarea:focus]:border-[#2ba9df]">{children}</span></label>;
}
