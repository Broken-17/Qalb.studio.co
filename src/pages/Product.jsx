import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Minus, Plus, Share2, ShoppingBag, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { WhatsAppIcon } from '../components/Icons';
import { useCart } from '../context/CartContext';
import { hasHelp, help } from '../data/help';
import { getProduct, products } from '../lib/catalog';
import { money, percentOff } from '../lib/format';
import { quickBuyMessage, waLink, productUrl } from '../lib/whatsapp';
import { useTitle } from '../hooks/hooks';
import NotFound from './NotFound';

export default function Product() {
  const { slug } = useParams();
  const p = getProduct(slug);
  const { add, notify } = useCart();
  const [idx, setIdx] = useState(0);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [needSize, setNeedSize] = useState(false);
  const [zoom, setZoom] = useState(false);
  useTitle(p?.name);

  useEffect(() => {
    setIdx(0);
    setSize('');
    setQty(1);
    setNeedSize(false);
  }, [slug]);

  useEffect(() => {
    if (!zoom || !p) return undefined;
    const k = (e) => {
      if (e.key === 'Escape') setZoom(false);
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % p.images.length);
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + p.images.length) % p.images.length);
    };
    document.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', k);
      document.body.style.overflow = '';
    };
  }, [zoom, p]);

  if (!p) return <NotFound />;

  const off = percentOff(p.price, p.mrp);
  const needs = p.sizes.length > 0;
  const guard = () => {
    if (needs && !size) {
      setNeedSize(true);
      return false;
    }
    return true;
  };
  const addToBag = () => guard() && add(p.slug, size, qty);
  const buyNow = () => {
    if (!guard()) return;
    window.open(waLink(quickBuyMessage(p, size, qty)), '_blank', 'noopener');
  };
  const share = async () => {
    const url = productUrl(p.slug);
    try {
      if (navigator.share) await navigator.share({ title: p.name, url });
      else {
        await navigator.clipboard.writeText(url);
        notify('Link copied');
      }
    } catch {
      /* cancelled */
    }
  };
  const related = products.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 4);
  const go = (d) => setIdx((i) => (i + d + p.images.length) % p.images.length);

  return (
    <section className="section page-top">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <Link to={`/shop?category=${encodeURIComponent(p.category)}`}>{p.category}</Link>
        </nav>

        <div className="pdp">
          <div className="gallery">
            <div className="thumbs" role="tablist" aria-label="Product photos">
              {p.images.map((src, i) => (
                <button key={src} className={i === idx ? 'on' : ''} onClick={() => setIdx(i)} aria-label={`Photo ${i + 1}`} role="tab" aria-selected={i === idx}>
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
            <div className="stage">
              <button className="stage-img" onClick={() => setZoom(true)} aria-label="Enlarge photo">
                <img src={p.images[idx]} alt={`${p.name}, photo ${idx + 1}`} />
              </button>
              {p.images.length > 1 && (
                <>
                  <button className="st-btn l" onClick={() => go(-1)} aria-label="Previous photo"><ChevronLeft size={22} /></button>
                  <button className="st-btn r" onClick={() => go(1)} aria-label="Next photo"><ChevronRight size={22} /></button>
                </>
              )}
              {p.sample && <span className="pb sample stage-tag">Sample image</span>}
            </div>
          </div>

          <div className="buy">
            <p className="eyebrow">{p.category}</p>
            <h1>{p.name}</h1>
            <p className="bigprice">
              {money(p.price) ? <strong>{money(p.price)}</strong> : <em>Ask for price</em>}
              {off > 0 && (
                <>
                  <s>{money(p.mrp)}</s>
                  <span className="pb ember">{off}% off</span>
                </>
              )}
            </p>
            {p.price !== null && <p className="muted small">Inclusive of taxes. Shipping and payment are confirmed on WhatsApp.</p>}

            {p.description && <p className="desc">{p.description}</p>}

            {p.colors.length > 0 && (
              <p className="colors"><span>Colour</span> {p.colors.join(', ')}</p>
            )}

            {needs && (
              <div className={`sizes${needSize ? ' warn' : ''}`}>
                <div className="sizes-head">
                  <span>Size</span>
                  {hasHelp && help.sizeGuide.rows.length > 0 && <Link to="/help#size-guide">Size guide</Link>}
                </div>
                <div className="size-row" role="radiogroup" aria-label="Size">
                  {p.sizes.map((s) => (
                    <button key={s} role="radio" aria-checked={size === s} className={size === s ? 'on' : ''} onClick={() => { setSize(s); setNeedSize(false); }}>{s}</button>
                  ))}
                </div>
                {needSize && <p className="warn-msg">Please choose a size.</p>}
              </div>
            )}

            <div className="qty-row">
              <span>Quantity</span>
              <div className="qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease"><Minus size={16} /></button>
                <output>{qty}</output>
                <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase"><Plus size={16} /></button>
              </div>
            </div>

            {p.inStock ? (
              <div className="buy-btns">
                <button className="btn btn-light" onClick={addToBag}><ShoppingBag size={18} /> Add to bag</button>
                <button className="btn btn-wa" onClick={buyNow}><WhatsAppIcon size={18} /> Order on WhatsApp</button>
              </div>
            ) : (
              <div className="buy-btns">
                <a className="btn btn-wa" href={waLink(`Hi! Please let me know when "${p.name}" is back in stock.\n${productUrl(p.slug)}`)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={18} /> Notify me when back
                </a>
              </div>
            )}

            <button className="share" onClick={share}><Share2 size={16} /> Share this piece</button>

            {p.details.length > 0 && (
              <div className="details">
                <h2>Details</h2>
                <ul>{p.details.map((d) => <li key={d}>{d}</li>)}</ul>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="related">
            <div className="sec-head"><div><p className="eyebrow">You may also like</p><h2>More {p.category}</h2></div></div>
            <div className="pgrid">{related.map((r, i) => <ProductCard key={r.slug} p={r} i={i} />)}</div>
          </div>
        )}
      </div>

      {zoom && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setZoom(false)}>
          <button className="lb-close" aria-label="Close" onClick={() => setZoom(false)}><X size={26} /></button>
          {p.images.length > 1 && <button className="st-btn l" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous"><ChevronLeft size={26} /></button>}
          <img src={p.images[idx]} alt={p.name} onClick={(e) => e.stopPropagation()} />
          {p.images.length > 1 && <button className="st-btn r" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next"><ChevronRight size={26} /></button>}
        </div>
      )}
    </section>
  );
}
