import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, HandHeart, MapPin, MessageCircle, Shirt, ShoppingBag, Sparkles, Wallet } from 'lucide-react';
import Waves from '../components/Waves';
import ProductCard from '../components/ProductCard';
import { InstagramIcon } from '../components/Icons';
import { site } from '../config/site';
import { useI18n } from '../i18n';
import { categories, products } from '../lib/catalog';
import { useTitle } from '../hooks/hooks';

const valueIcons = [BadgeCheck, Shirt, HandHeart, Sparkles];
const howIcons = [ShoppingBag, MapPin, MessageCircle, Wallet];

export default function Home() {
  const { t, cat } = useI18n();
  useTitle('');
  const featured = products.slice(0, 8);
  const marquee = [t('marq.0'), site.tagline, site.name, t('marq.1'), t('marq.2'), t('marq.3'), t('marq.4')];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <Waves />
        <div className="hero-ar" lang="ar" aria-hidden="true">{site.arabic}</div>
        <div className="container hero-in">
          <p className="kicker reveal up">{site.tagline}</p>
          <h1 className="reveal up" style={{ '--d': '.08s' }}>
            {t('hero.l1')}<br />{t('hero.l2')} <span>{t('hero.em')}</span>
          </h1>
          <p className="hero-sub reveal up" style={{ '--d': '.16s' }}>{site.intro}</p>
          <div className="hero-cta reveal up" style={{ '--d': '.24s' }}>
            <Link to="/shop" className="btn btn-light">{t('hero.shop')} <ArrowRight size={18} className="flip-rtl" /></Link>
            <Link to="/about" className="btn btn-ghost">{t('hero.story')}</Link>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i} className={i % marquee.length === 0 ? 'slogan' : ''}>{m}<i>{'✦'}</i></span>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      {featured.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="sec-head reveal up">
              <div>
                <p className="eyebrow">{t('home.collection')}</p>
                <h2>{t('home.fresh')}</h2>
              </div>
              <Link to="/shop" className="link-arrow">{t('home.viewAll')} <ArrowRight size={16} className="flip-rtl" /></Link>
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
                <p className="eyebrow">{t('home.browse')}</p>
                <h2>{t('home.byStyle')}</h2>
              </div>
            </div>
            <div className="cat-grid">
              {categories.map((c, i) => {
                const list = products.filter((p) => p.category === c);
                return (
                  <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`} className="cat reveal up" style={{ '--d': `${i * 0.06}s` }}>
                    <img src={list[0].images[0]} alt="" loading="lazy" />
                    <span className="cat-label">
                      <strong>{cat(c)}</strong>
                      <small>{t(list.length === 1 ? 'piece' : 'pieces', { n: list.length })}</small>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* HOW ORDERING WORKS */}
      <section className="section how">
        <div className="container">
          <div className="sec-head reveal up">
            <div>
              <p className="eyebrow">{t('home.how')}</p>
              <h2>{t('home.howTitle')}</h2>
            </div>
          </div>
          <div className="how-grid">
            {howIcons.map((Icon, i) => (
              <div className="how-step reveal up" style={{ '--d': `${i * 0.08}s` }} key={i}>
                <span className="how-no">{i + 1}</span>
                <Icon size={28} strokeWidth={1.4} />
                <h3>{t(`how.${i + 1}t`)}</h3>
                <p>{t(`how.${i + 1}d`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section values">
        <div className="container">
          <div className="sec-head reveal up">
            <div>
              <p className="eyebrow">{t('home.stand')}</p>
              <h2>{t('home.trust')}</h2>
            </div>
          </div>
          <div className="val-grid">
            {valueIcons.map((Icon, i) => (
              <div className="val reveal up" style={{ '--d': `${i * 0.07}s` }} key={i}>
                <Icon size={30} strokeWidth={1.4} />
                <h3>{t(`val.${i + 1}t`)}</h3>
                <p>{t(`val.${i + 1}d`)}</p>
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
            {site.short} (<span lang="ar">{site.arabic}</span>) {t('home.heart')} <em>{t('home.heartEm')}</em>
          </p>
          <p className="quote-sub">{t('home.heartSub')}</p>
          <Link to="/about" className="btn btn-ghost">{t('home.readStory')}</Link>
        </div>
      </section>

      {/* INSTAGRAM */}
      {site.instagram && (
        <section className="section ig-band">
          <div className="container center reveal up">
            <InstagramIcon size={34} />
            <h2>{t('home.igTitle')}</h2>
            <p className="muted">{t('home.igText')}</p>
            <a className="btn btn-light" href={`https://www.instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer">
              <InstagramIcon size={18} /> {t('home.igBtn')} · @{site.instagram}
            </a>
          </div>
        </section>
      )}
    </>
  );
}
