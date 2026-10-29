import { Link } from 'react-router-dom';
import { useTitle } from '../hooks/hooks';

export default function NotFound() {
  useTitle('Page not found');
  return (
    <section className="section page-top">
      <div className="container empty">
        <p className="eyebrow">404</p>
        <p className="serif big">We couldn&rsquo;t find that page.</p>
        <p className="muted">It may have moved, or the piece may no longer be in the collection.</p>
        <Link to="/shop" className="btn btn-light">Back to the shop</Link>
      </div>
    </section>
  );
}
