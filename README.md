# QALB STUDIO store (React + Vite)

A multi-page online store that runs on **GitHub Pages**. No server, no database, no monthly cost except your domain.

Pages: Home, Shop (search / filter / sort), Product, Bag, Our Story, Contact, Help (appears only when you fill it in), 404.

## Run it

```
npm install
npm run dev        # live preview while you edit
npm run build      # check the production build
```

## 1. Add or remove products (no code)

Every product is **one folder** in `src/products/`:

```
src/products/qalb-classic-tee/
    info.json     <- details (below)
    1.jpg         <- first image = main photo (or name it cover.jpg)
    2.jpg         <- more photos, shown in number order
    3.jpg
```

- **Add a product:** copy any folder, rename it, swap the photos, edit `info.json`.
- **Remove a product:** delete its folder.
- The folder name becomes the page link (`#/product/qalb-classic-tee`), so use lowercase words with dashes.
- Big phone photos? Run `npm run optimize-images` once. It shrinks anything over 1600 px wide.

`info.json` (only `name` and `price` are really needed, everything else is optional):

```json
{
  "name": "Qalb Classic Tee",
  "price": 899,
  "mrp": 1199,
  "category": "T-Shirts",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black"],
  "description": "One or two lines about the piece.",
  "details": ["100% cotton, 240 GSM", "Machine wash cold"],
  "tags": ["new"],
  "inStock": true,
  "order": 1
}
```

- `mrp` (the old price) is optional. The "% off" badge appears only when you give one.
- `tags: ["new"]` shows a NEW badge. `inStock: false` shows SOLD OUT and a "notify me" button.
- `order` decides the position (1 = first).
- No `sizes` means no size picker (one-size items).
- `"sample": true` marks a product as a placeholder. **Delete the 6 sample folders before you launch.**

## 2. Store settings

Edit `src/config/site.js`: WhatsApp number, email, Instagram, logo, launch banner and countdown date.
Fill in `src/data/help.js` (shipping, returns, size guide, FAQs). Empty parts stay hidden.
Brand story words are in `src/pages/About.jsx`. Colours are at the top of `src/styles/base.css`.

## 3. How buying works (no payment gateway, no server)

- **Add to bag** keeps items in the visitor's browser.
- **Order on WhatsApp** (product page or bag) opens WhatsApp to YOUR number with the full order pre-written: items, sizes, quantities, total and product links. You then confirm address, shipping and payment in the chat.

## 4. Contact form to your email

Create a free form on Formspree or Web3Forms, then set `VITE_FORM_ENDPOINT` (and `VITE_FORM_ACCESS_KEY` for Web3Forms), see `.env.example`.
Locally: copy it to `.env`. On GitHub: **Settings > Secrets and variables > Actions > Variables**.
Without it, the form opens the visitor's email app with the message ready.

## 5. Put it online (GitHub Pages)

1. Push this folder to a GitHub repo (branch `main`).
2. **Settings > Pages > Source: GitHub Actions.** (This step is required once.)
3. Every push to `main` builds and publishes automatically (`.github/workflows/deploy.yml`).
4. Custom domain: **Settings > Pages > Custom domain**, then add the DNS records at your domain registrar.

The site uses hash links (`/#/shop`) and relative paths, so it works the same on `username.github.io/repo/` and on your own domain, with nothing to change.
## Qalb Studio store setup
- **Products:** one folder per product in `src/products/` with photos plus `info.js`. See `PRODUCT_CATALOG_GUIDE.md`. Quick start: `npm run new-product -- "Product name"`.
- **Store rules** (delivery areas, COD advance, returns, size chart): `src/config/store.js`.
- **Contact details, Web3Forms key:** `src/config/site.js`.
- **Promo codes:** `src/data/promos.js` (all off by default).
- **Languages (English, Hindi, Urdu):** `src/i18n/ui.js` (site text), `story.js` (Our Story), `policies.js` (Help page). A customer's choice is remembered; Urdu switches the layout to right-to-left.
- **Lookbook:** drop photos into `src/lookbook/`; the page appears automatically.
- **Before launch:** see `LAUNCH_CHECKLIST.md`.
