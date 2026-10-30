import { site } from '../config/site';
import { areaName } from '../config/store';
import { money } from './format';

export const waLink = (text = '') => {
  const q = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${site.whatsapp}${q}`;
};

// link that works on github.io/<repo>/ and on a custom domain (HashRouter)
export const productUrl = (slug) => `${window.location.origin}${window.location.pathname}#/product/${slug}`;

const LANG_NAME = { en: 'English', hi: 'Hindi', ur: 'Urdu' };

/* The order message the shop owner receives. Always English, so it is easy to read and act on.
   `checkout` = { name, phone, address, city, pin, area, mode, replyLang, notes }, `p` = price() result. */
export function orderMessage(lines, checkout = {}, p = null) {
  const out = [`${site.greeting} ${site.short} Studio,`, "I'd like to place an order:", ''];
  lines.forEach((l, i) => {
    const bits = [l.product.name];
    if (l.size) bits.push(`Size ${l.size}`);
    bits.push(`x ${l.qty}`);
    if (typeof l.product.price === 'number') bits.push(money(l.product.price * l.qty));
    out.push(`${i + 1}. ${bits.join(' - ')}`);
    out.push(`   ${productUrl(l.product.slug)}`);
  });

  if (p) {
    out.push('', `Subtotal: ${money(p.subtotal)}`);
    if (p.discount) out.push(`Promo ${p.promo.code}: -${money(p.discount)}`);
    if (p.shipping) out.push(`Shipping: ${money(p.shipping)}`);
    out.push(`Order total: ${money(p.total)}`);
    if (checkout.mode === 'prepaid') out.push('Payment: Full prepaid (UPI)');
    else if (p.advance) out.push(`Payment: COD. Advance ${money(p.advance)} now, ${money(p.balance)} on delivery`);
    else out.push(`Payment: COD. ${money(p.total)} on delivery`);
  }

  out.push('');
  out.push(`Name: ${checkout.name || ''}`);
  out.push(`Phone: ${checkout.phone || ''}`);
  out.push(`Address: ${checkout.address || ''}`);
  if (checkout.city) out.push(`City: ${checkout.city}`);
  out.push(`Pincode: ${checkout.pin || ''}${checkout.area ? ` (${areaName(checkout.area)})` : ''}`);
  out.push(`Please reply in: ${LANG_NAME[checkout.replyLang] || 'English'}`);
  if (checkout.notes) out.push(`Note: ${checkout.notes}`);
  return out.join('\n');
}

// "Order now" straight from a product page, one item, details collected on WhatsApp
export const quickBuyMessage = (product, size, qty, replyLang = 'en') => {
  const out = [`${site.greeting} ${site.short} Studio,`, "I'd like to order:", ''];
  const bits = [product.name];
  if (size) bits.push(`Size ${size}`);
  bits.push(`x ${qty}`);
  if (typeof product.price === 'number') bits.push(money(product.price * qty));
  out.push(`1. ${bits.join(' - ')}`, `   ${productUrl(product.slug)}`, '');
  out.push('Name:', 'Phone:', 'Address:', 'Pincode:', `Please reply in: ${LANG_NAME[replyLang] || 'English'}`);
  return out.join('\n');
};
