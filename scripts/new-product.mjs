// Creates a new product folder from the template.
// Usage: npm run new-product -- "Qalb Black Hoodie"
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const name = process.argv.slice(2).join(' ').trim();
if (!name) {
  console.log('Usage: npm run new-product -- "Product name"');
  process.exit(1);
}
const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const root = new URL('../src/products/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const dest = join(root, slug);
if (existsSync(dest)) {
  console.log(`A product folder named "${slug}" already exists.`);
  process.exit(1);
}
cpSync(join(root, '_template'), dest, { recursive: true });
const file = join(dest, 'info.js');
writeFileSync(file, readFileSync(file, 'utf8').replace("name: 'Product name'", `name: '${name.replace(/'/g, "\\'")}'`));
console.log(`Created src/products/${slug}/\nNext: drop front.jpg, back.jpg ... into it, edit info.js, then run npm run dev.`);
