import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Banknote, Check, Minus, Plus, Smartphone, Tag, Trash2 } from 'lucide-react';
import { WhatsAppIcon } from '../components/Icons';
import { useCart } from '../context/CartContext';
import { areaList, areaName, areaForPincode, store } from '../config/store';
import { LANGS, useI18n } from '../i18n';
import { money } from '../lib/format';
import { price } from '../lib/pricing';
import { orderMessage, waLink } from '../lib/whatsapp';
import { useTitle } from '../hooks/hooks';

export default function Cart() {
  const { t, lang, loc } = useI18n();
  const { lines, total, allPriced, setQty, remove, clear, count, checkout, setCheckout, promoCode, setPromoCode } = useCart();
  const [promoInput, setPromoInput] = useState(promoCode);
  const [promoTried, setPromoTried] = useState(Boolean(promoCode));
  useTitle(t('bag.title'));

  const mode = checkout.mode === 'prepaid' && store.prepaid.enabled ? 'prepaid' : store.cod.enabled ? 'cod' : 'prepaid';
  const replyLang = checkout.replyLang || lang;
  const p = useMemo(() => price({ subtotal: total, promoCode, mode, hasLines: lines.length > 0 }), [total, promoCode, mode, lines.length]);

  const pinClean = checkout.pin.trim();
  const area = areaForPincode(pinClean);
  const pinState = pinClean.length < 6 ? 'idle' : !/^[1-9][0-9]{5}$/.test(pinClean) ? 'bad' : area ? 'ok' : 'no';
  const phoneDigits = checkout.phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
  const valid =
    checkout.name.trim().length >= 2 &&
    /^[6-9]\d{9}$/.test(phoneDigits) &&
    checkout.address.trim().length >= 8 &&
    pinState === 'ok' &&
    allPriced;

  const applyPromo = (e) => {
    e.preventDefault();
    setPromoCode(promoInput.trim());
    setPromoTried(true);
  };
  const promoMsg =
    promoTried && promoCode
      ? p.promo
        ? { ok: true, text: t('co.promoOk', { amt: money(p.discount) }) }
        : { ok: false, text: t(p.promoError === 'expired' ? 'co.promoExpired' : p.promoError === 'min' ? 'co.promoMin' : 'co.promoInvalid', { amt: money(p.promoMin || 0) }) }
      : null;

  if (!lines.length) {
    return (
      <section className="section page-top">
        <div className="container empty">
          <p className="eyebrow">{t('bag.title')}</p>
          <p className="serif big">{t('bag.empty')}</p>
          <p className="muted">{t('bag.emptyHint')}</p>
          <Link to="/shop" className="btn btn-light">{t('bag.start')}</Link>
        </div>
      </section>
    );
  }

  const message = orderMessage(lines, { ...checkout, phone: checkout.phone.trim(), area, mode, replyLang }, p);
  const askArea = waLink(`Hi! I'd like to order from Qalb Studio, but my pincode ${pinClean} is outside your delivery area. Please let me know when you deliver there.`);

  return (
    <section className="section page-top">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">{t('bag.title')}</p>
          <h1>{t(count === 1 ? 'bag.item' : 'bag.items', { n: count })}</h1>
        </header>

        <div className="cart-grid">
          <div>
            <ul className="cart-list">
              {lines.map((l) => {
                const lp = loc(l.product);
                return (
                  <li key={l.key} className="cart-line">
                    <Link to={`/product/${l.product.slug}`} className="cl-img"><img src={l.product.images[0]} alt={lp.name} /></Link>
                    <div className="cl-main">
                      <Link to={`/product/${l.product.slug}`}><h3>{lp.name}</h3></Link>
                      <p className="muted small">{l.size ? t('bag.size', { s: l.size }) : ''}</p>
                      <div className="qty sm">
                        <button data-tip={t('tip.minus')} onClick={() => setQty(l.key, l.qty - 1)} aria-label={t('tip.minus')}><Minus size={14} /></button>
                        <output>{l.qty}</output>
                        <button data-tip={t('tip.plus')} onClick={() => setQty(l.key, l.qty + 1)} aria-label={t('tip.plus')}><Plus size={14} /></button>
                      </div>
                    </div>
                    <div className="cl-side">
                      <strong>{typeof l.product.price === 'number' ? money(l.product.price * l.qty) : t('bag.askPrice')}</strong>
                      <button className="icon-btn" data-tip={t('tip.remove')} onClick={() => remove(l.key)} aria-label={t('tip.remove')}><Trash2 size={18} /></button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* DELIVERY DETAILS */}
            <form className="form checkout" onSubmit={(e) => e.preventDefault()}>
              <h2>{t('co.title')}</h2>
              <div className="row">
                <label><span>{t('co.name')} *</span><input value={checkout.name} onChange={(e) => setCheckout({ name: e.target.value })} autoComplete="name" /></label>
                <label><span>{t('co.phone')} *</span><input value={checkout.phone} onChange={(e) => setCheckout({ phone: e.target.value })} inputMode="tel" autoComplete="tel" dir="ltr" placeholder="98765 43210" /></label>
              </div>
              <label><span>{t('co.address')} *</span><textarea rows={3} value={checkout.address} onChange={(e) => setCheckout({ address: e.target.value })} autoComplete="street-address" /></label>
              <div className="row">
                <label><span>{t('co.city')}</span><input value={checkout.city} onChange={(e) => setCheckout({ city: e.target.value })} autoComplete="address-level2" /></label>
                <label><span>{t('co.pin')} *</span><input value={checkout.pin} onChange={(e) => setCheckout({ pin: e.target.value.replace(/\D/g, '').slice(0, 6) })} inputMode="numeric" autoComplete="postal-code" dir="ltr" placeholder="530001" /></label>
              </div>
              {pinState === 'ok' && <p className="status ok"><Check size={15} /> {t('co.pinOk', { area: areaName(area, lang), days: area.days })}</p>}
              {pinState === 'no' && (
                <p className="status error">{t('co.pinNo', { areas: areaList(lang) })} <a href={askArea} target="_blank" rel="noopener noreferrer">{t('co.pinNotify')}</a></p>
              )}
              {pinState === 'bad' && <p className="status error">{t('co.pinBad')}</p>}

              <label><span>{t('co.notes')}</span><input value={checkout.notes} onChange={(e) => setCheckout({ notes: e.target.value })} /></label>
              <label>
                <span>{t('co.lang')}</span>
                <select value={replyLang} onChange={(e) => setCheckout({ replyLang: e.target.value })}>
                  {LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
                </select>
              </label>
            </form>
          </div>

          <aside className="summary">
            <h2>{t('bag.summary')}</h2>

            {/* payment choice */}
            <fieldset className="pay">
              <legend>{t('co.payment')}</legend>
              {store.cod.enabled && (
                <label className={`pay-opt${mode === 'cod' ? ' on' : ''}`}>
                  <input type="radio" name="pay" checked={mode === 'cod'} onChange={() => setCheckout({ mode: 'cod' })} />
                  <Banknote size={20} />
                  <span>
                    <strong>{t('co.cod')}</strong>
                    <small>
                      {p.advance || (mode !== 'cod' && store.cod.advance)
                        ? t('co.codD', {
                            adv: money(mode === 'cod' ? p.advance : Math.min(store.cod.advance, p.total)),
                            bal: money(mode === 'cod' ? p.balance : p.total - Math.min(store.cod.advance, p.total)),
                          })
                        : t('co.codNoAdv')}
                    </small>
                  </span>
                </label>
              )}
              {store.prepaid.enabled && (
                <label className={`pay-opt${mode === 'prepaid' ? ' on' : ''}`}>
                  <input type="radio" name="pay" checked={mode === 'prepaid'} onChange={() => setCheckout({ mode: 'prepaid' })} />
                  <Smartphone size={20} />
                  <span><strong>{t('co.prepaid')}</strong><small>{t('co.prepaidD', { tot: money(p.total) })}</small></span>
                </label>
              )}
            </fieldset>
            {mode === 'cod' && p.advance > 0 && <p className="muted small">{t('co.advWhy')}</p>}

            {/* promo */}
            <form className="promo-entry" onSubmit={applyPromo}>
              <label htmlFor="promo-code"><Tag size={14} /> {t('co.promo')}</label>
              <div className="promo-row">
                <input id="promo-code" value={promoInput} onChange={(e) => setPromoInput(e.target.value.toUpperCase())} placeholder={t('co.promoPh')} dir="ltr" autoCapitalize="characters" />
                <button className="btn btn-ghost" type="submit">{t('co.apply')}</button>
              </div>
              {promoMsg && <p className={`status ${promoMsg.ok ? 'ok' : 'error'}`} role="status">{promoMsg.text}</p>}
            </form>

            {allPriced ? (
              <div className="sums">
                <div className="sum-row"><span>{t('bag.subtotal')}</span><strong>{money(p.subtotal)}</strong></div>
                {p.discount > 0 && <div className="sum-row disc"><span>{t('bag.discount')} ({p.promo.code})</span><strong>−{money(p.discount)}</strong></div>}
                <div className="sum-row"><span>{t('bag.shipping')}</span><strong>{p.shipping ? money(p.shipping) : t('bag.free')}</strong></div>
                <div className="sum-row total"><span>{t('bag.total')}</span><strong>{money(p.total)}</strong></div>
                {mode === 'cod' && p.advance > 0 ? (
                  <>
                    <div className="sum-row pay-now"><span>{t('bag.payNow')}</span><strong>{money(p.advance)}</strong></div>
                    <div className="sum-row"><span>{t('bag.balance')}</span><strong>{money(p.balance)}</strong></div>
                  </>
                ) : mode === 'prepaid' ? (
                  <div className="sum-row pay-now"><span>{t('bag.payNowFull')}</span><strong>{money(p.total)}</strong></div>
                ) : (
                  <div className="sum-row"><span>{t('bag.balance')}</span><strong>{money(p.total)}</strong></div>
                )}
              </div>
            ) : (
              <p className="muted small">{t('card.ask')}</p>
            )}

            {store.cod.upiId && p.payNow > 0 && <p className="muted small">{t('co.upi', { upi: store.cod.upiId })}</p>}

            {valid ? (
              <a className="btn btn-wa block" href={waLink(message)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} /> {t('co.place')}
              </a>
            ) : (
              <>
                <button className="btn btn-wa block" disabled>
                  <WhatsAppIcon size={18} /> {t('co.place')}
                </button>
                <p className="muted small">{t('co.fill')}</p>
              </>
            )}
            <p className="muted small">{t('co.note')}</p>
            <Link to="/shop" className="btn btn-ghost block">{t('bag.continue')}</Link>
            <button className="clear-bag" onClick={clear}>{t('bag.clear')}</button>
          </aside>
        </div>
      </div>
    </section>
  );
}
