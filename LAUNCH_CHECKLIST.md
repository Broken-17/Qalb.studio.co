# Before Qalb Studio goes live

## Must do
- [ ] **Web3Forms key**: go to web3forms.com, enter support@qalbstudio.co, paste the access key into `src/config/site.js` (`web3formsKey`). Send a test from the Contact and Wholesale pages. Until then the forms open the visitor's email app instead.
- [ ] **COD advance** in `src/config/store.js` (`cod.advance`, currently Rs 100 as a placeholder). Confirm the amount, and that it is **deducted from the order total** (not added on top). Optionally add your UPI ID (`cod.upiId`).
- [ ] **Delivery days** per area in `store.js` (currently 3-7 working days for Vizag and Andhra Pradesh, packing 1-2 working days).
- [ ] **Real products**: delete the 6 sample folders in `src/products/`, add yours (`npm run new-product -- "Name"`). Check prices, MRP, fabric, sizes, stock.
- [ ] **Size chart** in `store.js` is a typical starting chart. Replace it with your real garment measurements (or give each product its own `sizeChart`).
- [ ] **Policies** (Help page, `src/i18n/policies.js`): drafted from what leading Indian fashion platforms offer (7-day returns, free first size exchange, 5-7 day refunds). Have a lawyer or CA check Terms, Privacy and the advance-forfeiture clause. Add your **grievance officer name** (`site.grievanceName`) and GST / business details if applicable.
- [ ] **Hindi and Urdu text** (`src/i18n/ui.js`, `story.js`, `policies.js`): have a native reader proofread.

## Promo codes
Edit `src/data/promos.js` and set `active: true` on the ones you want (all start switched off). Codes are checked in the browser, so a technical visitor could in theory read them from the site; you always confirm the final amount on WhatsApp before dispatch. Switch codes off when a campaign ends.

## Test before announcing
- [ ] WhatsApp, Instagram and email links on phone and desktop.
- [ ] A full order: add to bag, enter a Vizag pincode, COD and prepaid, with a promo code. Check the WhatsApp message.
- [ ] A pincode outside Andhra Pradesh (ordering should be blocked, with a "Ask us on WhatsApp" link).
- [ ] Switch to Hindi and Urdu on a phone; check the bag, the product page and the Help page.
- [ ] Lookbook: add photos to `src/lookbook/` to show the page (it stays hidden while the folder is empty).
