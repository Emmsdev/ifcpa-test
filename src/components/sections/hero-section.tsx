"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Locale, SiteCopy } from "@/components/site-types";

type Props = { content: SiteCopy["hero"]; locale: Locale };

const slideCopy = {
  fr: [
    { image: "/ifcpa-director-emmanuel-mbede.jpg", label: "DIRECTION / IFCPA", caption: "Pr Emmanuel Mbede", alt: "Pr Emmanuel Mbede, directeur de l'IFCPA/CRTV" },
    { image: "/ifcpa-camera-workshop.jpg", label: "ATELIER / CAM 01", caption: "Apprendre par la pratique", alt: "Caméra professionnelle filmant une séance de formation à l'IFCPA" },
    { image: "/ifcpa-campus.jpg", label: "CAMPUS / YAOUNDÉ", caption: "La communauté IFCPA", alt: "Apprenants et encadreurs réunis devant le campus de l'IFCPA" },
    { image: "/ifcpa-sound-training.jpg", label: "ATELIER / SON", caption: "Maîtriser le signal", alt: "Apprenants de l'IFCPA travaillant sur une console de mixage" },
    { image: "/ifcpa-practical-camera.jpg", label: "FORMATION / IMAGE", caption: "Raconter par l'image", alt: "Atelier pratique de prise de vues à l'IFCPA" },
    { image: "/ifcpa-community.jpg", label: "VIE DE L'INSTITUT", caption: "Créer ensemble", alt: "Communauté IFCPA réunie lors d'une activité" },
  ],
  en: [
    { image: "/ifcpa-director-emmanuel-mbede.jpg", label: "LEADERSHIP / IFCPA", caption: "Pr Emmanuel Mbede", alt: "Pr Emmanuel Mbede, Director of IFCPA/CRTV" },
    { image: "/ifcpa-camera-workshop.jpg", label: "WORKSHOP / CAM 01", caption: "Learning by doing", alt: "Professional camera filming an IFCPA training session" },
    { image: "/ifcpa-campus.jpg", label: "CAMPUS / YAOUNDE", caption: "The IFCPA community", alt: "Learners and staff gathered in front of the IFCPA campus" },
    { image: "/ifcpa-sound-training.jpg", label: "WORKSHOP / SOUND", caption: "Mastering the signal", alt: "IFCPA learners working at a mixing console" },
    { image: "/ifcpa-practical-camera.jpg", label: "TRAINING / IMAGE", caption: "Telling stories through images", alt: "Hands-on camera workshop at IFCPA" },
    { image: "/ifcpa-community.jpg", label: "LIFE AT THE INSTITUTE", caption: "Creating together", alt: "The IFCPA community gathered during an event" },
  ],
} satisfies Record<Locale, { image: string; label: string; caption: string; alt: string }[]>;

const heroStats = {
  fr: [
    { value: "1983", label: "Une histoire de transmission" },
    { value: "18", label: "Filières image, son & médias" },
    { value: "280", label: "Places au concours 2026" },
  ],
  en: [
    { value: "1983", label: "A legacy of knowledge sharing" },
    { value: "18", label: "Image, sound & media programmes" },
    { value: "280", label: "Places in the 2026 intake" },
  ],
} satisfies Record<Locale, { value: string; label: string }[]>;

export function HeroSection({ content, locale }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = slideCopy[locale];
  const stats = heroStats[locale];

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % slides.length), 4500);
    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  function showPrevious() {
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length);
  }

  function showNext() {
    setActiveIndex((index) => (index + 1) % slides.length);
  }

  return (
    <section id="top" className="section-shell relative flex min-h-[780px] items-center overflow-hidden pb-16 pt-28 lg:min-h-[800px] lg:pb-16 lg:pt-24">
      <div className="site-grain pointer-events-none absolute inset-0 opacity-[0.045]" aria-hidden="true" />
      <div className="absolute -right-24 top-28 h-80 w-80 rounded-full border-[68px] border-[var(--secondary)]/[0.06]" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-[1380px] items-center gap-16 lg:grid-cols-[1.02fr_.98fr] xl:gap-24">
        <div className="float-in relative z-10">
          <p className="eyebrow-line mb-5 max-w-2xl font-mono text-[0.68rem] font-bold uppercase leading-5 tracking-[0.16em] text-[#2ba9df]">{content.eyebrow}</p>
          <h1 className="max-w-[740px] font-serif text-[2.4rem] font-semibold leading-[0.98] tracking-[-0.05em] text-[#06395f] sm:text-[3.15rem] lg:text-[clamp(3.35rem,3.8vw,3.85rem)]">
            {content.title}
            <em className="mt-2 block font-medium text-[#e4312a]">{content.accent}</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#37627d] md:text-lg">{content.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#inscription-concours" className="app-button bg-[var(--error)] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[var(--error)]/20 sm:px-7">{content.primary}<span className="ml-3" aria-hidden="true">↗</span></a>
            <a href="#formations" className="app-button border border-[#06395f]/35 bg-[var(--surface-bright)] px-6 py-4 text-sm font-semibold text-[#06395f] sm:px-7">{content.secondary}</a>
          </div>
          <div className="mt-8 grid max-w-2xl grid-cols-3 border-y border-[var(--primary)]/15 py-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`pr-3 ${index > 0 ? "border-l border-[var(--primary)]/15 pl-4 sm:pl-6" : ""}`}>
                <strong className="font-serif text-xl font-semibold tracking-[-0.04em] text-[var(--primary)] sm:text-2xl">{stat.value}</strong>
                <span className="mt-1 block text-[0.62rem] font-bold uppercase leading-4 tracking-[0.08em] text-[var(--on-surface-variant)] sm:text-[0.7rem]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="float-in-delayed relative mx-auto h-[420px] w-full max-w-2xl sm:h-[500px] lg:h-[540px]"
          aria-label={locale === "fr" ? "Carrousel de la formation et de la vie à l'IFCPA" : "IFCPA training and campus life carousel"}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="absolute inset-x-0 bottom-[4.5rem] top-0">
            {slides.map((slide, index) => {
              const offset = (index - activeIndex + slides.length) % slides.length;
              const isActive = offset === 0;
              return (
                <article
                  key={slide.image}
                  aria-hidden={!isActive}
                  className={`film-frame frame-corners group absolute inset-0 overflow-hidden border border-[#06395f]/20 bg-[#06395f] p-4 shadow-[var(--shadow-strong)] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none sm:p-5 ${
                    isActive ? "z-20 opacity-100 scale-100 translate-y-0" : "z-10 pointer-events-none opacity-0 scale-98 translate-y-1"
                  }`}
                >
                  <Image
                    src={slide.image}
                    alt={isActive ? slide.alt : ""}
                    fill
                    priority={index < 2}
                    sizes="(min-width: 1024px) 38vw, 82vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    style={{ objectPosition: slide.image === "/ifcpa-director-emmanuel-mbede.jpg" ? "center 22%" : "center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02142d] via-[#02142d]/10 to-[#02142d]/20 transition-opacity duration-700" />
                  <div className="absolute left-8 top-8 flex items-center gap-2 bg-[#02142d]/85 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md shadow-md">
                    <span className="h-2 w-2 rounded-full bg-[var(--error)] animate-pulse" aria-hidden="true" /> REC · {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="relative flex h-full flex-col justify-end px-3 pb-3 sm:px-5 sm:pb-5">
                    <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-[#7ad4f4]">{slide.label}</span>
                    <p className="mt-2 max-w-md font-serif text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">{slide.caption}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="absolute inset-x-4 bottom-0 z-40 flex items-center justify-between gap-4 sm:inset-x-8">
            <div className="flex items-center gap-2" role="tablist" aria-label={locale === "fr" ? "Choisir une image" : "Choose an image"}>
              {slides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${locale === "fr" ? "Afficher" : "Show"} ${slide.caption}`}
                  aria-selected={index === activeIndex}
                  role="tab"
                  className={`carousel-dot h-2.5 rounded-none transition-all duration-500 ease-out ${
                    index === activeIndex ? "w-10 bg-[var(--secondary)] shadow-md" : "w-3 bg-[var(--primary)]/30 hover:bg-[var(--primary)]/50"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={showPrevious}
                className="app-button grid h-12 w-12 place-items-center rounded-none border border-[var(--primary)]/20 bg-[var(--surface-bright)] text-lg text-[var(--primary)] transition-all duration-300 hover:bg-[var(--primary)] hover:text-white"
                aria-label={locale === "fr" ? "Image précédente" : "Previous image"}
              >
                ←
              </button>
              <button
                type="button"
                onClick={showNext}
                className="app-button grid h-12 w-12 place-items-center rounded-none bg-[var(--primary)] text-lg text-white transition-all duration-300 hover:bg-[#0b4f7e]"
                aria-label={locale === "fr" ? "Image suivante" : "Next image"}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex h-9 items-center overflow-hidden border-t border-[var(--outline-variant)] bg-white/55 backdrop-blur" aria-hidden="true">
        <div className="hero-wave flex min-w-full items-center gap-1 px-3">
          {Array.from({ length: 64 }, (_, index) => <span key={index} className="w-0.5 shrink-0 bg-[var(--secondary)]" style={{ height: `${4 + ((index * 11) % 20)}px` }} />)}
        </div>
        <span className="absolute right-4 bg-white/85 px-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--primary)]">Image · Son · Mémoire</span>
      </div>
    </section>
  );
}
