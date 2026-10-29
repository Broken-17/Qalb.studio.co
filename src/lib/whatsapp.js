import { site } from '../config/site';
import { money } from './format';

export const waLink = (text = '') => {
  const q = text ? `?text=${encodeURIComponent(text)}` : '';
  return site.whatsapp ? `https://wa.me/${site.whatsapp}${q}` : `https://wa.me/${q}`;
};

// link that works on github.io/<repo>/ and on a custom domain (HashRouter)
export const productUrl = (slug) => `${window.location.origin}${window.location.pathname}#/product/${slug}`;

export const orderMessage = (lines) => {
  const out = [`${site.greeting} ${site.short} Studio,`, "I'd like to order:", ''];
  let total = 0;
  let priced = true;
  lines.forEach((l, i) => {
    const bits = [l.product.name];
    if (l.size) bits.push(`Size ${l.size}`);
    bits.push(`x ${l.qty}`);
    if (typeof l.product.price === 'number') {
      const sub = l.product.price * l.qty;
      total += sub;
      bits.push(money(sub));
    } else priced = false;
    out.push(`${i + 1}. ${bits.join(' - ')}`);
    out.push(`   ${productUrl(l.product.slug)}`);
  });
  if (priced && lines.length) out.push('', `Total: ${money(total)}`);
  out.push('', 'Name:', 'Delivery address:');
  return out.join('\n');
};

export const quickBuyMessage = (product, size, qty) =>
  orderMessage([{ product, size, qty }]);
