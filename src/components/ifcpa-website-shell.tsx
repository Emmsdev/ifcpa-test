"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { copy } from "@/components/ifcpa-website";
import { LanguageSelector } from "@/components/language-selector";
import type { Locale } from "@/components/site-types";
import { HeroSection } from "@/components/sections/hero-section";
import { InstituteSection } from "@/components/sections/institute-section";
import { CoursesSection } from "@/components/sections/courses-section";
import { ContinuingSection } from "@/components/sections/continuing-section";
import { HeritageSection } from "@/components/sections/heritage-section";
import { AdmissionsSection } from "@/components/sections/admissions-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CampusSection } from "@/components/sections/campus-section";
import { PrimaryPathways } from "@/components/primary-pathways";
import { AudiovisualSignal } from "@/components/audiovisual-signal";
import { CompetitionApplicationSection } from "@/components/competition-application-section";

const heritageImage = "/ifcpa-heritage-memory.jpg";
const navigationLinkClass = "relative py-2 text-[0.78rem] font-bold uppercase tracking-[0.06em] text-[var(--primary)] transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-right after:scale-x-0 after:bg-[var(--secondary)] after:transition-transform after:duration-300 after:content-[''] hover:text-[var(--secondary)] hover:after:origin-left hover:after:scale-x-100 focus-visible:text-[var(--secondary)] focus-visible:after:origin-left focus-visible:after:scale-x-100 motion-reduce:after:transition-none";

export function IfcpaWebsiteShell() {
  const [locale, setLocale] = useState<Locale>("fr");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const content = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const targets = mainRef.current?.querySelectorAll<HTMLElement>(
      "section:not(#top) h2, section:not(#top) article, section:not(#top) li, section:not(#top) form, section:not(#top) details, [data-scroll-item]",
    );
    if (!targets) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.16, rootMargin: "0px 0px -6%" },
    );
    targets.forEach((target, index) => {
      target.classList.add("scroll-item");
      target.style.setProperty("--reveal-delay", `${(index % 4) * 55}ms`);
      observer.observe(target);
    });
    requestAnimationFrame(() => mainRef.current?.classList.add("motion-ready"));

    let animationFrame = 0;
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      animationFrame = 0;
    };
    const onScroll = () => { if (!animationFrame) animationFrame = requestAnimationFrame(updateProgress); };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); if (animationFrame) cancelAnimationFrame(animationFrame); };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const desktopMedia = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => event.matches && setIsMenuOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setIsMenuOpen(false);

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    desktopMedia.addEventListener("change", closeOnDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      desktopMedia.removeEventListener("change", closeOnDesktop);
    };
  }, [isMenuOpen]);

  return (
    <main ref={mainRef} className="relative overflow-hidden bg-[#f4f8fb] text-[#06395f]">

      <header className="fixed inset-x-0 top-0 z-40 px-3 py-3 md:px-6">
        <div ref={progressRef} className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[var(--secondary)]" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex max-w-[1380px] items-center justify-between gap-4 border border-[var(--primary)]/10 bg-[var(--surface-bright)]/90 px-4 py-2.5 shadow-[0_14px_45px_rgb(6_29_58/0.08)] backdrop-blur-xl sm:px-5">
          <a href="#top" className="flex items-center" aria-label="IFCPA CRTV">
            <Image src="/ifcpa-crtv-logo.png" alt="Logo CRTV et IFCPA" width={1306} height={313} className="h-8 w-auto sm:h-9" priority />
          </a>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Navigation principale">
            {content.nav.map((item) => (
              <a key={item.href} href={item.href} className={`${navigationLinkClass} font-semibold`}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#inscription-concours" className="app-button hidden items-center gap-2 bg-[var(--error)] px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white shadow-md shadow-[var(--error)]/15 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />{locale === "fr" ? "Concours · 2026" : "Apply · 2026"}
            </a>
            <LanguageSelector locale={locale} onChange={setLocale} />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="relative isolate inline-flex h-10 items-center gap-2 overflow-hidden bg-[var(--primary)] px-4 text-sm font-semibold text-white shadow-md shadow-[var(--primary)]/15 transition-colors before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-[var(--secondary)] before:transition-transform before:duration-500 before:ease-[cubic-bezier(.22,1,.36,1)] before:content-[''] hover:before:scale-x-100 focus-visible:before:scale-x-100 motion-reduce:before:transition-none xl:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <span>{isMenuOpen ? content.close : content.menu}</span>
              <span aria-hidden="true" className="relative h-4 w-4">
                <span className={`absolute left-0 top-[4px] h-0.5 w-4 bg-current transition-transform duration-300 ${isMenuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`absolute left-0 bottom-[4px] h-0.5 w-4 bg-current transition-transform duration-300 ${isMenuOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
        <nav
          id="mobile-menu"
          aria-label="Navigation mobile"
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
          className={`fixed inset-0 flex min-h-dvh flex-col overflow-y-auto bg-[var(--primary)] px-5 pb-8 pt-28 text-white transition-[opacity,transform,visibility] duration-500 ease-[cubic-bezier(.22,1,.36,1)] xl:hidden motion-reduce:transition-none ${isMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-5 opacity-0"}`}
        >
          <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center py-8">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--secondary)]">IFCPA / CRTV</p>
            <a href="#inscription-concours" onClick={() => setIsMenuOpen(false)} className="app-button mb-6 flex items-center justify-between bg-[var(--error)] px-5 py-4 font-bold text-white">
              <span>{locale === "fr" ? "S'inscrire au concours 2026" : "Apply for the 2026 entrance exam"}</span><span aria-hidden="true">→</span>
            </a>
            <div className="border-t border-white/15">
              {content.nav.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`group flex items-center justify-between border-b border-white/15 py-4 transition-[opacity,transform,color,padding] duration-500 hover:pl-2 hover:text-[var(--secondary)] motion-reduce:transition-none sm:py-5 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  style={{ transitionDelay: isMenuOpen ? `${120 + index * 55}ms` : "0ms" }}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-xs font-semibold text-[var(--secondary)]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-2xl font-semibold tracking-[-0.025em] text-white sm:text-3xl">{item.label}</span>
                  </span>
                  <span aria-hidden="true" className="text-xl text-[var(--secondary)] transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <HeroSection content={content.hero} locale={locale} />
      <AudiovisualSignal locale={locale} />
      <PrimaryPathways locale={locale} />
      <InstituteSection content={content.institute} locale={locale} />
      <CoursesSection content={content.courses} />
      <ContinuingSection content={content.continuing} />
      <CampusSection locale={locale} />
      <HeritageSection content={content.heritage} archiveImage={heritageImage} />
      <AdmissionsSection content={content.admissions} locale={locale} />
      <CompetitionApplicationSection locale={locale} />
      <ContactSection content={content.contact} />

      <footer className="section-shell relative overflow-hidden bg-[var(--primary)] py-16 text-white">
        <div className="studio-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1380px]">
          <div className="grid gap-12 border-b border-white/15 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_.7fr_.7fr_.9fr]">
            <div>
              <Image src="/ifcpa-crtv-logo.png" alt="Logo CRTV et IFCPA" width={1306} height={313} className="h-11 w-auto brightness-0 invert" />
              <p className="mt-6 max-w-sm font-serif text-2xl font-semibold leading-tight tracking-[-0.035em] text-white">{content.footer.description}</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--secondary)]">Yaoundé · Cameroun</p>
            </div>
            <FooterLinks title={content.footer.institute} links={content.nav.slice(0, 2)} />
            <FooterLinks title={content.footer.resources} links={content.nav.slice(2, 4)} />
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">{content.footer.official}</h2>
              <a className="mt-5 block text-sm font-semibold text-white transition hover:text-[var(--secondary)]" href="https://crtv.cm" target="_blank" rel="noreferrer">Cameroon Radio Television ↗</a>
              <a className="mt-4 block text-sm font-semibold text-white transition hover:text-[var(--secondary)]" href="https://www.facebook.com/ifcpacrtv/" target="_blank" rel="noreferrer">Facebook IFCPA/CRTV ↗</a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-between gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/42"><span>{content.footer.copyright}</span><span>Image · Son · Mémoire</span></div>
        </div>
      </footer>
    </main>
  );
}

function FooterLinks({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return <div><h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">{title}</h2>{links.map((link) => <div key={link.href}><a href={link.href} className="mt-4 inline-block text-sm font-semibold text-white transition hover:text-[var(--secondary)]">{link.label}</a></div>)}</div>;
}
