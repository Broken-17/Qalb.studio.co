import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { allSizes, categories, products } from '../lib/catalog';
import { useTitle } from '../hooks/hooks';

const sorts = {
  featured: ['Featured', (a, b) => a.order - b.order],
  low: ['Price: low to high', (a, b) => (a.price ?? 1e9) - (b.price ?? 1e9)],
  high: ['Price: high to low', (a, b) => (b.price ?? -1) - (a.price ?? -1)],
  az: ['Name: A to Z', (a, b) => a.name.localeCompare(b.name)],
};

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const category = params.get('category') || '';
  const size = params.get('size') || '';
  const sort = sorts[params.get('sort')] ? params.get('sort') : 'featured';
  useTitle(category || 'Shop');

  const set = (k, v) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v);
    else next.delete(k);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return products
      .filter((p) => !category || p.category === category)
      .filter((p) => !size || p.sizes.includes(size))
      .filter((p) => !t || [p.name, p.category, p.description, ...p.tags, ...p.colors].join(' ').toLowerCase().includes(t))
      .sort(sorts[sort][1]);
  }, [q, category, size, sort]);

  const active = q || category || size;

  return (
    <section className="section page-top">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">Shop</p>
          <h1>{category || 'All pieces'}</h1>
          <p className="muted">{products.length} {products.length === 1 ? 'piece' : 'pieces'} in the collection</p>
        </header>

        <div className="toolbar">
          <label className="search-field">
            <Search size={16} />
            <input value={q} onChange={(e) => set('q', e.target.value)} placeholder="Search products" aria-label="Search products" />
          </label>

          <div className="chips" role="group" aria-label="Categories">
            <button className={!category ? 'on' : ''} onClick={() => set('category', '')}>All</button>
            {categories.map((c) => (
              <button key={c} className={category === c ? 'on' : ''} onClick={() => set('category', c)}>{c}</button>
            ))}
          </div>

          <div className="selects">
            {allSizes.length > 0 && (
              <select value={size} onChange={(e) => set('size', e.target.value)} aria-label="Filter by size">
                <option value="">All sizes</option>
                {allSizes.map((s) => <option key={s}>{s}</option>)}
              </select>
            )}
            <select value={sort} onChange={(e) => set('sort', e.target.value === 'featured' ? '' : e.target.value)} aria-label="Sort">
              {Object.entries(sorts).map(([k, [label]]) => <option key={k} value={k}>{label}</option>)}
            </select>
          </div>
        </div>

        <p className="result-line">
          {list.length} {list.length === 1 ? 'result' : 'results'}
          {active && (
            <button className="clear" onClick={() => setParams({}, { replace: true })}><X size={14} /> Clear filters</button>
          )}
        </p>

        {list.length ? (
          <div className="pgrid" key={`${q}|${category}|${size}|${sort}`}>
            {list.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}
          </div>
        ) : (
          <div className="empty">
            <p className="serif big">Nothing matches that.</p>
            <p className="muted">Try another search, or clear your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
