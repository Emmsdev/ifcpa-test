import Image from "next/image";
import type { Locale } from "@/components/site-types";
import { SectionIntro } from "@/components/section-intro";

const content = {
  fr: {
    eyebrow: "La vie de l'Institut",
    title: "Les idées prennent vie sur le terrain.",
    body: "Projets d'apprenants, exercices pratiques et moments de campus : découvrez la communauté IFCPA au travail, dans ses vrais espaces de formation.",
    action: "Suivre l'IFCPA sur Facebook",
    tags: ["Productions d'apprenants", "Pratique radio & télévision", "Créativité collective"],
    caption: "Apprendre, créer et produire en situation réelle.",
    campusAlt: "Apprenants et encadreurs réunis devant le campus de l'IFCPA à Yaoundé",
    cameraAlt: "Atelier pratique avec une caméra professionnelle à l'IFCPA",
    communityAlt: "Communauté de l'IFCPA réunie lors d'une activité de l'Institut",
  },
  en: {
    eyebrow: "Life at the Institute",
    title: "Ideas come to life through practice.",
    body: "Learner projects, hands-on exercises and campus moments: discover the IFCPA community at work in its real training spaces.",
    action: "Follow IFCPA on Facebook",
    tags: ["Learner productions", "Radio & television practice", "Collective creativity"],
    caption: "Learn, create and produce in real-world settings.",
    campusAlt: "Learners and staff gathered in front of the IFCPA campus in Yaounde",
    cameraAlt: "Hands-on workshop with a professional camera at IFCPA",
    communityAlt: "The IFCPA community gathered during an Institute event",
  },
} satisfies Record<Locale, Record<string, string | string[]>>;

export function CampusSection({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <section id="campus" className="bg-[var(--surface-container-low)] px-6 py-24 md:px-16 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionIntro eyebrow={t.eyebrow as string} title={t.title as string} />
          <p className="mt-6 max-w-xl text-lg leading-7 text-[var(--on-surface-variant)]">{t.body as string}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {(t.tags as string[]).map((tag) => <span key={tag} className="rounded-sm bg-[var(--secondary-fixed)] px-3 py-2 text-xs font-semibold text-[var(--on-secondary-fixed-variant)]">{tag}</span>)}
          </div>
          <a href="https://www.facebook.com/ifcpacrtv/" target="_blank" rel="noreferrer" className="app-button group mt-9 inline-flex items-center gap-3 rounded-sm bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white">
            {t.action as string}<span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span>
          </a>
        </div>
        <div data-scroll-item className="grid min-h-[520px] grid-cols-2 grid-rows-2 gap-3 lg:col-span-7">
          <figure className="group relative col-span-2 row-span-1 min-h-[300px] overflow-hidden rounded-md bg-[var(--primary)] sm:row-span-2">
            <Image src="/ifcpa-campus.jpg" alt={t.campusAlt as string} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025] motion-reduce:transition-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)] via-transparent to-transparent" />
            <figcaption className="absolute bottom-0 left-0 max-w-md p-6 text-white md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--secondary-fixed)]">IFCPA / CRTV</p>
              <p className="mt-3 text-lg font-semibold leading-7">{t.caption as string}</p>
            </figcaption>
          </figure>
          <figure className="group relative min-h-[210px] overflow-hidden rounded-md bg-[var(--primary)] sm:col-start-2 sm:row-start-1 sm:ml-12 sm:mt-8">
            <Image src="/ifcpa-practical-camera.jpg" alt={t.cameraAlt as string} fill sizes="(min-width: 1024px) 24vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none" />
          </figure>
          <figure className="group relative min-h-[210px] overflow-hidden rounded-md border-4 border-[var(--surface-container-low)] bg-[var(--primary)] sm:col-start-2 sm:row-start-2 sm:-ml-8 sm:mb-8">
            <Image src="/ifcpa-community.jpg" alt={t.communityAlt as string} fill sizes="(min-width: 1024px) 26vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105 motion-reduce:transition-none" />
          </figure>
        </div>
      </div>
    </section>
  );
}
