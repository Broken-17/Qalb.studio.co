import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { getProduct } from '../lib/catalog';
import { store } from '../config/store';

const KEY = 'qalb_bag_v1';
const CKEY = 'qalb_checkout_v1';
const Ctx = createContext(null);

const read = (key, fallback) => {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || 'null');
    return raw ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* private mode: just won't persist */ }
};

function reducer(items, a) {
  const max = store.maxPerItem || 10;
  switch (a.type) {
    case 'add': {
      const key = `${a.slug}|${a.size || ''}`;
      const found = items.find((i) => i.key === key);
      if (found) return items.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + a.qty, max) } : i));
      return [...items, { key, slug: a.slug, size: a.size || '', qty: Math.min(a.qty, max) }];
    }
    case 'qty':
      return items.map((i) => (i.key === a.key ? { ...i, qty: Math.max(1, Math.min(a.qty, max)) } : i));
    case 'remove':
      return items.filter((i) => i.key !== a.key);
    case 'clear':
      return [];
    default:
      return items;
  }
}

const blankCheckout = { name: '', phone: '', address: '', city: '', pin: '', mode: 'cod', replyLang: '', notes: '' };

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, () => {
    const raw = read(KEY, []);
    return Array.isArray(raw) ? raw : [];
  });
  const [toast, setToast] = useState('');
  const [drawer, setDrawer] = useState(false);
  const [checkout, setCheckoutState] = useState(() => ({ ...blankCheckout, ...read(CKEY, {}) }));
  const [promoCode, setPromoCode] = useState('');

  useEffect(() => write(KEY, items), [items]);
  useEffect(() => write(CKEY, checkout), [checkout]);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    if (!drawer) return undefined;
    const k = (e) => e.key === 'Escape' && setDrawer(false);
    document.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', k);
      document.body.style.overflow = '';
    };
  }, [drawer]);

  // join with the live catalog, so removed products drop out and prices stay current
  const lines = useMemo(
    () => items.map((i) => ({ ...i, product: getProduct(i.slug) })).filter((l) => l.product),
    [items]
  );
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + (typeof l.product.price === 'number' ? l.product.price * l.qty : 0), 0);
  const allPriced = lines.every((l) => typeof l.product.price === 'number');

  const add = useCallback((slug, size, qty = 1) => {
    dispatch({ type: 'add', slug, size, qty });
    setDrawer(true);
  }, []);
  const setCheckout = useCallback((patch) => setCheckoutState((c) => ({ ...c, ...patch })), []);

  const value = useMemo(
    () => ({
      lines, count, total, allPriced, toast, drawer, checkout, promoCode,
      add,
      setQty: (key, qty) => dispatch({ type: 'qty', key, qty }),
      remove: (key) => dispatch({ type: 'remove', key }),
      clear: () => { dispatch({ type: 'clear' }); setPromoCode(''); },
      notify: setToast,
      openDrawer: () => setDrawer(true),
      closeDrawer: () => setDrawer(false),
      setCheckout,
      setPromoCode,
    }),
    [lines, count, total, allPriced, toast, drawer, checkout, promoCode, add, setCheckout]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx);
