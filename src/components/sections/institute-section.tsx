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
    <section id="institut" className="border-y border-[#0b4f7e]/10 bg-white px-6 py-24 md:pl-20 md:pr-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionIntro eyebrow={content.eyebrow} title={content.title} />
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="max-w-xl text-lg leading-8 text-[#37627d]">{content.lead}</p>
            <div className="mt-10 border-l border-[#0b4f7e]/20 pl-7">
              {content.history.map((item) => (
                <article key={item.date} className="relative pb-8 last:pb-0">
                  <span className="absolute -left-[33px] top-1 h-3 w-3 rounded-full bg-[#2ba9df] ring-4 ring-white" />
                  <p className="font-mono text-xs text-[#2ba9df]">{item.date}</p>
                  <h3 className="mt-2 font-serif text-2xl">{item.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-[#37627d]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <p className="max-w-xl text-lg leading-8 text-[#37627d]">{content.vision}</p>
            <div className="mt-8 grid grid-cols-1 gap-px bg-[#0b4f7e]/15 sm:grid-cols-2 md:grid-cols-3">
              {content.values.map((value) => (
                <article key={value.mark} className="bg-white p-6">
                  <span className="font-serif text-3xl italic text-[#2ba9df]">{value.mark}</span>
                  <h3 className="mt-3 font-serif text-xl">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#37627d]">{value.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <article data-scroll-item className="dark-surface-card mt-20 overflow-hidden bg-[var(--primary)] text-white lg:grid lg:grid-cols-[minmax(320px,.72fr)_1fr]">
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
