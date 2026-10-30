import { useState } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '../i18n';
import { lookbook } from '../lib/lookbook';
import { useTitle } from '../hooks/hooks';

export default function Lookbook() {
  const { t } = useI18n();
  const [open, setOpen] = useState(null);
  useTitle(t('lb.eyebrow'));
  return (
    <section className="section page-top">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">{t('lb.eyebrow')}</p>
          <h1>{t('lb.title')}</h1>
          <p className="muted">{t('lb.sub')}</p>
        </header>
        <div className="masonry">
          {lookbook.map((l, i) => (
            <button key={l.url} className="mason reveal up" style={{ '--d': `${(i % 4) * 0.06}s` }} onClick={() => setOpen(l)} data-tip={t('tip.zoom')}>
              <img src={l.url} alt={l.alt} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(null)}>
          <button className="lb-close" aria-label={t('tip.close')} onClick={() => setOpen(null)}><X size={26} /></button>
          <img src={open.url} alt={open.alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}
