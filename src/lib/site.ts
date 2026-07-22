export const SITE_NAME = "IFCPA / CRTV";
export const SITE_TITLE = "IFCPA/CRTV | École audiovisuelle à Yaoundé";
export const SITE_DESCRIPTION =
  "Formez-vous aux métiers de l'image, du son, des médias et de la conservation du patrimoine audiovisuel à l'IFCPA/CRTV de Yaoundé.";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ifcpa-crtv.com";

export const SITE_URL = new URL(configuredSiteUrl).origin;

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
