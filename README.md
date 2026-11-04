# Aman & Nishu — Wedding Invitation

A responsive React 18 + Vite wedding website published to GitHub Pages.

## Run locally

```bash
npm ci
npm run dev
npm run build
npm run preview
```

## Routes

| Route | Purpose |
|---|---|
| `/` | Wedding home and invitation links |
| `/card` | Countdown, Supabase-managed function cards and wedding video |
| `/arrangement` | Guest stay-arrangement form |
| `/edit-arrangement` | Find and update a submitted stay arrangement |
| `/video` | Full-screen wedding video |
| `/admin` | Admin login and dashboard |

Legacy `.php` guest links are redirected by the React router to their current routes.

## Content and data

- Couple names, date line and countdown target: `src/data/wedding.js`.
- Wedding function cards: Supabase, read by `src/pages/Card.jsx` and managed in `/admin`.
- Guest stay arrangements: Supabase Edge Function calls in `src/services/api.js`.
- Admin actions: `src/services/adminApi.js`.
- Shared Supabase project URL and public anon key: `src/services/config.js`.

The Supabase anon key is a public client key. Privileged operations must remain protected by the Edge Function and database policies; never put a service-role key in this repository.

## GitHub Pages deployment

Pushing to `main` runs `.github/workflows/deploy.yml`. The workflow builds the Vite app, creates the SPA fallback file and publishes `dist/` to the `gh-pages` branch.

The project-site base path is configured in `vite.config.js` as `/AmanNishu/`.

## Legacy PHP files

The `api/` directory contains the earlier PHP/MySQL implementation retained for reference or a PHP-hosted deployment. GitHub Pages does not execute PHP; the current GitHub Pages site uses the Supabase Edge Function integration described above.
