"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Locale } from "@/components/site-types";

const copy = {
  fr: {
    eyebrow: "Le studio en mouvement",
    title: "Entrez dans le signal.",
    body: "À l’IFCPA, l’image se cadre, le son se sculpte et chaque projet se construit au contact des outils professionnels.",
    imageAlt: "Apprenants de l'IFCPA travaillant sur une console de mixage",
    console: "Atelier de prise de son",
    source: "Source / Studio A",
    channel: "Canal stéréo",
    active: "Signal actif",
    paused: "Signal en pause",
    start: "Lancer le signal",
    stop: "Mettre le signal en pause",
    level: "Niveau d’entrée",
  },
  en: {
    eyebrow: "The studio in motion",
    title: "Step into the signal.",
    body: "At IFCPA, images are framed, sound is shaped and every project is built through hands-on work with professional tools.",
    imageAlt: "IFCPA learners working at a mixing console",
    console: "Sound recording workshop",
    source: "Source / Studio A",
    channel: "Stereo channel",
    active: "Signal active",
    paused: "Signal paused",
    start: "Start signal",
    stop: "Pause signal",
    level: "Input level",
  },
} satisfies Record<Locale, Record<string, string>>;

const waveform = Array.from({ length: 42 }, (_, index) => 18 + ((index * 29 + index * index * 7) % 74));

export function AudiovisualSignal({ locale }: { locale: Locale }) {
  const [isRunning, setIsRunning] = useState(true);
  const [elapsed, setElapsed] = useState(18);
  const content = copy[locale];

  useEffect(() => {
    if (!isRunning) return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  const minutes = Math.floor(elapsed / 60).toString().padStart(2, "0");
  const seconds = (elapsed % 60).toString().padStart(2, "0");

  return (
    <section id="studio" className="relative scroll-mt-20 overflow-hidden bg-[var(--primary)] px-6 py-20 text-white md:px-16 lg:py-28" aria-labelledby="studio-signal-title">
      <div className="studio-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary-container)]">{content.eyebrow}</p>
            <h2 id="studio-signal-title" className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">{content.title}</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-white/68 lg:justify-self-end lg:text-lg">{content.body}</p>
        </div>

        <div data-scroll-item className="mt-12 overflow-hidden border border-white/30 bg-transparent shadow-2xl shadow-black/20 lg:grid lg:grid-cols-[1.08fr_.92fr]">
          <div className="group relative min-h-[360px] overflow-hidden sm:min-h-[470px] lg:min-h-[560px]">
            <Image
              src="/ifcpa-sound-training.jpg"
              alt={content.imageAlt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover grayscale transition duration-1000 ease-out group-hover:scale-[1.025] group-hover:grayscale-0 motion-reduce:transition-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#021735] via-transparent to-[#021735]/20" />
            <div className="studio-scanline absolute inset-x-0 top-0 h-px bg-[var(--secondary-container)]/70" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 sm:p-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--secondary-container)]">IFCPA / CRTV</p>
                <p className="mt-2 text-lg font-semibold sm:text-xl">{content.console}</p>
              </div>
              <span className="border border-white/25 bg-black/25 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur">CAM 01</span>
            </div>
          </div>

          <div className={`signal-console flex min-h-[460px] flex-col p-5 sm:p-8 lg:min-h-0 lg:border-l lg:border-white/10 ${isRunning ? "is-recording" : ""}`}>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-5">
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${isRunning ? "recording-light bg-[#ff554f]" : "bg-white/25"}`} aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/72">{isRunning ? content.active : content.paused}</span>
              </div>
              <span className="font-mono text-2xl tabular-nums tracking-[0.08em] sm:text-3xl">00:{minutes}:{seconds}</span>
            </div>

            <div className="mt-7 flex items-end justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
              <span>{content.source}</span>
              <span>48 kHz / 24 bit</span>
            </div>

            <div className="mt-5 flex h-40 items-center gap-[3px] overflow-hidden border-y border-white/10 py-5" role="img" aria-label={content.level}>
              {waveform.map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  className="signal-bar min-w-0 flex-1 bg-[var(--secondary-container)]"
                  style={{ height: `${height}%`, animationDelay: `${-index * 43}ms` }}
                />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-px bg-white/10 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white/52">
              <span className="bg-white/[0.025] px-2 py-3 backdrop-blur-md">L −12 dB</span>
              <span className="bg-white/[0.025] px-2 py-3 backdrop-blur-md">{content.channel}</span>
              <span className="bg-white/[0.025] px-2 py-3 backdrop-blur-md">R −09 dB</span>
            </div>

            <button
              type="button"
              onClick={() => setIsRunning((value) => !value)}
              aria-pressed={isRunning}
              className="group mt-auto flex w-full items-center justify-between border border-white/20 bg-white/[0.04] px-5 py-4 text-left text-sm font-semibold transition hover:border-[var(--secondary-container)] hover:bg-white/[0.08] focus-visible:border-[var(--secondary-container)]"
            >
              <span>{isRunning ? content.stop : content.start}</span>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--secondary-container)] text-[var(--primary)] transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
                {isRunning ? <span className="h-3 w-3 bg-current" /> : <span className="ml-0.5 border-y-[7px] border-l-[11px] border-y-transparent border-l-current" />}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
