import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useTitle } from '../hooks/hooks';

export default function NotFound() {
  const { t } = useI18n();
  useTitle('404');
  return (
    <section className="section page-top">
      <div className="container empty">
        <p className="eyebrow">404</p>
        <p className="serif big">{t('nf.title')}</p>
        <p className="muted">{t('nf.hint')}</p>
        <Link to="/shop" className="btn btn-light">{t('nf.back')}</Link>
      </div>
    </section>
  );
}
