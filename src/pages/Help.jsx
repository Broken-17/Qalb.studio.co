import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { site } from '../config/site';
import { useI18n } from '../i18n';
import { policies, POLICY_UPDATED } from '../i18n/policies';
import { useTitle } from '../hooks/hooks';
import { waLink } from '../lib/whatsapp';
import { WhatsAppIcon } from '../components/Icons';

export default function Help() {
  const { t, lang } = useI18n();
  useTitle(t('help.eyebrow'));
  const { hash } = useLocation();
  const data = policies(lang);

  useEffect(() => {
    if (hash) document.getElementById(hash.replace(/^#\/?/, '').replace(/^#/, ''))?.scrollIntoView();
  }, [hash]);

  return (
    <section className="section page-top">
      <div className="container help">
        <header className="page-head">
          <p className="eyebrow">{t('help.eyebrow')}</p>
          <h1>{t('help.title')}</h1>
          <p className="muted">{t('help.sub')}</p>
          <p className="muted small">{t('help.draft', { d: POLICY_UPDATED })}</p>
        </header>

        <div className="help-layout">
          <nav className="help-toc" aria-label={t('help.eyebrow')}>
            {data.sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }); }}>{s.title}</a>
            ))}
          </nav>

          <div className="help-body">
            {data.sections.map((s) => (
              <div className="help-block reveal up" id={s.id} key={s.id}>
                <h2>{s.title}</h2>
                {s.items && <ul>{s.items.map((x, i) => <li key={i}>{x}</li>)}</ul>}
                {s.faq && s.faq.map((f) => (
                  <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
                ))}
              </div>
            ))}
            <div className="help-cta">
              <p className="serif big">{t('help.contactUs')}</p>
              <div className="hero-cta">
                <a className="btn btn-wa" href={waLink('Hi! I have a question.')} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /> {t('c.chat')}</a>
                <Link className="btn btn-ghost" to="/help/terms">{t('ft.terms')}</Link>
                <Link className="btn btn-ghost" to="/contact">{t('ft.contact')}</Link>
                <a className="btn btn-ghost" href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
