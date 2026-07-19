import type { Locale } from "@/components/site-types";

const pathways = {
  fr: {
    eyebrow: "Vos accès directs",
    title: "Trouvez le parcours qui correspond à votre besoin.",
    items: [
      { number: "01", title: "Formation initiale", description: "Se former aux métiers de l'image, du son, des médias, du numérique et des archives.", href: "#formations", action: "Voir les filières" },
      { number: "02", title: "Formation continue", description: "Actualiser les compétences des professionnels et accompagner les organisations.", href: "#continue", action: "Découvrir les formats" },
      { number: "03", title: "Patrimoine audiovisuel", description: "Comprendre les métiers qui collectent, documentent, préservent et valorisent la mémoire.", href: "#patrimoine", action: "Explorer la mission" },
      { number: "04", title: "Admissions", description: "Consulter les étapes du concours et préparer sa candidature selon l'avis officiel.", href: "#admissions", action: "Comment candidater" },
    ],
  },
  en: {
    eyebrow: "Quick access",
    title: "Find the pathway that matches your needs.",
    items: [
      { number: "01", title: "Initial training", description: "Train for careers in image, sound, media, digital technology and archives.", href: "#formations", action: "View programmes" },
      { number: "02", title: "Continuing education", description: "Update professional skills and support organisations through change.", href: "#continue", action: "Explore formats" },
      { number: "03", title: "Audiovisual heritage", description: "Discover the professions that collect, document, preserve and promote audiovisual memory.", href: "#patrimoine", action: "Explore the mission" },
      { number: "04", title: "Admissions", description: "Review the entrance-exam steps and prepare your application from the official notice.", href: "#admissions", action: "How to apply" },
    ],
  },
} satisfies Record<Locale, { eyebrow: string; title: string; items: { number: string; title: string; description: string; href: string; action: string }[] }>;

export function PrimaryPathways({ locale }: { locale: Locale }) {
  const content = pathways[locale];

  return (
    <section className="section-shell border-y border-[var(--outline-variant)] bg-[var(--surface-bright)] py-20 lg:py-28" aria-labelledby="primary-pathways-title">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-8 lg:grid-cols-[.65fr_1fr] lg:items-end">
          <p className="eyebrow-line text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--secondary)]">{content.eyebrow}</p>
          <h2 id="primary-pathways-title" className="max-w-3xl font-serif text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--primary)] sm:text-4xl">{content.title}</h2>
        </div>
        <div className="mt-12 grid border-l border-t border-[var(--outline-variant)] sm:grid-cols-2 lg:grid-cols-4">
          {content.items.map((item) => (
            <a key={item.href} href={item.href} data-scroll-item className="group relative flex min-h-72 flex-col overflow-hidden border-b border-r border-[var(--outline-variant)] bg-[var(--surface-bright)] p-6 transition-colors duration-500 hover:bg-[var(--primary)] focus-visible:bg-[var(--primary)] sm:p-7">
              <span className="font-serif text-5xl font-semibold tracking-[-0.07em] text-[var(--secondary)]/35 transition-colors duration-500 group-hover:text-[var(--secondary)] group-focus-visible:text-[var(--secondary)]">{item.number}</span>
              <h3 className="mt-8 font-serif text-2xl font-semibold leading-tight tracking-[-0.035em] text-[var(--primary)] transition-colors duration-500 group-hover:text-white group-focus-visible:text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-[var(--on-surface-variant)] transition-colors duration-500 group-hover:text-white/68 group-focus-visible:text-white/68">{item.description}</p>
              <span className="mt-auto flex items-center justify-between pt-8 text-sm font-bold text-[var(--primary)] transition-colors duration-500 group-hover:text-white group-focus-visible:text-white">
                {item.action}
                <span aria-hidden="true" className="grid h-9 w-9 place-items-center bg-[var(--secondary)] text-lg text-[var(--primary)] transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
