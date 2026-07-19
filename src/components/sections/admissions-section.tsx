import { SectionIntro } from "@/components/section-intro";
import type { Locale, SiteCopy } from "@/components/site-types";

const competitionCopy = {
  fr: {
    status: "Concours 2026 ouvert",
    title: "Les candidatures sont recevables jusqu'au 6 septembre 2026.",
    description: "Le concours est ouvert dès 16 ans aux candidats camerounais et étrangers titulaires, selon la filière, d'un BEPC/GCE O/L, CAP, Probatoire ou Baccalauréat/GCE A/L. La session prévoit 280 places.",
    deadlineLabel: "Date limite de candidature",
    deadlineDate: "6 septembre 2026",
    writtenLabel: "Épreuves écrites",
    writtenDate: "11 septembre 2026",
    oralLabel: "Épreuves orales",
    oralDate: "12 septembre 2026",
    ageLabel: "Âge minimum",
    ageValue: "16 ans",
    qualificationLabel: "Diplômes acceptés",
    qualificationValue: "BEPC/GCE O/L · CAP · Probatoire · Bacc/GCE A/L",
    placesLabel: "Places disponibles",
    placesValue: "280 places",
    consultAction: "Consulter l'arrêté",
    downloadAction: "Télécharger l'arrêté",
    source: "Décision CRTV n° 001275 du 1er juillet 2026",
    note: "Les conditions détaillées, les pièces du dossier et les filières ouvertes figurent dans l'arrêté.",
  },
  en: {
    status: "2026 entrance exam open",
    title: "Applications are accepted until 6 September 2026.",
    description: "The entrance exam is open from age 16 to Cameroonian and international applicants holding, depending on the programme, a BEPC/GCE O/L, CAP, Probatoire or Baccalaureate/GCE A/L. A total of 280 places are available.",
    deadlineLabel: "Application deadline",
    deadlineDate: "6 September 2026",
    writtenLabel: "Written examinations",
    writtenDate: "11 September 2026",
    oralLabel: "Oral examinations",
    oralDate: "12 September 2026",
    ageLabel: "Minimum age",
    ageValue: "16 years",
    qualificationLabel: "Accepted qualifications",
    qualificationValue: "BEPC/GCE O/L · CAP · Probatoire · Bacc/GCE A/L",
    placesLabel: "Available places",
    placesValue: "280 places",
    consultAction: "Read the notice",
    downloadAction: "Download the notice",
    source: "CRTV Decision No. 001275 of 1 July 2026",
    note: "The full requirements, application documents and programmes available are listed in the notice.",
  },
} satisfies Record<Locale, Record<string, string>>;

export function AdmissionsSection({ content, locale }: { content: SiteCopy["admissions"]; locale: Locale }) {
  const competition = competitionCopy[locale];
  const keyFacts = [
    { label: competition.deadlineLabel, value: competition.deadlineDate, emphasis: true },
    { label: competition.writtenLabel, value: competition.writtenDate },
    { label: competition.oralLabel, value: competition.oralDate },
    { label: competition.ageLabel, value: competition.ageValue },
    { label: competition.placesLabel, value: competition.placesValue },
    { label: competition.qualificationLabel, value: competition.qualificationValue },
  ];

  return (
    <section id="admissions" className="section-shell bg-[var(--surface)] py-24 lg:py-36">
      <div className="mx-auto max-w-[1380px]">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} />
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#37627d]">{content.lead}</p>

        <article data-scroll-item className="dark-surface-card frame-corners relative mt-14 overflow-hidden bg-[var(--primary)] p-7 text-white shadow-[var(--shadow-strong)] sm:p-10 lg:p-14">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[42px] border-white/[0.035]" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary-container)]"><span className="recording-light h-2 w-2 rounded-full bg-[var(--error)]" aria-hidden="true" />{competition.status}</p>
              <h3 className="mt-5 max-w-3xl font-serif text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl">{competition.title}</h3>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/72">{competition.description}</p>
              <div className="mt-7 grid max-w-4xl gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
                {keyFacts.map((fact) => (
                  <div key={fact.label} className="bg-white/[0.045] p-5 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.14em] text-white/55">{fact.label}</p>
                    <p className={`mt-2 font-semibold leading-6 ${fact.emphasis ? "text-[var(--secondary-container)]" : "text-white"}`}>{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-3">
              <a href="#inscription-concours" className="app-button group inline-flex w-fit items-center gap-3 bg-[var(--error)] px-5 py-4 text-sm font-bold text-white shadow-lg shadow-black/10">
                {locale === "fr" ? "S'inscrire en ligne" : "Apply online"}<span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a href="/arrete-concours-ifcpa-crtv-2026.pdf" target="_blank" rel="noreferrer" className="app-button group inline-flex w-full items-center justify-between gap-3 border border-white/30 px-5 py-3.5 text-sm font-semibold text-white">
                {competition.consultAction}<span aria-hidden="true">↗</span>
              </a>
              <a href="/arrete-concours-ifcpa-crtv-2026.pdf" download="arrete-concours-ifcpa-crtv-2026.pdf" className="app-button group inline-flex w-full items-center justify-between gap-3 bg-[var(--secondary)] px-5 py-3.5 text-sm font-bold text-[var(--primary)]">
                {competition.downloadAction}<span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="relative mt-8 border-t border-white/15 pt-5 text-xs leading-5 text-white/50">
            <p>{competition.source}</p>
            <p className="mt-1">{competition.note}</p>
          </div>
        </article>

        <div className="mt-20 grid gap-0 lg:grid-cols-[.45fr_1fr]">
          <p className="mb-6 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)] lg:mb-0 lg:pt-8">01 — 05 · Processus</p>
          <div>
          {content.steps.map((step) => (
            <article key={step.number} className="grid grid-cols-[3.25rem_1fr] gap-5 border-t border-[#0b4f7e]/20 py-8 last:border-b">
              <span className="font-serif text-2xl font-semibold text-[#2ba9df]">{step.number}</span>
              <div><h3 className="font-serif text-2xl font-semibold tracking-[-0.03em]">{step.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#37627d]">{step.description}</p></div>
            </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
