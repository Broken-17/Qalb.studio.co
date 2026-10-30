import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useI18n } from '../i18n';
import { money } from '../lib/format';

/* Slide-out bag, opens when something is added or the bag icon is pressed. */
export default function CartDrawer() {
  const { lines, total, allPriced, count, drawer, closeDrawer, setQty, remove } = useCart();
  const { t, loc } = useI18n();
  const { pathname } = useLocation();
  useEffect(() => { closeDrawer(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`drawer-wrap${drawer ? ' open' : ''}`} aria-hidden={!drawer}>
      <div className="drawer-scrim" onClick={closeDrawer} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={t('drawer.title')}>
        <header className="drawer-head">
          <h2><ShoppingBag size={20} /> {t('drawer.title')} <span>({count})</span></h2>
          <button className="icon-btn" data-tip={t('tip.close')} aria-label={t('tip.close')} onClick={closeDrawer}><X size={20} /></button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p className="serif big">{t('bag.empty')}</p>
            <p className="muted">{t('bag.emptyHint')}</p>
            <Link to="/shop" className="btn btn-light" onClick={closeDrawer}>{t('bag.start')}</Link>
          </div>
        ) : (
          <>
            <ul className="drawer-list">
              {lines.map((l) => {
                const p = loc(l.product);
                return (
                  <li key={l.key} className="d-line">
                    <Link to={`/product/${l.product.slug}`} onClick={closeDrawer} className="d-img"><img src={l.product.images[0]} alt={p.name} /></Link>
                    <div className="d-main">
                      <Link to={`/product/${l.product.slug}`} onClick={closeDrawer}><h3>{p.name}</h3></Link>
                      {l.size && <p className="muted small">{t('bag.size', { s: l.size })}</p>}
                      <div className="qty sm">
                        <button data-tip={t('tip.minus')} aria-label={t('tip.minus')} onClick={() => setQty(l.key, l.qty - 1)}><Minus size={13} /></button>
                        <output>{l.qty}</output>
                        <button data-tip={t('tip.plus')} aria-label={t('tip.plus')} onClick={() => setQty(l.key, l.qty + 1)}><Plus size={13} /></button>
                      </div>
                    </div>
                    <div className="d-side">
                      <strong>{typeof l.product.price === 'number' ? money(l.product.price * l.qty) : t('bag.askPrice')}</strong>
                      <button className="icon-btn" data-tip={t('tip.remove')} aria-label={t('tip.remove')} onClick={() => remove(l.key)}><Trash2 size={16} /></button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <footer className="drawer-foot">
              {allPriced && <div className="sum-row"><span>{t('bag.subtotal')}</span><strong>{money(total)}</strong></div>}
              <p className="muted small">{t('drawer.hint')}</p>
              <Link to="/cart" className="btn btn-light block" onClick={closeDrawer}>{t('drawer.checkout')}</Link>
              <button className="btn btn-ghost block" onClick={closeDrawer}>{t('bag.continue')}</button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
