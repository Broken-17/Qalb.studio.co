import { store } from '../config/store';
import { promos } from '../data/promos';

export const findPromo = (code) => {
  const c = String(code || '').trim().toUpperCase();
  return c ? promos.find((p) => p.active && p.code.toUpperCase() === c) || null : null;
};

/* One place that does ALL the money maths.
   mode: 'cod' (pay the advance now, balance on delivery) or 'prepaid' (everything now). */
export function price({ subtotal, promoCode = '', mode = 'cod', hasLines = true }) {
  let discount = 0;
  let promo = null;
  let promoError = '';
  let promoMin = 0;
  const typed = String(promoCode || '').trim();
  if (typed) {
    const p = findPromo(typed);
    if (!p) promoError = 'invalid';
    else if (p.expires && new Date(`${p.expires}T23:59:59+05:30`) < new Date()) promoError = 'expired';
    else if (subtotal < (p.min || 0)) { promoError = 'min'; promoMin = p.min; }
    else {
      promo = p;
      if (p.type === 'percent') discount = Math.round((subtotal * p.value) / 100);
      if (p.type === 'percent' && p.maxOff) discount = Math.min(discount, p.maxOff);
      if (p.type === 'flat') discount = Math.min(p.value, subtotal);
    }
  }
  const shipping = hasLines && !(promo && promo.type === 'freeship') ? store.shippingFee : 0;
  const total = Math.max(0, subtotal - discount) + shipping;

  let advance = 0;
  if (mode === 'cod' && store.cod.enabled) {
    const waived = store.cod.waiveAdvanceAbove !== null && total > store.cod.waiveAdvanceAbove;
    advance = waived ? 0 : Math.min(store.cod.advance ?? 0, total);
  }
  const payNow = mode === 'prepaid' ? total : advance;
  const balance = total - payNow;
  return { subtotal, discount, shipping, total, advance, payNow, balance, promo, promoError, promoMin };
}
