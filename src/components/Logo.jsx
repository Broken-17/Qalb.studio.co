import { Link } from 'react-router-dom';
import { site } from '../config/site';

const base = import.meta.env.BASE_URL;

/* Uses your real logo file if site.logo is set, otherwise a clean wordmark. */
export default function Logo({ size = 'md' }) {
  return (
    <Link to="/" className={`logo logo-${size}`} aria-label={`${site.name} home`}>
      {site.logo ? (
        <img src={`${base}${site.logo}`} alt={site.name} />
      ) : (
        <>
          <span className="logo-main">
            <span className="logo-latin">QALB</span>
            <span className="logo-ar" lang="ar" dir="rtl">{site.arabic}</span>
          </span>
          <span className="logo-sub"><i />STUDIO<i /></span>
        </>
      )}
    </Link>
  );
}
