import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | IFCPA / CRTV",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "IFCPA",
    "CRTV",
    "formation audiovisuelle Cameroun",
    "école audiovisuelle Yaoundé",
    "cinéma",
    "télévision",
    "radio",
    "journalisme audiovisuel",
    "montage vidéo",
    "prise de vues",
    "prise de son",
    "concours IFCPA 2026",
    "archives audiovisuelles",
    "patrimoine audiovisuel",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: "Cameroon Radio Television",
  category: "education",
  classification: "Éducation, formation professionnelle et patrimoine audiovisuel",
  alternates: {
    canonical: "/",
    languages: { "fr-CM": "/", "x-default": "/" },
  },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "fr_CM",
    alternateLocale: "en_GB",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "IFCPA / CRTV — Former, créer, préserver" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  formatDetection: { email: false, address: false, telephone: false },
  other: {
    "geo.region": "CM-CE",
    "geo.placename": "Yaoundé",
    "content-language": "fr-CM",
  },
};

export const viewport: Viewport = {
  themeColor: "#06395f",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${sora.variable} scroll-smooth`}>
      <body>
        {children}
      </body>
    </html>
  );
}
