import Image from "next/image";
import { SectionIntro } from "@/components/section-intro";
import type { Locale, SiteCopy } from "@/components/site-types";

const leadershipCopy = {
  fr: {
    eyebrow: "Direction",
    name: "Pr Emmanuel Mbede",
    role: "Directeur de l'IFCPA/CRTV",
    bio: "Expert des médias et docteur en sciences de l'information et de la communication de l'Université Lyon II, Emmanuel Mbede a exercé comme journaliste radio, producteur audiovisuel et directeur des antennes TV de la CRTV. Il est également maître de Conférences HdR à l'ESSTIC de l'Université de Yaoundé II.",
    quote: "Former des professionnels capables de créer, transmettre et préserver la mémoire audiovisuelle.",
    imageAlt: "Pr Emmanuel Mbede, directeur de l'IFCPA/CRTV",
  },
  en: {
    eyebrow: "Leadership",
    name: "Pr Emmanuel Mbede",
    role: "Director of IFCPA/CRTV",
    bio: "A media expert with a PhD in information and communication sciences from Lyon II University, Emmanuel Mbede has worked as a radio journalist, audiovisual producer and CRTV television director. He is also a Senior Lecturer HdR at ESSTIC, University of Yaounde II.",
    quote: "Training professionals who can create, transmit and preserve audiovisual memory.",
    imageAlt: "Pr Emmanuel Mbede, director of IFCPA/CRTV",
  },
} satisfies Record<Locale, Record<string, string>>;

export function InstituteSection({ content, locale }: { content: SiteCopy["institute"]; locale: Locale }) {
  const leadership = leadershipCopy[locale];

  return (
    <section id="institut" className="section-shell border-y border-[#0b4f7e]/10 bg-[var(--surface)] py-24 lg:py-36">
      <div className="mx-auto max-w-[1380px]">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} />
        <div className="mt-16 grid gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
          <div>
            <p className="max-w-xl text-lg font-medium leading-8 text-[#37627d]">{content.lead}</p>
            <div className="mt-12 border-l border-[#0b4f7e]/20 pl-7">
              {content.history.map((item) => (
                <article key={item.date} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[34px] top-0.5 h-3.5 w-3.5 bg-[#2ba9df] ring-4 ring-[var(--surface)]" />
                  <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#2ba9df]">{item.date}</p>
                  <h3 className="mt-2 font-serif text-2xl font-semibold tracking-[-0.035em]">{item.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-[#37627d]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <p className="max-w-2xl border-l-4 border-[var(--error)] pl-6 font-serif text-2xl font-semibold leading-9 tracking-[-0.035em] text-[var(--primary)]">{content.vision}</p>
            <div className="mt-10 grid grid-cols-1 border-t border-[#0b4f7e]/15 sm:grid-cols-2">
              {content.values.map((value) => (
                <article key={value.mark} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-[#0b4f7e]/15 py-6 sm:pr-6 sm:even:border-l sm:even:pl-6">
                  <span className="font-serif text-xl font-semibold text-[#2ba9df]">{value.mark}</span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold tracking-[-0.025em]">{value.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#37627d]">{value.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <article data-scroll-item className="dark-surface-card frame-corners relative mt-24 overflow-hidden bg-[var(--primary)] text-white shadow-[var(--shadow-strong)] lg:grid lg:grid-cols-[minmax(320px,.72fr)_1fr]">
          <div className="relative min-h-[440px] lg:min-h-[520px]">
            <Image src="/ifcpa-director-emmanuel-mbede.jpg" alt={leadership.imageAlt} fill sizes="(min-width: 1024px) 36vw, 100vw" className="object-cover object-[center_18%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--primary)]/35" />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary-container)]">{leadership.eyebrow}</p>
            <h3 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">{leadership.name}</h3>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-white/58">{leadership.role}</p>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72">{leadership.bio}</p>
            <blockquote className="mt-8 border-l-2 border-[var(--secondary-container)] pl-5 font-serif text-xl italic leading-8 text-white/92">{leadership.quote}</blockquote>
          </div>
        </article>
      </div>
    </section>
  );
}
