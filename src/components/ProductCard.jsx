import { Link } from 'react-router-dom';
import { money, percentOff } from '../lib/format';

export default function ProductCard({ p, i = 0 }) {
  const off = percentOff(p.price, p.mrp);
  const price = money(p.price);
  return (
    <Link to={`/product/${p.slug}`} className="pcard" style={{ '--i': i }}>
      <div className="pimg">
        <img src={p.images[0]} alt={p.name} loading="lazy" />
        {p.images[1] && <img className="alt" src={p.images[1]} alt="" loading="lazy" aria-hidden="true" />}
        <div className="pbadges">
          {!p.inStock && <span className="pb dark">Sold out</span>}
          {p.inStock && p.tags.includes('new') && <span className="pb">New</span>}
          {off > 0 && <span className="pb ember">{off}% off</span>}
          {p.sample && <span className="pb sample">Sample</span>}
        </div>
      </div>
      <div className="pinfo">
        <h3>{p.name}</h3>
        <p className="pcat">{p.category}</p>
        <p className="pprice">
          {price ? <strong>{price}</strong> : <em>Ask for price</em>}
          {off > 0 && <s>{money(p.mrp)}</s>}
        </p>
      </div>
    </Link>
  );
}
