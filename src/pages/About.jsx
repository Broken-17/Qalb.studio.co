import { Link } from 'react-router-dom';
import Waves from '../components/Waves';
import { site } from '../config/site';
import { rich, useI18n } from '../i18n';
import { story } from '../i18n/story';
import { useTitle } from '../hooks/hooks';

/* Brand story. Words live in src/i18n/story.js (English, Hindi, Urdu). */
export default function About() {
  const { t, lang } = useI18n();
  const s = story[lang] || story.en;
  useTitle(t('ab.eyebrow'));
  return (
    <>
      <section className="page-hero">
        <Waves />
        <div className="container">
          <p className="eyebrow">{t('ab.eyebrow')}</p>
          <h1>{t('ab.introducing')}<br /><span className="logo-inline">QALB <b lang="ar">{site.arabic}</b></span></h1>
          <p className="hero-sub">{rich(s.sub)}</p>
        </div>
      </section>

      <section className="section chapters">
        <div className="container narrow">
          <article className="chapter reveal up">
            <span className="ch-no">01<i /></span>
            <p className="lead">{s.c1}</p>
          </article>

          <article className="chapter reveal up">
            <span className="ch-no">02<i /></span>
            <h2>{s.c2t}</h2>
            {s.c2.map((x, i) => <p key={i}>{rich(x)}</p>)}
          </article>

          <article className="chapter reveal up">
            <span className="ch-no">03<i /></span>
            <h2>{s.c3t}</h2>
            {s.c3.map((x, i) => <p key={i}>{rich(x)}</p>)}
          </article>

          <article className="chapter family reveal up">
            <span className="ch-no">04<i /></span>
            <h2>{s.c4t}</h2>
            <p className="serif big">{s.c4a.replace('{ar}', site.arabic)} <em>{s.c4b}</em></p>
            {s.c4.map((x, i) => <p key={i}>{rich(x)}</p>)}
            <blockquote className="hadith">
              <p>{s.hadith}</p>
              <cite>{s.cite}</cite>
            </blockquote>
          </article>

          <div className="center reveal up">
            <Link to="/shop" className="btn btn-light">{t('ab.explore')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
