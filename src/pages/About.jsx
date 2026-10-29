import { Link } from 'react-router-dom';
import Waves from '../components/Waves';
import { site } from '../config/site';
import { useTitle } from '../hooks/hooks';

/* Brand story. Edit the words right here. */
export default function About() {
  useTitle('Our story');
  return (
    <>
      <section className="page-hero">
        <Waves />
        <div className="container">
          <p className="eyebrow">Our story</p>
          <h1>Introducing<br /><span className="logo-inline">QALB <b lang="ar">{site.arabic}</b></span></h1>
          <p className="hero-sub">
            <strong>QALB STUDIO</strong> is an Indian Muslim streetwear brand bringing faith and modern street style together.
          </p>
        </div>
      </section>

      <section className="section chapters">
        <div className="container narrow">
          <article className="chapter reveal up">
            <span className="ch-no">01<i /></span>
            <p className="lead">We create clothing for today&rsquo;s youth, inspired by our identity and the culture we&rsquo;re part of.</p>
          </article>

          <article className="chapter reveal up">
            <span className="ch-no">02<i /></span>
            <h2>Why {site.short} Studio</h2>
            <p>In India, there isn&rsquo;t a proper brand for <strong>Muslim streetwear</strong>.</p>
            <p>We started QALB STUDIO to fill that gap &mdash; clothing that connects with our identity and fits today&rsquo;s street style.</p>
            <p>We believe Muslim youth deserve streetwear that <strong>truly represents them</strong>.</p>
          </article>

          <article className="chapter reveal up">
            <span className="ch-no">03<i /></span>
            <h2>What we stand for</h2>
            <p>We believe every customer deserves honest service and quality they can trust.</p>
            <p>We&rsquo;ll always do our best to bring you great-quality clothing at affordable prices, with honest pricing and care in every order.</p>
            <p>Your trust matters to us, and we&rsquo;ll work hard to earn it.</p>
          </article>

          <article className="chapter family reveal up">
            <span className="ch-no">04<i /></span>
            <h2>Welcome to the Qalb family</h2>
            <p className="serif big">Qalb (<span lang="ar">{site.arabic}</span>) means <em>heart.</em></p>
            <p>Qalb is more than a name. It&rsquo;s a feeling we hope you&rsquo;ll carry in your heart.</p>
            <p><strong>To us, you&rsquo;re more than just a buyer. You&rsquo;re part of the Qalb family.</strong></p>
            <p>Thank you for being part of Qalb.</p>
            <blockquote className="hadith">
              <p>&ldquo;The believers, in their mutual love, mercy, and compassion, are like one body&hellip;&rdquo;</p>
              <cite>Al-Bukhari 6011</cite>
            </blockquote>
          </article>

          <div className="center reveal up">
            <Link to="/shop" className="btn btn-light">Explore the collection</Link>
          </div>
        </div>
      </section>
    </>
  );
}
