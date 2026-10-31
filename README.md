# Aman & Nishu – Wedding Invitation (React)

React (Vite) version of the original PHP site. Same design (the original theme CSS, fonts and images are reused),
rebuilt as components and checked at 1440 / 1024 / 768 / 390 / 360 px with no horizontal scrolling.

## Run
```bash
npm install
npm run dev        # http://localhost:5173  (demo mode: form data saved in your browser only)
npm run build      # outputs dist/
```

## Pages
| Route | Original |
|---|---|
| `/` | index.php |
| `/card` | card.php (countdown, events, video) |
| `/arrangement` | arrangement.php |
| `/edit-arrangement` | editarrangement.php (+ information.php lookup) |
| `/video` | video.php |

Old `.php` links already shared with guests (e.g. `/card.php`) redirect to the new routes.

## Editing content
Names, date line, countdown target and the six events live in `src/data/wedding.js`.

## Saving stay arrangements (PHP + MySQL)
`api/` holds prepared-statement replacements for the original inline queries and uses the same `entry` table.
1. Copy `.env.example` to `.env` and set `VITE_API_URL=/api`, then `npm run build`.
2. Upload the contents of `dist/` plus the `api/` folder to the same domain (`dist/.htaccess` handles routing).
3. DB credentials default to the original (`localhost / root / empty / data`); override via `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`.

Without `VITE_API_URL`, a production build shows an error on submit instead of silently losing data.

The admin panel (`admin1/`) is not part of this port; keep using it as-is with the same database.
