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

export function HeroSection({ content, locale }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = slideCopy[locale];

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
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-32 md:pl-20 md:pr-12">
      <div className="hero-signal-grid absolute inset-0 opacity-55" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_.92fr]">
        <div className="float-in relative z-10">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.13em] text-[#2ba9df]">{content.eyebrow}</p>
          <h1 className="max-w-3xl font-serif text-[2.35rem] leading-[0.98] tracking-tight text-[#06395f] sm:text-[3.5rem] lg:text-[4rem]">{content.title}<br /><em className="text-[#e4312a]">{content.accent}</em></h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-[#37627d] md:text-lg">{content.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#inscription-concours" className="app-button bg-[var(--error)] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[var(--error)]/20">{content.primary}</a>
            <a href="#formations" className="app-button border border-[#06395f] px-6 py-4 text-sm font-semibold text-[#06395f]">{content.secondary}</a>
          </div>
        </div>

        <div
          className="float-in-delayed relative mx-auto h-[450px] w-full max-w-xl sm:h-[540px]"
          aria-label={locale === "fr" ? "Carrousel de la formation et de la vie à l'IFCPA" : "IFCPA training and campus life carousel"}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="absolute inset-x-0 top-0 h-[calc(100%-4rem)]">
            {slides.map((slide, index) => {
              const offset = (index - activeIndex + slides.length) % slides.length;
              const state = offset === 0
                ? "translate3d(7%, 13%, 0) rotate(2.5deg) scale(1)"
                : offset === 1
                  ? "translate3d(-8%, -2%, 0) rotate(-5deg) scale(.92)"
                  : "translate3d(10%, -13%, 0) rotate(4deg) scale(.84)";
              const isVisible = offset < 3;
              return (
                <article
                  key={slide.image}
                  aria-hidden={!isVisible}
                  className="group absolute left-[4%] top-[4%] h-[78%] w-[84%] overflow-hidden border border-[#06395f]/25 bg-[#06395f] p-5 shadow-2xl shadow-[#06395f]/20 transition-[transform,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
                  style={{ transform: state, opacity: isVisible ? 1 - offset * 0.24 : 0, zIndex: 30 - offset, pointerEvents: offset === 0 ? "auto" : "none" }}
                >
                  <Image
                    src={slide.image}
                    alt={offset === 0 ? slide.alt : ""}
                    fill
                    priority={index < 2}
                    sizes="(min-width: 1024px) 38vw, 82vw"
                    className="object-cover transition duration-1000 group-hover:scale-105 motion-reduce:transition-none"
                    style={{ objectPosition: slide.image === "/ifcpa-director-emmanuel-mbede.jpg" ? "center 22%" : "center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06395f] via-[#06395f]/10 to-transparent" />
                  <div className="relative flex h-full flex-col justify-end">
                    <span className="font-mono text-[10px] tracking-widest text-[#7ad4f4]">{slide.label}</span>
                    <p className="mt-2 font-serif text-xl italic text-white sm:text-2xl">{slide.caption}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="absolute inset-x-4 bottom-0 z-40 flex items-center justify-between gap-4">
            <div className="flex gap-2" role="tablist" aria-label={locale === "fr" ? "Choisir une image" : "Choose an image"}>
              {slides.map((slide, index) => (
                <button key={slide.image} type="button" onClick={() => setActiveIndex(index)} aria-label={`${locale === "fr" ? "Afficher" : "Show"} ${slide.caption}`} aria-selected={index === activeIndex} role="tab" className={`carousel-dot h-2.5 transition-[width,background-color] duration-300 ${index === activeIndex ? "w-8 bg-[var(--secondary)]" : "w-2.5 bg-[var(--primary)]/25"}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={showPrevious} className="app-button grid h-11 w-11 place-items-center border border-[var(--primary)]/20 bg-white text-lg text-[var(--primary)]" aria-label={locale === "fr" ? "Image précédente" : "Previous image"}>←</button>
              <button type="button" onClick={showNext} className="app-button grid h-11 w-11 place-items-center border border-[var(--primary)]/20 bg-white text-lg text-[var(--primary)]" aria-label={locale === "fr" ? "Image suivante" : "Next image"}>→</button>
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
