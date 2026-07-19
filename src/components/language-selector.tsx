"use client";

import { useState } from "react";
import type { Locale } from "@/components/site-types";

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export function LanguageSelector({ locale, onChange }: { locale: Locale; onChange: (locale: Locale) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const current = languages.find((language) => language.code === locale) ?? languages[0];
  return <div className="relative"><button type="button" onClick={() => setIsOpen((open) => !open)} className="flex items-center gap-2 border border-[#0b4f7e]/25 px-3 py-2 text-sm font-semibold text-[#0b4f7e] transition hover:border-[#2ba9df] hover:text-[#2ba9df]" aria-expanded={isOpen} aria-haspopup="listbox" aria-label="Choisir la langue"><span aria-hidden="true">{current.flag}</span><span className="hidden sm:inline">{current.label}</span><svg aria-hidden="true" className={`h-3 w-3 transition ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 12 8" fill="none"><path d="m1 1 5 5 5-5" stroke="currentColor" strokeWidth="1.5" /></svg></button>{isOpen && <div className="absolute right-0 top-full z-50 mt-2 min-w-40 overflow-hidden border border-[#0b4f7e]/15 bg-white py-1 shadow-xl" role="listbox" aria-label="Langues">{languages.map((language) => <button type="button" key={language.code} role="option" aria-selected={language.code === locale} onClick={() => { onChange(language.code); setIsOpen(false); }} className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-[#f4f8fb] ${language.code === locale ? "bg-[#f4f8fb] font-semibold text-[#0b4f7e]" : "text-[#37627d]"}`}><span aria-hidden="true">{language.flag}</span>{language.label}</button>)}</div>}</div>;
}
