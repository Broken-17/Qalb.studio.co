import { Link } from 'react-router-dom';
import { money, percentOff } from '../lib/format';
import { useI18n } from '../i18n';

export default function ProductCard({ p: raw, i = 0 }) {
  const { t, loc, cat } = useI18n();
  const p = loc(raw);
  const off = percentOff(p.price, p.mrp);
  const price = money(p.price);
  return (
    <Link to={`/product/${p.slug}`} className="pcard" style={{ '--i': i }}>
      <div className="pimg">
        <img src={p.images[0]} alt={p.name} loading="lazy" />
        {p.images[1] && <img className="alt" src={p.images[1]} alt="" loading="lazy" aria-hidden="true" />}
        <div className="pbadges">
          {!p.inStock && <span className="pb dark">{t('card.sold')}</span>}
          {p.inStock && p.tags.includes('new') && <span className="pb">{t('card.new')}</span>}
          {off > 0 && <span className="pb ember">{t('card.off', { n: off })}</span>}
          {p.sample && <span className="pb sample">{t('card.sample')}</span>}
        </div>
      </div>
      <div className="pinfo">
        <h3>{p.name}</h3>
        <p className="pcat">{cat(p.category)}</p>
        <p className="pprice">
          {price ? <strong>{price}</strong> : <em>{t('card.ask')}</em>}
          {off > 0 && <s>{money(p.mrp)}</s>}
        </p>
      </div>
    </Link>
  );
}
