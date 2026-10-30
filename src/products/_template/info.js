/* ==========================================================================
   COPY THIS FOLDER to add a product:
     1. Copy the whole `_template` folder, rename the copy to the product name, e.g. `qalb-black-hoodie`
        (lowercase, words joined with hyphens; this becomes the product's web address).
     2. Drop the photos in it. Name them by what they show and they are ordered automatically:
          front.jpg   back.jpg   side.jpg   model.jpg   detail.jpg   (detail-2.jpg ...)
        Anything else (1.jpg, 2.jpg ...) comes after, in number order.
     3. Edit the details below, save, rebuild. Folders starting with _ are ignored.
   Delete a product = delete its folder.
   Leave out any line you don't need.
   ========================================================================== */
export default {
  name: 'Product name',
  price: 999,            // selling price in rupees (leave out to show "Ask for price")
  mrp: 1299,             // original price, shows "% off" (optional)
  category: 'T-Shirts',  // products with the same category are grouped together
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: ['Black'],
  description: 'One or two lines about this piece.',
  details: ['100% cotton, 240 GSM', 'Oversized fit', 'Machine wash cold, inside out'],
  tags: ['new'],         // 'new' shows a New badge
  inStock: true,         // false shows "Sold out" and "Notify me"
  order: 1,              // lower numbers show first

  // OPTIONAL: Hindi / Urdu text for this product. Anything left out falls back to English.
  translations: {
    // hi: { name: 'क़ल्ब क्लासिक टी', description: '...', details: ['...'], colors: ['काला'] },
    // ur: { name: 'قلب کلاسک ٹی', description: '...', details: ['...'], colors: ['کالا'] },
  },

  // OPTIONAL: this product's own size chart (otherwise the general one in src/config/store.js is used).
  // sizeChart: { head: ['Size', 'Chest (in)', 'Length (in)'], rows: [['M', '42', '28'], ['L', '44', '29']] },
};
