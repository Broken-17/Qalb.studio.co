import { useEffect, useRef, useState } from 'react';
import { Heart, Phone } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from './Icons';
import { site } from '../config/site';
import { useI18n } from '../i18n';

/* "Built & maintained by <name> | phone | instagram" inside the footer bar.
   Name links to the portfolio; the phone number opens a small Call / WhatsApp chooser. */
export default function DevCredit() {
  const { t } = useI18n();
  const d = site.developer;
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

  if (!d?.name) return null;
  const digits = d.phone.replace(/\D/g, '');
  const intl = digits.length === 10 ? `91${digits}` : digits;

  return (
    <p className="credit" dir="ltr">
      <span className="credit-by">
        <Heart size={13} /> {t('ft.built')}{' '}
        {d.portfolio ? (
          <a className="credit-name" href={d.portfolio} target="_blank" rel="noopener noreferrer" data-tip="View portfolio">{d.name}</a>
        ) : (
          <strong>{d.name}</strong>
        )}
      </span>
      {d.phone && (
        <>
          <i>|</i>
          <span className="credit-call" ref={box}>
            <button type="button" className="tip-up" data-tip="Call to build your own web applications" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              <Phone size={13} /> {d.phone}
            </button>
            {open && (
              <span className="credit-menu" role="menu">
                <a role="menuitem" href={`https://wa.me/${intl}`} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}><WhatsAppIcon size={16} /> WhatsApp</a>
                <a role="menuitem" href={`tel:+${intl}`} onClick={() => setOpen(false)}><Phone size={16} /> Call</a>
              </span>
            )}
          </span>
        </>
      )}
      {d.instagram && (
        <>
          <i>|</i>
          <a className="tip-up" href={`https://www.instagram.com/${d.instagram}`} target="_blank" rel="noopener noreferrer" data-tip={`@${d.instagram} on Instagram`} aria-label={`Instagram @${d.instagram}`}>
            <InstagramIcon size={14} /> {d.instagram}
          </a>
        </>
      )}
    </p>
  );
}
