import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IFCPA/CRTV - Formation aux métiers de l'audiovisuel au Cameroun",
    template: "%s | IFCPA / CRTV",
  },
  description:
    "L'IFCPA/CRTV forme aux métiers de l'image, du son, des médias et assure la conservation du patrimoine audiovisuel camerounais.",
  keywords: [
    "IFCPA",
    "CRTV",
    "formation audiovisuelle Cameroun",
    "école audiovisuelle Yaoundé",
    "cinéma",
    "télévision",
    "radio",
    "archives audiovisuelles",
    "patrimoine audiovisuel",
  ],
  authors: [{ name: "IFCPA / CRTV" }],
  creator: "IFCPA / CRTV",
  publisher: "Cameroon Radio Television",
  category: "education",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
  openGraph: {
    type: "website",
    locale: "fr_CM",
    alternateLocale: "en_GB",
    url: "/",
    siteName: "IFCPA / CRTV",
    title: "IFCPA / CRTV | Former, créer, préserver",
    description:
      "Institut de Formation et de Conservation du Patrimoine Audiovisuel de la CRTV, à Yaoundé.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "IFCPA / CRTV — Former, créer, préserver" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IFCPA / CRTV | Former, créer, préserver",
    description: "Formation aux métiers de l'audiovisuel et conservation du patrimoine à Yaoundé.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Institut de Formation et de Conservation du Patrimoine Audiovisuel de la CRTV",
  alternateName: "IFCPA / CRTV",
  url: siteUrl,
  logo: `${siteUrl}/ifcpa-logo.png`,
  foundingDate: "1983",
  email: "ifcpa.crtv@gmail.com",
  telephone: "+237656700852",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ekounou",
    addressLocality: "Yaoundé",
    addressCountry: "CM",
  },
  sameAs: ["https://www.facebook.com/ifcpacrtv/", "https://crtv.cm"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${manrope.variable} ${sora.variable} scroll-smooth`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
