// Shrinks big phone photos in src/products so the shop loads fast.
// Usage: npm run optimize-images        (safe to run again, only touches large files)
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('../src/products/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const MAX_WIDTH = 1600;
const MAX_BYTES = 450 * 1024;
const ok = new Set(['.jpg', '.jpeg', '.png', '.webp']);

let saved = 0, touched = 0;
for (const slug of readdirSync(ROOT)) {
  const dir = join(ROOT, slug);
  if (!statSync(dir).isDirectory()) continue;
  for (const f of readdirSync(dir)) {
    const ext = extname(f).toLowerCase();
    if (!ok.has(ext)) continue;
    const file = join(dir, f);
    const before = readFileSync(file);
    const meta = await sharp(before).metadata();
    if (before.length <= MAX_BYTES && (meta.width || 0) <= MAX_WIDTH) continue;
    let pipe = sharp(before).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
    pipe = ext === '.png' ? pipe.png({ compressionLevel: 9 }) : ext === '.webp' ? pipe.webp({ quality: 82 }) : pipe.jpeg({ quality: 82, mozjpeg: true });
    const after = await pipe.toBuffer();
    if (after.length < before.length) {
      writeFileSync(file, after);
      saved += before.length - after.length;
      touched++;
      console.log(`optimized ${slug}/${f}: ${(before.length / 1024) | 0} KB -> ${(after.length / 1024) | 0} KB`);
    }
  }
}
console.log(touched ? `Done. ${touched} image(s) optimized, ${(saved / 1024 / 1024).toFixed(1)} MB saved.` : 'All images are already small enough.');
