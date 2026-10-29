import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, HandHeart, Shirt, Sparkles } from 'lucide-react';
import Waves from '../components/Waves';
import ProductCard from '../components/ProductCard';
import { Countdown } from '../components/Extras';
import { InstagramIcon, WhatsAppIcon } from '../components/Icons';
import { site } from '../config/site';
import { categories, products } from '../lib/catalog';
import { waLink } from '../lib/whatsapp';
import { useTitle } from '../hooks/hooks';

const base = import.meta.env.BASE_URL;

const values = [
  { Icon: BadgeCheck, title: 'Honest pricing', text: 'Great-quality clothing at affordable prices, with honest pricing in every order.' },
  { Icon: Shirt, title: 'Made for today’s youth', text: 'Clothing inspired by our identity and the culture we’re part of.' },
  { Icon: HandHeart, title: 'Care in every order', text: 'Honest service and quality you can trust, from the first message to your door.' },
  { Icon: Sparkles, title: 'Faith meets street', text: 'Modern street style that truly represents Muslim youth.' },
];

export default function Home() {
  useTitle('');
  const featured = products.slice(0, 8);
  const marquee = [site.tagline, site.name, 'Faith', 'Street', 'Style', site.short + ' means heart'];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <Waves />
        <div className="hero-ar" lang="ar" aria-hidden="true">{site.arabic}</div>
        <div className="container hero-in">
          <p className="kicker reveal up">{site.tagline}</p>
          <h1 className="reveal up" style={{ '--d': '.08s' }}>
            Where faith<br />meets <span>street style.</span>
          </h1>
          <p className="hero-sub reveal up" style={{ '--d': '.16s' }}>{site.intro}</p>
          <div className="hero-cta reveal up" style={{ '--d': '.24s' }}>
            <Link to="/shop" className="btn btn-light">Shop the collection <ArrowRight size={18} /></Link>
            <Link to="/about" className="btn btn-ghost">Our story</Link>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i}>{m}<i>{'✦'}</i></span>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      {featured.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="sec-head reveal up">
              <div>
                <p className="eyebrow">The collection</p>
                <h2>Fresh pieces</h2>
              </div>
              <Link to="/shop" className="link-arrow">View all <ArrowRight size={16} /></Link>
            </div>
            <div className="pgrid">
              {featured.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}
            </div>
          </div>
        </section>
      )}

      {/* CATEGORIES */}
      {categories.length > 1 && (
        <section className="section tight">
          <div className="container">
            <div className="sec-head reveal up">
              <div>
                <p className="eyebrow">Browse</p>
                <h2>Shop by style</h2>
              </div>
            </div>
            <div className="cat-grid">
              {categories.map((c, i) => {
                const list = products.filter((p) => p.category === c);
                return (
                  <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`} className="cat reveal up" style={{ '--d': `${i * 0.06}s` }}>
                    <img src={list[0].images[0]} alt="" loading="lazy" />
                    <span className="cat-label">
                      <strong>{c}</strong>
                      <small>{list.length} {list.length === 1 ? 'piece' : 'pieces'}</small>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* VALUES */}
      <section className="section values">
        <div className="container">
          <div className="sec-head reveal up">
            <div>
              <p className="eyebrow">What we stand for</p>
              <h2>Your trust matters to us</h2>
            </div>
          </div>
          <div className="val-grid">
            {values.map(({ Icon, title, text }, i) => (
              <div className="val reveal up" style={{ '--d': `${i * 0.07}s` }} key={title}>
                <Icon size={30} strokeWidth={1.4} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HEART QUOTE */}
      <section className="section quote-band">
        <Waves className="flip" />
        <div className="container center reveal up">
          <p className="serif big">
            {site.short} (<span lang="ar">{site.arabic}</span>) means <em>heart.</em>
          </p>
          <p className="quote-sub">More than a name. It’s a feeling we hope you’ll carry in your heart.</p>
          <Link to="/about" className="btn btn-ghost">Read our story</Link>
        </div>
      </section>
    </>
  );
}
