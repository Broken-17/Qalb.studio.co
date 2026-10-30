import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Heart } from 'lucide-react';
import Logo from './Logo';
import { InstagramIcon, WhatsAppIcon } from './Icons';
import { site } from '../config/site';
import { areaList } from '../config/store';
import { useI18n } from '../i18n';
import { categories } from '../lib/catalog';
import { hasLookbook } from '../lib/lookbook';
import { waLink } from '../lib/whatsapp';

export default function Footer() {
  const { t, cat, lang } = useI18n();
  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div className="foot-brand">
          <Logo size="lg" />
          <p>{site.intro}</p>
          <p className="deliver">{t('ft.deliver', { areas: areaList(lang) })}</p>
          <div className="socials">
            {site.instagram && (
              <a data-tip={t('tip.instagram')} href={`https://www.instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer" aria-label={t('tip.instagram')}>
                <InstagramIcon size={20} />
              </a>
            )}
            <a data-tip={t('tip.whatsapp')} href={waLink()} target="_blank" rel="noopener noreferrer" aria-label={t('tip.whatsapp')}>
              <WhatsAppIcon size={20} />
            </a>
            {site.email && (
              <a data-tip={t('tip.email')} href={`mailto:${site.email}`} aria-label={t('tip.email')}>
                <Mail size={20} />
              </a>
            )}
            {site.phone && (
              <a data-tip={t('tip.call')} href={`tel:${site.phone.replace(/\s/g, '')}`} aria-label={t('tip.call')}>
                <Phone size={20} />
              </a>
            )}
          </div>
        </div>

        <nav aria-label={t('ft.shop')}>
          <h4>{t('ft.shop')}</h4>
          <Link to="/shop">{t('ft.all')}</Link>
          {categories.slice(0, 5).map((c) => (
            <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`}>{cat(c)}</Link>
          ))}
          {hasLookbook && <Link to="/lookbook">{t('nav.lookbook')}</Link>}
        </nav>

        <nav aria-label={t('ft.info')}>
          <h4>{t('ft.info')}</h4>
          <Link to="/about">{t('ft.story')}</Link>
          <Link to="/size-guide">{t('nav.sizes')}</Link>
          <Link to="/help">{t('ft.policies')}</Link>
          <Link to="/terms">{t('ft.terms')}</Link>
          <Link to="/wholesale">{t('nav.wholesale')}</Link>
          <Link to="/contact">{t('ft.contact')}</Link>
        </nav>

        <div>
          <h4>{t('ft.touch')}</h4>
          <a className="f-line" href={waLink('Hi! I have a question.')} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={16} /> {t('ft.chat')}
          </a>
          {site.email && <a className="f-line" href={`mailto:${site.email}`}><Mail size={16} /> {site.email}</a>}
          {site.phone && <a className="f-line" href={`tel:${site.phone.replace(/\s/g, '')}`}><Phone size={16} /> <bdi dir="ltr">{site.phone}</bdi></a>}
          {site.address && <p className="f-line"><MapPin size={16} /> {site.address}</p>}
        </div>
      </div>

      <div className="container foot-bottom">
        <p>&copy; {new Date().getFullYear()} {site.name}. {t('ft.rights')}</p>
        <div className="credit-row">
          <p className="credit" dir="ltr">
            <span className="credit-by"><Heart size={14} /> {t('ft.built')} <strong>Aszar</strong></span>
            <i>|</i>
            <a href="tel:7660973723" data-tip="Call 7660973723"><Phone size={14} /> 7660973723</a>
            <i>|</i>
            <a href="https://www.instagram.com/_the.broken_17" target="_blank" rel="noopener noreferrer" data-tip="@_the.broken_17 on Instagram" aria-label="Instagram @_the.broken_17">
              <InstagramIcon size={15} /> _the.broken_17
            </a>
          </p>
        </div>
        <p className="serif">{t('ft.means', { ar: site.arabic })}</p>
      </div>
    </footer>
  );
}
