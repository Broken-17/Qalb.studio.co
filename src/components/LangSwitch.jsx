import { useEffect, useRef, useState } from 'react';
import { Check, Languages } from 'lucide-react';
import { LANGS, useI18n } from '../i18n';

export default function LangSwitch() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const away = (e) => !box.current?.contains(e.target) && setOpen(false);
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', away);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  return (
    <div className="lang" ref={box}>
      <button className="icon-btn" data-tip={t('tip.lang')} aria-label={t('tip.lang')} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <Languages size={21} />
      </button>
      {open && (
        <ul className="lang-menu" role="menu">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button role="menuitemradio" aria-checked={lang === l.code} lang={l.code} className={lang === l.code ? 'on' : ''} onClick={() => { setLang(l.code); setOpen(false); }}>
                {l.label} {lang === l.code && <Check size={15} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
