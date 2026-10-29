import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { getProduct } from '../lib/catalog';

const KEY = 'qalb_bag_v1';
const Ctx = createContext(null);

const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
};

function reducer(items, a) {
  switch (a.type) {
    case 'add': {
      const key = `${a.slug}|${a.size || ''}`;
      const found = items.find((i) => i.key === key);
      if (found) return items.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + a.qty, 20) } : i));
      return [...items, { key, slug: a.slug, size: a.size || '', qty: a.qty }];
    }
    case 'qty':
      return items.map((i) => (i.key === a.key ? { ...i, qty: Math.max(1, Math.min(a.qty, 20)) } : i));
    case 'remove':
      return items.filter((i) => i.key !== a.key);
    case 'clear':
      return [];
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, load);
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* private mode: the bag just won't persist */
    }
  }, [items]);

  useEffect(() => {
    if (!toast) return undefined;
    const id = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(id);
  }, [toast]);

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
    setToast('Added to your bag');
  }, []);

  const value = useMemo(
    () => ({
      lines,
      count,
      total,
      allPriced,
      toast,
      add,
      setQty: (key, qty) => dispatch({ type: 'qty', key, qty }),
      remove: (key) => dispatch({ type: 'remove', key }),
      clear: () => dispatch({ type: 'clear' }),
      notify: setToast,
    }),
    [lines, count, total, allPriced, toast, add]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => useContext(Ctx);
