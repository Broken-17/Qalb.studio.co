import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { en, hi, ur } from './ui';
import { store } from '../config/store';

const KEY = 'qalb_lang_v1';
export const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'हि' },
  { code: 'ur', label: 'اردو', short: 'اردو' },
];
const dicts = { en, hi, ur };
const Ctx = createContext(null);

const initial = () => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && dicts[saved]) return saved;
  } catch { /* ignore */ }
  const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return dicts[nav] ? nav : 'en';
};

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initial);
  const dir = lang === 'ur' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try { localStorage.setItem(KEY, lang); } catch { /* ignore */ }
  }, [lang, dir]);

  const t = useCallback(
    (key, vars) => {
      let s = dicts[lang][key] ?? en[key] ?? key;
      if (vars) Object.entries(vars).forEach(([k, v]) => { s = s.split(`{${k}}`).join(v); });
      return s;
    },
    [lang]
  );

  // product / category text in the chosen language, falling back to English
  const loc = useCallback(
    (p) => {
      const tr = (lang !== 'en' && p.translations?.[lang]) || {};
      return {
        ...p,
        name: tr.name || p.name,
        description: tr.description || p.description,
        details: tr.details || p.details,
        colors: tr.colors || p.colors,
      };
    },
    [lang]
  );
  const cat = useCallback((c) => (lang !== 'en' && store.categoryNames[c]?.[lang]) || c, [lang]);

  const value = useMemo(() => ({ lang, dir, setLang: (l) => dicts[l] && setLangState(l), t, loc, cat }), [lang, dir, t, loc, cat]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);

// **bold** -> <strong>
export function rich(text) {
  return String(text)
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) => (part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part));
}
