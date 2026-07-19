export type Locale = "fr" | "en";

type Course = {
  code: string;
  title: string;
  outcome: string;
  description: string;
};

export type SiteCopy = {
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
