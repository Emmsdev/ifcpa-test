# Vitrine IFCPA / CRTV

Site vitrine bilingue (français / anglais) de l'Institut de Formation et de
Conservation du Patrimoine Audiovisuel de la CRTV.

La première interface reprend la direction artistique de `v2-memoire.html` :
une approche éditoriale inspirée des archives audiovisuelles, avec des sections
sur l'institut, les formations, le patrimoine, les admissions et le contact.

## Démarrer

```bash
npm run dev
```

Ouvrez ensuite [http://localhost:3000](http://localhost:3000).

## Vérifier

```bash
npm run lint
npm run build
```

## SEO en production

Copiez `.env.example` vers `.env.local` et remplacez `NEXT_PUBLIC_SITE_URL` par
le domaine public réel avant le déploiement. Cette URL alimente le canonical,
les données structurées, `robots.txt` et `sitemap.xml`.

## Structure

- `src/app/page.tsx` : point d'entrée de la page d'accueil.
- `src/components/ifcpa-website-shell.tsx` : navigation, langue, menu mobile
  et composition de la page.
- `src/components/sections/` : sections Hero, Institut, Formations, Formation
  continue, Patrimoine, Admissions et Contact.
- `src/components/language-selector.tsx` : menu déroulant Français / English.
- `src/app/globals.css` : socle Tailwind et détails visuels partagés.
