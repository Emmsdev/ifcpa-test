import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IFCPA / CRTV — Former, créer, préserver",
  description:
    "Institut de Formation et de Conservation du Patrimoine Audiovisuel de la CRTV.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
