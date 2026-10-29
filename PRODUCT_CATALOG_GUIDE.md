# Qalb Studio product catalogue

Products are loaded automatically from `src/products/*/info.json` and the images in that same folder.

## Add a product
1. Create `src/products/your-product-slug/`.
2. Add `info.json` using the example below.
3. Add images: `1.jpg` (main/front), `2.jpg` (back), `3.jpg` (details), and any additional numbered images. `cover.jpg` takes priority if present.
4. Run `npm run dev` to preview and `npm run build` before publishing.

```json
{
  "name": "Product name",
  "price": 1299,
  "mrp": 1499,
  "category": "T-Shirts",
  "sizes": ["S", "M", "L", "XL"],
  "colors": ["Black"],
  "fabric": "Add verified fabric composition",
  "fit": "Regular fit",
  "description": "Accurate product description.",
  "details": ["Add verified feature", "Add care instructions"],
  "tags": ["new"],
  "inStock": true,
  "order": 1
}
```

Only publish accurate prices, composition, measurements, availability and claims. The UI catalogue is generated at build time, so rebuild/redeploy after changes.
