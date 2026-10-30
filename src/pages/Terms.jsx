import { Link } from 'react-router-dom';
import { Video } from 'lucide-react';
import { useI18n } from '../i18n';
import { POLICY_UPDATED } from '../i18n/policies';
import { terms } from '../i18n/terms';
import { useTitle } from '../hooks/hooks';

export default function Terms() {
  const { t, lang } = useI18n();
  useTitle(t('terms.eyebrow'));
  const sections = terms(lang);
  return (
    <section className="section page-top">
      <div className="container help">
        <header className="page-head">
          <p className="eyebrow">{t('terms.eyebrow')}</p>
          <h1>{t('terms.title')}</h1>
          <p className="muted">{t('terms.sub')}</p>
          <p className="muted small">{t('terms.updated', { d: POLICY_UPDATED })}</p>
        </header>
        <div className="help-layout">
          <nav className="help-toc" aria-label={t('terms.eyebrow')}>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }); }}>{s.title}</a>
            ))}
          </nav>
          <div className="help-body">
            {sections.map((s) => (
              <div className={`help-block reveal up${s.id === 'video' ? ' highlight' : ''}`} id={s.id} key={s.id}>
                <h2>{s.id === 'video' && <Video size={22} />} {s.title}</h2>
                <ul>{s.items.map((x, i) => <li key={i}>{x}</li>)}</ul>
              </div>
            ))}
            <Link className="btn btn-ghost" to="/help">{t('terms.toHelp')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
