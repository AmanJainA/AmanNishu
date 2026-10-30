# Aman & Nishu — Wedding Invitation

A responsive React wedding invitation website celebrating Aman (Groom) and Nishu (Bride).

## Features

- Elegant wedding invitation landing page
- Couple introduction and invitation sections
- Wedding details section ready for the date, venue and schedule
- Responsive desktop, tablet and mobile layouts
- Collapsible mobile navigation
- Accessible navigation labels and reduced-motion support
- Search and social sharing metadata

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm start
```

Open http://localhost:3000.

## Production build

```bash
npm run build
```

The optimized website is generated in the `build` folder.

## Update wedding information

Edit `src/App.js` to add the confirmed wedding date, venue, event schedule and any RSVP/contact details. The current page intentionally uses a “Details coming soon” message until those details are confirmed.

## Main files

- `src/App.js` — page content and mobile navigation
- `src/App.css` — wedding theme and responsive layouts
- `src/index.css` — global styles
- `public/index.html` — page title and sharing metadata
