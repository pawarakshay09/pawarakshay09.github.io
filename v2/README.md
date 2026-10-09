# ABC Restaurant · Customer Site v2

A refreshed, frontend-only customer experience in its own folder. It focuses on the restaurant story and photo menu. The admin dashboard, Play & Win, waiter requests, add-to-cart, clear-cart, and cart modal are not part of this version.

## Open locally

Open `index.html` in a modern browser. The table number defaults to 1 and can be changed with a query string, for example `index.html?table=5`. The `table-1.html` through `table-10.html` files are individual entry links that open the matching table experience.

Use the category chips or search to explore the menu. Click any dish photo or the hero image to open the animated full-size image viewer; close it with the close button, Escape, or by clicking the dark background.

The dietary controls filter vegetarian and non-vegetarian dishes. Social buttons are in the footer; replace the generic Instagram/Facebook links in `index.html` with the restaurant's profiles. Set `OWNER_WHATSAPP_NUMBER` in `js/feedback-whatsapp.js` to the owner's international number (digits only) to open WhatsApp with guest feedback prefilled. Guests must tap Send in WhatsApp; the page does not send messages automatically.

Menu photographs are local in `assets/menu-foods.png`. Bootstrap is not needed. Google Fonts are loaded from a CDN; the site uses system fallbacks if they are unavailable.
