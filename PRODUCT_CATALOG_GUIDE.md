# Adding products to Qalb Studio

Everything lives in `src/products/`. **One folder = one product.** No code changes needed.

```
src/products/
  qalb-black-hoodie/        <- folder name = the product's web address
    front.jpg               <- photos, named by what they show
    back.jpg
    side.jpg
    model.jpg
    detail.jpg  detail-2.jpg
    info.js                 <- name, price, sizes, text (Hindi/Urdu optional)
  _template/                <- copy this to start a new product (ignored by the site)
```

## Easiest way
```
npm run new-product -- "Qalb Black Hoodie"
```
That copies `_template` into a new folder. Drop your photos in, edit `info.js`, run `npm run dev` to check, then publish.

## Photo order
The website orders photos by their file name: `front` (or `cover`/`main`) first, then `back`, `side`/`left`/`right`, `model`/`worn`, `detail`/`close`, then anything else (`1.jpg`, `2.jpg`...) in number order. The first photo is the shop thumbnail, the second shows on hover. Labels (Front, Back, ...) are read from the file names.

Big phone photos? Run `npm run optimize-images` first (shrinks anything over about 450 KB).

## info.js fields
`name, price, mrp, category, sizes, colors, description, details, tags, inStock, order`, plus optional `translations: { hi: {...}, ur: {...} }` and `sizeChart`. See `_template/info.js` for a commented example. Leave out any line you don't need.

## Remove or hide
Delete the folder. Or set `inStock: false` to show "Sold out".

The catalogue is built when you publish, so rebuild/redeploy after changes. Only publish accurate prices, fabric details, measurements and claims.
