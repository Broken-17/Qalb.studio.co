/* Lookbook photos: just drop images into src/lookbook/ (any names, sorted by name). Empty = page hidden. */
const files = import.meta.glob('../lookbook/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url', import: 'default' });
export const lookbook = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, url]) => ({ url, alt: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ') }));
export const hasLookbook = lookbook.length > 0;
