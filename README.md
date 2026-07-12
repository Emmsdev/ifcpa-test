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

## Structure

- `src/app/page.tsx` : page d'accueil.
- `src/components/ifcpa-website.tsx` : contenu et interactions du site,
  notamment le sélecteur français / anglais.
- `src/app/globals.css` : socle Tailwind et détails visuels partagés.
