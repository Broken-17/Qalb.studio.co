/* ==========================================================================
   PRODUCT CATALOG, built automatically from the folders in /src/products/

   One folder = one product:
     src/products/qalb-classic-tee/
        info.js        <- name, price, sizes, category ... (copy src/products/_template/info.js)
        front.jpg      <- photos. Any names work; they are ordered automatically:
        back.jpg          cover/front/main  ->  back  ->  side/left/right  ->  model/worn  ->  detail/close
        side.jpg          -> anything else in number/alphabet order (1.jpg, 2.jpg ...)
        detail-1.jpg

   Add a product : create the folder, drop photos + info.js, rebuild.
   Remove one    : delete the folder.
   No code changes, ever. Folders starting with _ are ignored.
   ========================================================================== */

const infoFiles = import.meta.glob('../products/*/info.js', { eager: true, import: 'default' });
const files = import.meta.glob('../products/*/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const natural = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
const titleCase = (s) => s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).trim();

// photo order + label, from the file name
const KINDS = [
  ['front', /^(cover|front|main|hero)/i, 'front'],
  ['back', /^back/i, 'back'],
  ['side', /^(side|left|right)/i, 'side'],
  ['model', /^(model|worn|wear|on-?model|lifestyle)/i, 'model'],
  ['detail', /^(detail|close|zoom|fabric|print|label)/i, 'detail'],
];
const kindOf = (file) => {
  const name = file.replace(/\.[^.]+$/, '');
  const i = KINDS.findIndex(([, re]) => re.test(name));
  return i === -1 ? { rank: 99, label: '' } : { rank: i, label: KINDS[i][2] };
};

const imagesBySlug = {};
Object.entries(files).forEach(([path, url]) => {
  const [, , slug, file] = path.split('/'); // ['..','products',slug,file]
  if (slug.startsWith('_')) return;
  (imagesBySlug[slug] ||= []).push({ file, url, ...kindOf(file) });
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
  sizeChart: null,
  translations: {},
};

export const products = Object.keys(imagesBySlug)
  .map((slug) => {
    const info = infoFiles[`../products/${slug}/info.js`] || {};
    const imgs = [...imagesBySlug[slug]].sort((a, b) => a.rank - b.rank || natural(a.file, b.file));
    return {
      ...defaults,
      name: titleCase(slug),
      ...info,
      slug,
      images: imgs.map((i) => i.url),
      imageLabels: imgs.map((i) => i.label), // 'front' | 'back' | ... | '' (shown as "Photo 3")
    };
  })
  .sort((a, b) => a.order - b.order || natural(a.name, b.name));

export const categories = [...new Set(products.map((p) => p.category))];
export const allSizes = [...new Set(products.flatMap((p) => p.sizes))];
export const getProduct = (slug) => products.find((p) => p.slug === slug);
