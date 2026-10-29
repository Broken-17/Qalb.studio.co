import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { WhatsAppIcon } from '../components/Icons';
import { useCart } from '../context/CartContext';
import { money } from '../lib/format';
import { orderMessage, waLink } from '../lib/whatsapp';
import { useTitle } from '../hooks/hooks';
import { useState } from 'react';

export default function Cart() {
  const { lines, total, allPriced, setQty, remove, clear, count } = useCart();
  useTitle('Your bag');
  const [promo, setPromo] = useState('');
  const [language, setLanguage] = useState('English');
  const [promoMessage, setPromoMessage] = useState('');
  const promoCodes = { QALB10: 10 };
  const discountRate = promoCodes[promo.trim().toUpperCase()] || 0;
  const discount = allPriced ? Math.round(total * discountRate / 100) : 0;
  const discountedTotal = Math.max(0, total - discount);

  if (!lines.length) {
    return (
      <section className="section page-top">
        <div className="container empty">
          <p className="eyebrow">Your bag</p>
          <p className="serif big">Your bag is empty.</p>
          <p className="muted">Find something you love and add it here.</p>
          <Link to="/shop" className="btn btn-light">Start shopping</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section page-top">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">Your bag</p>
          <h1>{count} {count === 1 ? 'item' : 'items'}</h1>
        </header>

        <div className="cart-grid">
          <ul className="cart-list">
            {lines.map((l) => (
              <li key={l.key} className="cart-line">
                <Link to={`/product/${l.product.slug}`} className="cl-img"><img src={l.product.images[0]} alt={l.product.name} /></Link>
                <div className="cl-main">
                  <Link to={`/product/${l.product.slug}`}><h3>{l.product.name}</h3></Link>
                  <p className="muted small">{l.size ? `Size ${l.size}` : l.product.category}</p>
                  <div className="qty sm">
                    <button onClick={() => setQty(l.key, l.qty - 1)} aria-label="Decrease"><Minus size={14} /></button>
                    <output>{l.qty}</output>
                    <button onClick={() => setQty(l.key, l.qty + 1)} aria-label="Increase"><Plus size={14} /></button>
                  </div>
                </div>
                <div className="cl-side">
                  <strong>{typeof l.product.price === 'number' ? money(l.product.price * l.qty) : 'Ask'}</strong>
                  <button className="icon-btn" onClick={() => remove(l.key)} aria-label={`Remove ${l.product.name}`}><Trash2 size={18} /></button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="summary">
            <h2>Order summary</h2>
            {allPriced && (
              <div className="sum-row"><span>Subtotal</span><strong>{money(total)}</strong></div>
            )}
            <div className="sum-row"><label htmlFor="order-language">Preferred language</label>
              <select id="order-language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option>English</option><option>Hindi</option><option>Urdu</option>
              </select>
            </div>
            <div className="promo-entry">
              <label htmlFor="promo-code">Promo code</label>
              <div className="promo-row"><input id="promo-code" value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Enter code" />
                <button className="btn btn-ghost" type="button" onClick={() => setPromoMessage(discountRate ? `Applied ${discountRate}% discount.` : 'That code is not valid right now.')}>Apply</button>
              </div>
              {promoMessage && <p className="muted small" role="status">{promoMessage}</p>}
              <p className="muted small">Demo code: QALB10 (10% off). Configure or disable this code before launch.</p>
            </div>
            {discountRate > 0 && allPriced && <div className="sum-row"><span>Promo discount</span><strong>−{money(discount)}</strong></div>}
            {allPriced && <div className="sum-row"><span>Total before shipping</span><strong>{money(discountedTotal)}</strong></div>}
            <p className="muted small">
              Delivery PIN code, any COD shipping advance, balance payable and final delivery charge are confirmed with you on WhatsApp before dispatch. Preferred language: {language}.
            </p>
            <a className="btn btn-wa block" href={waLink(orderMessage(lines) + '\nPreferred language: ' + language + (discountRate ? '\nPromo code: ' + promo.trim().toUpperCase() + ' (' + discountRate + '% off, estimated subtotal discount ' + money(discount) + ')' : '') + '\nPlease confirm serviceability, COD advance, shipping and final payable amount.')} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} /> Order on WhatsApp
            </a>
            <Link to="/shop" className="btn btn-ghost block">Continue shopping</Link>
            <button className="clear-bag" onClick={clear}>Empty bag</button>
          </aside>
        </div>
      </div>
    </section>
  );
}
