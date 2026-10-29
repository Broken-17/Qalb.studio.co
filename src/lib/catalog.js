/* ==========================================================================
   PRODUCT CATALOG, built automatically from the folders in /src/products/

   One folder = one product:
     src/products/qalb-classic-tee/
        info.json      <- name, price, sizes, category ... (see README)
        1.jpg          <- first image = main photo (or name it cover.jpg)
        2.jpg  3.jpg   <- extra photos, shown in the gallery in number order

   Add a product : create the folder and rebuild.
   Remove one    : delete the folder.
   No code changes, ever.
   ========================================================================== */

const infoFiles = import.meta.glob('../products/*/info.json', { eager: true, import: 'default' });
const files = import.meta.glob('../products/*/*', { eager: true, query: '?url', import: 'default' });

const IMG = /\.(jpe?g|png|webp|avif|gif)$/i;
const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
const titleCase = (s) => s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).trim();

// group image urls per folder
const imagesBySlug = {};
Object.entries(files).forEach(([path, url]) => {
  const [, , slug, file] = path.split('/'); // ['..','products',slug,file]
  if (!IMG.test(file)) return;
  (imagesBySlug[slug] ||= []).push({ file, url });
});

const defaults = {
  price: null,
  mrp: null,
  category: 'Collection',
  sizes: [],
  colors: [],
  description: '',
  details: [],
  tags: [],
  inStock: true,
  order: 999,
  sample: false,
};

export const products = Object.keys(imagesBySlug)
  .map((slug) => {
    const info = infoFiles[`../products/${slug}/info.json`] || {};
    const imgs = imagesBySlug[slug]
      .sort((a, b) => {
        const ac = /^cover\./i.test(a.file), bc = /^cover\./i.test(b.file);
        if (ac !== bc) return ac ? -1 : 1;
        return natural(a.file, b.file);
      })
      .map((i) => i.url);
    return { ...defaults, name: titleCase(slug), ...info, slug, images: imgs };
  })
  .sort((a, b) => a.order - b.order || natural(a.name, b.name));

export const categories = [...new Set(products.map((p) => p.category))];
export const allSizes = [...new Set(products.flatMap((p) => p.sizes))];
export const getProduct = (slug) => products.find((p) => p.slug === slug);
