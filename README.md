# ABC Restaurant · Smart Table demo

A mobile-first, frontend-only restaurant table experience. NFC and QR can point guests to the same URL, such as `index.html?table=12`. The demo stores menu order previews, waiter requests, reviews, and game plays in the current browser's `localStorage`.

## Run locally

1. Unzip or keep the project files together.
2. Open `index.html` in a modern browser. No build step or server is required for the demo.
3. For a local QR/NFC target, use the URL shown in the browser's address bar with `?table=12` (or `?table=5`). For access from another phone, host the folder on a web server and use that hosted URL.
4. Open `admin.html` in the same browser to see waiter requests. Keep both pages open to watch updates; refresh the admin page if needed.

## Try the demo

- Change the table by editing the address to `index.html?table=5` or `index.html?table=12`.
- Add a few menu items, then use the order button to see the cart preview. This does not submit a real kitchen order.
- Tap **Play & win**. A table can play once per browser; use a different table number to demonstrate a new play.
- Tap **Call a waiter**, then open `admin.html` and mark the request done.
- The payment view is a clearly marked placeholder, not a live payment QR.

## QR and NFC setup

`assets/qr-table-12.svg` is a local decorative QR-style placeholder. Its label and the URL configuration live in `js/app.js` (`TABLE_URL`). Replace the placeholder with a real QR generated for your deployed URL before using it with guests. Program the NFC tag with the exact same URL, changing only the `table` parameter per table. NFC and the QR must both use a reachable hosted URL for other devices; a `file://` URL only opens on the device holding these files.

## Project files

- `index.html` — guest landing page, menu, service actions and entry-method explainer
- `admin.html` — local demo floor view and request queue
- `css/style.css` — responsive styling
- `js/app.js` — guest interactions and browser storage
- `js/admin.js` — admin dashboard and request completion
- `assets/qr-table-12.svg` — local QR-style placeholder asset

Bootstrap 5 and its icons-free UI use the Bootstrap CDN; Google Fonts are used for type. A network connection is required for those remote styles, but the page interactions work locally.
