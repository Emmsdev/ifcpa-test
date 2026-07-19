"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

type Locale = "fr" | "en";

type Course = {
  code: string;
  title: string;
  outcome: string;
  description: string;
};

type SiteCopy = {
  language: string;
  menu: string;
  close: string;
  nav: { href: string; label: string }[];
  hero: { eyebrow: string; title: string; accent: string; description: string; primary: string; secondary: string };
  institute: { eyebrow: string; title: string; lead: string; vision: string; history: { date: string; title: string; description: string }[]; values: { mark: string; title: string; description: string }[] };
  courses: { eyebrow: string; title: string; lead: string; groups: { label: string; courses: Course[] }[]; open: string; close: string };
  continuing: { eyebrow: string; title: string; lead: string; formats: string[]; topics: string[] };
  heritage: { eyebrow: string; title: string; lead: string; points: string[]; label: string };
  admissions: { eyebrow: string; title: string; lead: string; steps: { number: string; title: string; description: string }[] };
  contact: { eyebrow: string; title: string; name: string; email: string; subject: string; message: string; subjects: string[]; send: string; sent: string; details: string; faq: { question: string; answer: string }[] };
  footer: { description: string; institute: string; resources: string; official: string; copyright: string };
};

export const copy: Record<Locale, SiteCopy> = {
  fr: {
    language: "EN",
    menu: "Menu",
    close: "Fermer",
    nav: [
      { href: "#institut", label: "Institut" },
      { href: "#formations", label: "Formations" },
      { href: "#continue", label: "Formation continue" },
      { href: "#patrimoine", label: "Patrimoine" },
      { href: "#admissions", label: "Admissions" },
      { href: "#contact", label: "Contact" },
    ],
    hero: {
      eyebrow: "Institut de Formation et de Conservation du Patrimoine Audiovisuel",
      title: "Former aux métiers de l'image, du son et des médias.",
      accent: "Préserver la mémoire audiovisuelle.",
      description: "L'IFCPA/CRTV forme les créateurs, les techniciens et les professionnels capables d'imaginer, de produire, de diffuser et de préserver les contenus audiovisuels d'aujourd'hui et de demain.",
      primary: "S'inscrire au concours 2026",
      secondary: "Découvrir les formations",
    },
    institute: {
      eyebrow: "L'institut",
      title: "Une histoire au service de l'audiovisuel camerounais.",
      lead: "L'Institut accompagne depuis plusieurs décennies l'évolution des métiers de la radio, de la télévision, du cinéma, du numérique et de la conservation des archives.",
      vision: "Faire de l'IFCPA une institution de référence dans la formation aux métiers de l'audiovisuel et de la conservation du patrimoine en Afrique centrale.",
      history: [
        { date: "1983", title: "Centre de Formation Professionnelle", description: "Création du centre, dédié à la formation des techniciens de la télévision naissante." },
        { date: "Évolution", title: "Ouverture des spécialités", description: "Élargissement à de nouveaux publics, de nouvelles filières et aux mutations numériques." },
        { date: "Aujourd'hui", title: "IFCPA", description: "Deux ambitions réunies : former les professionnels et préserver la mémoire audiovisuelle." },
      ],
      values: [
        { mark: "I", title: "Excellence", description: "La qualité dans la formation, la création et l'exercice professionnel." },
        { mark: "II", title: "Rigueur", description: "Précision, discipline et respect des normes techniques." },
        { mark: "III", title: "Créativité", description: "Imagination, innovation et expression des talents." },
        { mark: "IV", title: "Transmission", description: "Partage des savoirs entre générations de professionnels." },
        { mark: "V", title: "Responsabilité", description: "Conscience de l'influence des images et des sons produits." },
        { mark: "VI", title: "Mémoire", description: "Les archives comme éléments essentiels du patrimoine national." },
      ],
    },
    courses: {
      eyebrow: "Nos formations",
      title: "Un index des métiers de l'image, du son et de la mémoire.",
      lead: "Les filières effectivement ouvertes varient selon les sessions — référez-vous au communiqué officiel du concours en cours.",
      open: "Afficher le détail",
      close: "Masquer le détail",
      groups: [
        { label: "Cursus d'un an", courses: [
          { code: "01", title: "Technicien audiovisuel", outcome: "Assistant opérateur, assistant montage", description: "Compétences de base en prise de vues, prise de son et montage, au cœur de la chaîne audiovisuelle." },
          { code: "02", title: "Infographiste", outcome: "Maquettiste, créateur numérique", description: "Composition graphique, typographie, traitement de l'image et habillage visuel." },
          { code: "03", title: "Technicien de traitement des archives", outcome: "Agent de numérisation", description: "Classement, indexation, numérisation et conservation préventive des documents." },
          { code: "04", title: "Animateur 2D", outcome: "Illustrateur numérique", description: "Dessin, storyboard, mouvement et techniques d'animation 2D." },
          { code: "05", title: "Technicien de régie et maintenance", outcome: "Technicien de plateau", description: "Installation, régie technique, maintenance préventive et diagnostic des pannes." },
        ] },
        { label: "Cursus de deux ans", courses: [
          { code: "06", title: "Journaliste reporter d'images", outcome: "JRI, vidéojournaliste", description: "Recherche, vérification et écriture de l'information par l'image et le son." },
          { code: "07", title: "Opérateur de prise de vues", outcome: "Cadreur, caméraman", description: "Réglages caméra, composition d'image, lumière et préparation de tournage." },
          { code: "08", title: "Opérateur de prise de son", outcome: "Preneur de son", description: "Microphones, enregistrement studio et extérieur, sonorisation et mixage." },
          { code: "09", title: "Monteur vidéo", outcome: "Monteur de reportages", description: "Dérushage, narration audiovisuelle, habillage et exportation." },
          { code: "10", title: "Réalisateur de télévision", outcome: "Réalisateur multicaméra", description: "Découpage technique, direction d'équipes et gestion du direct." },
          { code: "11", title: "Motion & graphic designer", outcome: "Motion designer", description: "Compositing, typographie animée, habillage télévisuel, effets visuels." },
          { code: "12", title: "Marketing digital", outcome: "Community manager", description: "Stratégie digitale, gestion de communautés, campagnes sur les réseaux." },
          { code: "13", title: "Technicien informatique et réseaux", outcome: "Support technique", description: "Systèmes, réseaux locaux, maintenance et sécurité informatique." },
          { code: "14", title: "Technicien d'exploitation des équipements audiovisuels", outcome: "Technicien d'exploitation ou de diffusion", description: "Configuration, contrôle des signaux, procédures de régie, diffusion et maintenance de premier niveau." },
          { code: "15", title: "Archiviste audiovisuel", outcome: "Documentaliste", description: "Collecte, traitement, conservation, documentation, numérisation, droits et valorisation des fonds." },
        ] },
        { label: "Cursus de trois ans", courses: [
          { code: "16", title: "Réalisateur de cinéma", outcome: "Scénariste-réalisateur", description: "Écriture, direction d'acteurs, mise en scène et postproduction d'un film." },
          { code: "17", title: "Gestion de la production audiovisuelle", outcome: "Chargé de production", description: "Budget, planification, logistique et coordination de tournages." },
          { code: "18", title: "Réalisateur de films d'animation", outcome: "Storyboarder", description: "Storyboard, création de personnages, direction artistique et animation." },
        ] },
      ],
    },
    continuing: { eyebrow: "Formation continue", title: "Former les professionnels, accompagner les organisations.", lead: "Modules à la carte, séminaires, ateliers, master classes et programmes sur mesure pour les personnels de la CRTV, les médias, entreprises et institutions.", formats: ["À la carte", "Séminaires", "Ateliers pratiques", "Master classes", "Sur mesure"], topics: ["Journalisme mobile", "IA appliquée à l'audiovisuel", "Prise de vues", "Montage numérique", "Motion design", "Régie d'antenne", "Numérisation des archives", "Marketing digital"] },
    heritage: { eyebrow: "Patrimoine audiovisuel", title: "Préserver aujourd'hui ce que demain devra connaître.", lead: "Journaux radiodiffusés, reportages, documentaires : une mémoire irremplaçable, mais fragile — supports qui vieillissent, formats qui deviennent obsolètes.", points: ["Identifier, évaluer et classer les documents", "Assurer leur conservation préventive", "Procéder à leur numérisation et documentation", "Sécuriser le stockage et faciliter la recherche", "Valoriser les contenus auprès des publics"], label: "Fonds audiovisuel — CRTV" },
    admissions: { eyebrow: "Admissions", title: "Intégrer l'IFCPA.", lead: "L'admission s'effectue principalement par voie de concours, dans la limite des places disponibles, suivant les conditions du communiqué officiel de chaque session.", steps: [
      { number: "I", title: "Choisir sa filière", description: "Consulter les filières ouvertes et vérifier le diplôme exigé (BEPC, CAP, Probatoire ou Baccalauréat)." },
      { number: "II", title: "Constituer son dossier", description: "Réunir toutes les pièces indiquées dans l'avis officiel." },
      { number: "III", title: "Déposer le dossier", description: "À l'IFCPA, en station régionale ou tout lieu retenu par le communiqué officiel." },
      { number: "IV", title: "Passer les épreuves", description: "Se présenter au centre indiqué, muni des documents requis." },
      { number: "V", title: "Consulter les résultats", description: "Publication par les canaux officiels de la CRTV et de l'IFCPA." },
    ] },
    contact: { eyebrow: "Contact", title: "Parlons de votre projet.", name: "Nom et prénom", email: "Adresse électronique", subject: "Formation ou service concerné", message: "Message", subjects: ["Formation initiale", "Formation continue", "Patrimoine audiovisuel", "Autre"], send: "Envoyer la demande", sent: "Merci, votre demande est prête à être envoyée à l'IFCPA.", details: "Coordonnées", faq: [
      { question: "L'entrée se fait-elle uniquement par concours ?", answer: "La formation initiale est généralement accessible par voie de concours, selon l'avis officiel de chaque session." },
      { question: "Les candidats étrangers peuvent-ils postuler ?", answer: "Oui, sous réserve des conditions et places prévues dans le communiqué officiel." },
      { question: "Peut-on suivre une formation courte ?", answer: "Oui, via les formations continues, ateliers et offres à la carte." },
    ] },
    footer: { description: "Former aux métiers de l'image, du son et des médias. Préserver la mémoire audiovisuelle.", institute: "Institut", resources: "Ressources", official: "Institutionnel", copyright: "© IFCPA/CRTV. Tous droits réservés." },
  },
  en: {
    language: "FR",
    menu: "Menu",
    close: "Close",
    nav: [
      { href: "#institut", label: "Institute" }, { href: "#formations", label: "Programmes" }, { href: "#continue", label: "Continuing education" }, { href: "#patrimoine", label: "Heritage" }, { href: "#admissions", label: "Admissions" }, { href: "#contact", label: "Contact" },
    ],
    hero: { eyebrow: "Institute for Training and Audiovisual Heritage Preservation", title: "Train for careers in image, sound and media.", accent: "Preserve audiovisual memory.", description: "IFCPA/CRTV trains creators, technicians and professionals to imagine, produce, broadcast and preserve the audiovisual content of today and tomorrow.", primary: "Apply for the 2026 entrance exam", secondary: "Explore our programmes" },
    institute: { eyebrow: "The institute", title: "A history serving Cameroonian audiovisual media.", lead: "For decades, the Institute has supported the evolution of radio, television, cinema, digital and archive preservation professions.", vision: "To make IFCPA a leading institution for audiovisual professions and heritage preservation training in Central Africa.", history: [
      { date: "1983", title: "Professional Training Centre", description: "The centre was created to train technicians for the emerging television industry." }, { date: "Growth", title: "New specialisms", description: "New audiences, programmes and digital developments broadened the Institute's scope." }, { date: "Today", title: "IFCPA", description: "Two missions combined: training professionals and preserving audiovisual memory." },
    ], values: [
      { mark: "I", title: "Excellence", description: "Quality in training, creation and professional practice." }, { mark: "II", title: "Rigor", description: "Precision, discipline and respect for technical standards." }, { mark: "III", title: "Creativity", description: "Imagination, innovation and talent expression." }, { mark: "IV", title: "Knowledge sharing", description: "Passing knowledge between generations of professionals." }, { mark: "V", title: "Responsibility", description: "Awareness of the influence of the images and sounds we produce." }, { mark: "VI", title: "Memory", description: "Archives as essential parts of national heritage." },
    ] },
    courses: { eyebrow: "Our programmes", title: "An index of image, sound and memory professions.", lead: "Programmes open for enrolment may vary by session — please refer to the official current entrance-exam notice.", open: "Show details", close: "Hide details", groups: [
      { label: "One-year programmes", courses: [
        { code: "01", title: "Audiovisual technician", outcome: "Camera and editing assistant", description: "Core skills in shooting, sound recording and editing at the heart of the audiovisual chain." }, { code: "02", title: "Graphic designer", outcome: "Layout artist, digital creator", description: "Graphic composition, typography, image processing and visual branding." }, { code: "03", title: "Archive processing technician", outcome: "Digitisation officer", description: "Classification, indexing, digitisation and preventive preservation of records." }, { code: "04", title: "2D animator", outcome: "Digital illustrator", description: "Drawing, storyboarding, motion and 2D animation techniques." }, { code: "05", title: "Control-room and maintenance technician", outcome: "Studio technician", description: "Technical set-up, control room operations, preventive maintenance and fault diagnosis." },
      ] },
      { label: "Two-year programmes", courses: [
        { code: "06", title: "Video journalist", outcome: "VJ, video reporter", description: "Research, verification and storytelling through image and sound." }, { code: "07", title: "Camera operator", outcome: "Cameraperson", description: "Camera settings, composition, lighting and shooting preparation." }, { code: "08", title: "Sound operator", outcome: "Sound recordist", description: "Microphones, studio and location recording, sound reinforcement and mixing." }, { code: "09", title: "Video editor", outcome: "Report editor", description: "Rush selection, audiovisual storytelling, graphics and export." }, { code: "10", title: "Television director", outcome: "Multi-camera director", description: "Technical breakdown, team direction and live broadcast management." }, { code: "11", title: "Motion & graphic designer", outcome: "Motion designer", description: "Compositing, kinetic typography, TV graphics and visual effects." }, { code: "12", title: "Digital marketing", outcome: "Community manager", description: "Digital strategy, community management and social campaigns." }, { code: "13", title: "IT and network technician", outcome: "Technical support", description: "Systems, local networks, maintenance and IT security." }, { code: "14", title: "Audiovisual equipment operations technician", outcome: "Operations or broadcast technician", description: "Equipment configuration, signal monitoring, control-room procedures, broadcasting and first-line maintenance." }, { code: "15", title: "Audiovisual archivist", outcome: "Documentalist", description: "Collection, processing, preservation, documentation, digitisation, rights and collection enhancement." },
      ] },
      { label: "Three-year programmes", courses: [
        { code: "16", title: "Film director", outcome: "Writer-director", description: "Writing, directing actors, staging and film post-production." }, { code: "17", title: "Audiovisual production management", outcome: "Production coordinator", description: "Budgeting, scheduling, logistics and production coordination." }, { code: "18", title: "Animation film director", outcome: "Storyboard artist", description: "Storyboarding, character creation, art direction and animation." },
      ] },
    ] },
    continuing: { eyebrow: "Continuing education", title: "Training professionals, supporting organisations.", lead: "Custom modules, seminars, workshops, masterclasses and bespoke programmes for CRTV staff, media organisations, companies and institutions.", formats: ["Custom", "Seminars", "Practical workshops", "Masterclasses", "Bespoke"], topics: ["Mobile journalism", "AI for audiovisual media", "Camera work", "Digital editing", "Motion design", "Broadcast control", "Archive digitisation", "Digital marketing"] },
    heritage: { eyebrow: "Audiovisual heritage", title: "Preserve today what tomorrow needs to know.", lead: "Radio news, reports and documentaries are an irreplaceable yet fragile memory — media ages and formats become obsolete.", points: ["Identify, assess and classify records", "Ensure preventive preservation", "Digitise and document collections", "Secure storage and make research easier", "Bring content to the public"], label: "Audiovisual collection — CRTV" },
    admissions: { eyebrow: "Admissions", title: "Join IFCPA.", lead: "Initial admission is mainly through a competitive entrance exam, subject to available places and the conditions of each official notice.", steps: [
      { number: "I", title: "Choose your programme", description: "Review open programmes and check the required qualification." }, { number: "II", title: "Prepare your application", description: "Gather every document listed in the official notice." }, { number: "III", title: "Submit your file", description: "At IFCPA, a regional station or another location specified in the notice." }, { number: "IV", title: "Sit the examinations", description: "Attend the designated centre with the required documents." }, { number: "V", title: "Check the results", description: "Results are published through official CRTV and IFCPA channels." },
    ] },
    contact: { eyebrow: "Contact", title: "Let's discuss your project.", name: "Full name", email: "Email address", subject: "Programme or service", message: "Message", subjects: ["Initial training", "Continuing education", "Audiovisual heritage", "Other"], send: "Send enquiry", sent: "Thank you — your enquiry is ready to be sent to IFCPA.", details: "Contact details", faq: [
      { question: "Is entry only through an entrance exam?", answer: "Initial training is generally accessible through the competitive exam, according to each official notice." }, { question: "Can international applicants apply?", answer: "Yes, subject to the conditions and places provided in the official notice." }, { question: "Can I take a short course?", answer: "Yes, through continuing education, workshops and custom offers." },
    ] },
    footer: { description: "Training for image, sound and media professions. Preserving audiovisual memory.", institute: "Institute", resources: "Resources", official: "Official", copyright: "© IFCPA/CRTV. All rights reserved." },
  },
};

const filmImage = "https://unsplash.com/photos/Q1JB5XRwJkQ/download?force=true&w=1200";
const archiveImage = "https://unsplash.com/photos/tV80374iytg/download?force=true&w=1200";

export function LegacyIfcpaWebsite() {
  const [locale, setLocale] = useState<Locale>("fr");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);
  const t = copy[locale];
  const toggleLanguage = () => setLocale((current) => (current === "fr" ? "en" : "fr"));
  const closeMenu = () => setIsMenuOpen(false);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSent(true);
  }

  return (
    <main className="relative overflow-hidden bg-[#f4f8fb] text-[#06395f]">
      <div className="paper-grain pointer-events-none fixed inset-0 z-50 opacity-[0.045] mix-blend-multiply" />
      <aside aria-hidden="true" className="film-rail fixed inset-y-0 left-0 z-40 hidden w-8 bg-[#06395f] md:block" />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-[#0b4f7e]/10 bg-[#f4f8fb]/92 px-5 py-4 backdrop-blur md:left-8 md:px-10 md:py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 text-lg font-bold tracking-tight" aria-label="IFCPA CRTV">
            <Image src="/ifcpa-logo.png" alt="Logo IFCPA" width={42} height={32} className="h-8 w-10 rounded object-cover object-center ring-1 ring-[#0b4f7e]/15" priority />
            <span>IFCPA <i className="font-serif text-[#2ba9df]">/</i> CRTV</span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
            {t.nav.map((item) => <a key={item.href} href={item.href} className="text-sm font-medium text-[#37627d] transition hover:text-[#0b4f7e]">{item.label}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleLanguage} className="border border-[#0b4f7e]/25 px-3 py-2 text-xs font-bold tracking-[0.16em] text-[#0b4f7e] transition hover:border-[#2ba9df] hover:text-[#2ba9df]" aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}>{t.language}</button>
            <button type="button" onClick={() => setIsMenuOpen((open) => !open)} className="border border-[#0b4f7e] px-3 py-2 text-sm font-medium lg:hidden" aria-expanded={isMenuOpen} aria-controls="mobile-menu">{isMenuOpen ? t.close : t.menu}</button>
          </div>
        </div>
        {isMenuOpen && <nav id="mobile-menu" className="mx-auto mt-4 flex max-w-7xl flex-col border-t border-[#0b4f7e]/15 pt-3 lg:hidden" aria-label="Navigation mobile">{t.nav.map((item) => <a key={item.href} href={item.href} onClick={closeMenu} className="py-3 text-sm font-medium text-[#0b4f7e]">{item.label}</a>)}</nav>}
      </header>

      <section id="top" className="relative flex min-h-screen items-center px-6 pb-16 pt-32 md:pl-20 md:pr-12">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
          <div className="float-in relative z-10">
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.13em] text-[#2ba9df]">{t.hero.eyebrow}</p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-tight text-[#06395f] sm:text-6xl lg:text-7xl">{t.hero.title} <em className="text-[#e4312a]">{t.hero.accent}</em>,<br />{locale === "fr" ? <>préserver celles d&apos;<em className="text-[#e4312a]">hier</em>.</> : <>preserve those of <em className="text-[#e4312a]">yesterday</em>.</>}</h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#37627d] md:text-lg">{t.hero.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#formations" className="bg-[#06395f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2ba9df]">{t.hero.primary}</a>
              <a href="#admissions" className="border border-[#06395f] px-6 py-3.5 text-sm font-semibold text-[#06395f] transition hover:border-[#2ba9df] hover:text-[#2ba9df]">{t.hero.secondary}</a>
            </div>
          </div>
          <div className="float-in-delayed relative mx-auto h-[430px] w-full max-w-lg sm:h-[520px]" aria-label="Archives et production audiovisuelle">
            <ArchiveCard image={filmImage} className="left-0 top-0 -rotate-6" label={locale === "fr" ? "FONDS N°014" : "COLLECTION No. 014"} caption={locale === "fr" ? "Reportage — 1998" : "Report — 1998"} />
            <ArchiveCard image={archiveImage} className="bottom-0 right-0 rotate-3" label={locale === "fr" ? "FONDS N°207" : "COLLECTION No. 207"} caption={locale === "fr" ? "Production étudiante" : "Student production"} />
          </div>
        </div>
      </section>

      <section id="institut" className="border-y border-[#0b4f7e]/10 bg-white px-6 py-24 md:pl-20 md:pr-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionIntro eyebrow={t.institute.eyebrow} title={t.institute.title} />
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div><p className="max-w-xl text-lg leading-8 text-[#37627d]">{t.institute.lead}</p><div className="mt-10 border-l border-[#0b4f7e]/20 pl-7">{t.institute.history.map((item) => <article key={item.date} className="relative pb-8 last:pb-0"><span className="absolute -left-[33px] top-1 h-3 w-3 rounded-full bg-[#2ba9df] ring-4 ring-white" /><p className="font-mono text-xs text-[#2ba9df]">{item.date}</p><h3 className="mt-2 font-serif text-2xl">{item.title}</h3><p className="mt-2 max-w-md text-sm leading-6 text-[#37627d]">{item.description}</p></article>)}</div></div>
            <div><p className="max-w-xl text-lg leading-8 text-[#37627d]">{t.institute.vision}</p><div className="mt-8 grid grid-cols-1 gap-px bg-[#0b4f7e]/15 sm:grid-cols-2 md:grid-cols-3">{t.institute.values.map((value) => <article key={value.mark} className="bg-white p-6"><span className="font-serif text-3xl italic text-[#2ba9df]">{value.mark}</span><h3 className="mt-3 font-serif text-xl">{value.title}</h3><p className="mt-2 text-sm leading-6 text-[#37627d]">{value.description}</p></article>)}</div></div>
          </div>
        </div>
      </section>

      <section id="formations" className="px-6 py-24 md:pl-20 md:pr-12 lg:py-32"><div className="mx-auto max-w-7xl"><SectionIntro eyebrow={t.courses.eyebrow} title={t.courses.title} /><p className="mt-5 max-w-2xl text-base leading-7 text-[#37627d]">{t.courses.lead}</p><div className="mt-14 space-y-14">{t.courses.groups.map((group) => <div key={group.label}><h3 className="border-b border-[#0b4f7e]/20 pb-4 font-mono text-xs uppercase tracking-[0.15em] text-[#2ba9df]">{group.label}</h3><div>{group.courses.map((course) => { const key = `${group.label}-${course.code}`; const isExpanded = expandedCourse === key; return <article key={key} className="border-b border-dotted border-[#0b4f7e]/25"><button type="button" className="grid w-full grid-cols-[2.5rem_1fr_auto] gap-3 py-5 text-left transition hover:bg-white sm:grid-cols-[4rem_1fr_minmax(10rem,14rem)_auto] sm:gap-5" onClick={() => setExpandedCourse(isExpanded ? null : key)} aria-expanded={isExpanded}><span className="font-mono text-xs text-[#37627d]">{course.code}</span><span className="font-serif text-xl leading-tight text-[#06395f]">{course.title}</span><span className="hidden text-right text-xs leading-5 text-[#37627d] sm:block">{course.outcome}</span><span className="text-xl leading-none text-[#2ba9df]">{isExpanded ? "−" : "+"}</span></button>{isExpanded && <div className="pb-5 pl-10 pr-8 text-sm leading-6 text-[#37627d] sm:pl-16"><p className="sm:hidden"><strong>{course.outcome}</strong></p><p className="mt-2">{course.description}</p><span className="sr-only">{isExpanded ? t.courses.close : t.courses.open}</span></div>}</article>; })}</div></div>)}</div></div></section>

      <section id="continue" className="border-y border-[#0b4f7e]/10 bg-white px-6 py-24 md:pl-20 md:pr-12 lg:py-32"><div className="mx-auto max-w-7xl"><SectionIntro eyebrow={t.continuing.eyebrow} title={t.continuing.title} /><p className="mt-5 max-w-2xl text-base leading-7 text-[#37627d]">{t.continuing.lead}</p><div className="mt-12 grid border-y border-[#0b4f7e]/15 sm:grid-cols-2 lg:grid-cols-5">{t.continuing.formats.map((format) => <div key={format} className="border-b border-r border-[#0b4f7e]/15 p-6 last:border-r-0 sm:last:border-b-0 lg:border-b-0"><span className="font-mono text-[10px] uppercase tracking-widest text-[#2ba9df]">Format</span><h3 className="mt-3 font-serif text-xl">{format}</h3></div>)}</div><div className="mt-10 flex flex-wrap gap-2">{t.continuing.topics.map((topic) => <span key={topic} className="border border-[#0b4f7e]/20 px-4 py-2 text-sm text-[#37627d]">{topic}</span>)}</div></div></section>

      <section id="patrimoine" className="relative overflow-hidden bg-[#06395f] px-6 py-24 text-white md:pl-20 md:pr-12 lg:py-32"><div className="absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center opacity-20 lg:block" style={{ backgroundImage: `url(${archiveImage})` }} /><div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-2"><div><SectionIntro eyebrow={t.heritage.eyebrow} title={t.heritage.title} inverse /><p className="mt-5 max-w-xl text-base leading-7 text-white/70">{t.heritage.lead}</p><ul className="mt-7 max-w-xl">{t.heritage.points.map((point) => <li key={point} className="flex gap-4 border-t border-white/15 py-4 text-sm leading-6 text-white/90"><span className="mt-1.5 h-2 w-2 shrink-0 bg-[#2ba9df]" />{point}</li>)}</ul></div><div className="flex flex-col items-center justify-center"><div className="relative aspect-square w-full max-w-sm rounded-full border-[18px] border-white/10"><div className="absolute inset-7 rounded-full border border-dashed border-[#2ba9df]/60" /><div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#2ba9df] bg-[#06395f]" /></div><p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-white/50">{t.heritage.label}</p></div></div></section>

      <section id="admissions" className="px-6 py-24 md:pl-20 md:pr-12 lg:py-32"><div className="mx-auto max-w-7xl"><SectionIntro eyebrow={t.admissions.eyebrow} title={t.admissions.title} /><p className="mt-5 max-w-2xl text-base leading-7 text-[#37627d]">{t.admissions.lead}</p><div className="mt-12 max-w-3xl">{t.admissions.steps.map((step) => <article key={step.number} className="grid grid-cols-[3.25rem_1fr] gap-5 border-t border-[#0b4f7e]/20 py-7 last:border-b"><span className="font-serif text-3xl italic text-[#2ba9df]">{step.number}</span><div><h3 className="font-serif text-2xl">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#37627d]">{step.description}</p></div></article>)}</div></div></section>

      <section id="contact" className="border-t border-[#0b4f7e]/10 bg-white px-6 py-24 md:pl-20 md:pr-12 lg:py-32"><div className="mx-auto max-w-7xl"><SectionIntro eyebrow={t.contact.eyebrow} title={t.contact.title} /><div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-24"><form onSubmit={submitContact} className="space-y-6"><Field label={t.contact.name}><input required name="name" type="text" /></Field><Field label={t.contact.email}><input required name="email" type="email" /></Field><Field label={t.contact.subject}><select name="subject">{t.contact.subjects.map((subject) => <option key={subject}>{subject}</option>)}</select></Field><Field label={t.contact.message}><textarea required name="message" rows={4} /></Field><button type="submit" className="bg-[#06395f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2ba9df]">{t.contact.send}</button>{isSent && <p role="status" className="text-sm leading-6 text-[#0b4f7e]">{t.contact.sent}</p>}</form><div className="border-t border-[#0b4f7e]/15 pt-9 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0"><h3 className="font-mono text-xs uppercase tracking-[0.14em] text-[#37627d]">{t.contact.details}</h3><address className="mt-4 not-italic text-base leading-7 text-[#06395f]">IFCPA/CRTV<br />Ekounou, Yaoundé, Cameroun<br /><a href="tel:+237656700852" className="underline decoration-[#2ba9df] underline-offset-4">+237 6 56 70 08 52</a><br /><a href="mailto:ifcpa.crtv@gmail.com" className="underline decoration-[#2ba9df] underline-offset-4">ifcpa.crtv@gmail.com</a></address><div className="mt-10">{t.contact.faq.map((item, index) => <details key={item.question} open={index === 0} className="border-t border-[#0b4f7e]/15 py-5"><summary className="cursor-pointer list-none pr-8 text-sm font-semibold text-[#06395f] marker:content-none">{item.question}<span className="float-right text-xl leading-4 text-[#2ba9df]">+</span></summary><p className="mt-3 text-sm leading-6 text-[#37627d]">{item.answer}</p></details>)}</div></div></div></div></section>

      <footer className="px-6 py-14 md:pl-20 md:pr-12"><div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4"><div><div className="flex items-center gap-3 text-lg font-bold"><Image src="/ifcpa-logo.png" alt="" width={40} height={30} className="h-7 w-9 rounded object-cover" /><span>IFCPA <i className="font-serif text-[#2ba9df]">/</i> CRTV</span></div><p className="mt-4 max-w-xs text-sm leading-6 text-[#37627d]">{t.footer.description}</p></div><FooterLinks title={t.footer.institute} links={t.nav.slice(0, 2)} /><FooterLinks title={t.footer.resources} links={t.nav.slice(2, 4)} /><div><h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[#37627d]">{t.footer.official}</h2><a className="mt-4 block text-sm text-[#06395f] hover:text-[#2ba9df]" href="https://crtv.cm" target="_blank" rel="noreferrer">Cameroon Radio Television</a><a className="mt-3 block text-sm text-[#06395f] hover:text-[#2ba9df]" href="https://www.facebook.com/ifcpacrtv/" target="_blank" rel="noreferrer">Facebook IFCPA/CRTV</a></div></div><div className="mx-auto mt-12 flex max-w-7xl flex-wrap justify-between gap-4 border-t border-[#0b4f7e]/15 pt-5 text-xs text-[#37627d]"><span>{t.footer.copyright}</span><span>IFCPA / CRTV</span></div></footer>
    </main>
  );
}

function ArchiveCard({ image, label, caption, className }: { image: string; label: string; caption: string; className: string }) {
  return <article className={`absolute h-[78%] w-[76%] overflow-hidden border border-[#06395f]/20 bg-[#06395f] p-5 shadow-2xl shadow-[#06395f]/20 ${className}`}><div className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-luminosity" style={{ backgroundImage: `url(${image})` }} /><div className="absolute inset-0 bg-gradient-to-t from-[#06395f] via-[#06395f]/20 to-transparent" /><div className="absolute inset-[17%] rounded-full border border-dashed border-white/70" /><div className="relative flex h-full flex-col justify-end"><span className="font-mono text-[10px] tracking-widest text-[#7ad4f4]">{label}</span><p className="mt-2 font-serif text-xl italic text-white">{caption}</p></div></article>;
}

function SectionIntro({ eyebrow, title, inverse = false }: { eyebrow: string; title: string; inverse?: boolean }) {
  return <div><p className={`font-mono text-xs uppercase tracking-[0.14em] ${inverse ? "text-[#7ad4f4]" : "text-[#2ba9df]"}`}>{eyebrow}</p><h2 className={`mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl ${inverse ? "text-white" : "text-[#06395f]"}`}>{title}</h2></div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="font-mono text-[11px] uppercase tracking-[0.11em] text-[#37627d]">{label}</span><span className="mt-2 block [&_input]:w-full [&_input]:border-b [&_input]:border-[#0b4f7e]/25 [&_input]:bg-transparent [&_input]:px-0 [&_input]:py-3 [&_input]:text-[#06395f] [&_input]:outline-none [&_input:focus]:border-[#2ba9df] [&_select]:w-full [&_select]:border-b [&_select]:border-[#0b4f7e]/25 [&_select]:bg-transparent [&_select]:px-0 [&_select]:py-3 [&_select]:text-[#06395f] [&_select]:outline-none [&_select:focus]:border-[#2ba9df] [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:border-b [&_textarea]:border-[#0b4f7e]/25 [&_textarea]:bg-transparent [&_textarea]:px-0 [&_textarea]:py-3 [&_textarea]:text-[#06395f] [&_textarea]:outline-none [&_textarea:focus]:border-[#2ba9df]">{children}</span></label>;
}

function FooterLinks({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return <div><h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[#37627d]">{title}</h2>{links.map((link) => <a key={link.href} href={link.href} className="mt-4 block text-sm text-[#06395f] hover:text-[#2ba9df]">{link.label}</a>)}</div>;
}
