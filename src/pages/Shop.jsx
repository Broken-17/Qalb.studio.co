import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useI18n } from '../i18n';
import { allSizes, categories, products } from '../lib/catalog';
import { useTitle } from '../hooks/hooks';

const sorts = {
  featured: (a, b) => a.order - b.order,
  low: (a, b) => (a.price ?? 1e9) - (b.price ?? 1e9),
  high: (a, b) => (b.price ?? -1) - (a.price ?? -1),
  az: (a, b) => a.name.localeCompare(b.name),
};

export default function Shop() {
  const { t, cat, loc } = useI18n();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') || '';
  const category = params.get('category') || '';
  const size = params.get('size') || '';
  const sort = sorts[params.get('sort')] ? params.get('sort') : 'featured';
  useTitle(category ? cat(category) : t('nav.shop'));

  const set = (k, v) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v);
    else next.delete(k);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return products
      .filter((p) => !category || p.category === category)
      .filter((p) => !size || p.sizes.includes(size))
      .filter((p) => {
        if (!s) return true;
        const hay = [p.name, p.category, p.description, ...p.tags, ...p.colors, ...Object.values(p.translations || {}).flatMap((x) => [x.name, x.description])];
        return hay.join(' ').toLowerCase().includes(s);
      })
      .sort(sorts[sort]);
  }, [q, category, size, sort]);

  const active = q || category || size;

  return (
    <section className="section page-top">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">{t('shop.eyebrow')}</p>
          <h1>{category ? cat(category) : t('shop.all')}</h1>
          <p className="muted">{t('shop.count', { n: products.length })}</p>
        </header>

        <div className="toolbar">
          <label className="search-field">
            <Search size={16} />
            <input value={q} onChange={(e) => set('q', e.target.value)} placeholder={t('shop.search')} aria-label={t('shop.search')} />
          </label>

          <div className="chips" role="group">
            <button className={!category ? 'on' : ''} onClick={() => set('category', '')}>{t('shop.allChip')}</button>
            {categories.map((c) => (
              <button key={c} className={category === c ? 'on' : ''} onClick={() => set('category', c)}>{cat(c)}</button>
            ))}
          </div>

          <div className="selects">
            {allSizes.length > 0 && (
              <select value={size} onChange={(e) => set('size', e.target.value)} aria-label={t('pdp.size')}>
                <option value="">{t('shop.allSizes')}</option>
                {allSizes.map((s) => <option key={s}>{s}</option>)}
              </select>
            )}
            <select value={sort} onChange={(e) => set('sort', e.target.value === 'featured' ? '' : e.target.value)} aria-label="Sort">
              {Object.keys(sorts).map((k) => <option key={k} value={k}>{t(`sort.${k}`)}</option>)}
            </select>
          </div>
        </div>

        <p className="result-line">
          {t(list.length === 1 ? 'shop.result' : 'shop.results', { n: list.length })}
          {active && (
            <button className="clear" onClick={() => setParams({}, { replace: true })}><X size={14} /> {t('shop.clear')}</button>
          )}
        </p>

        {list.length ? (
          <div className="pgrid" key={`${q}|${category}|${size}|${sort}`}>
            {list.map((p, i) => <ProductCard key={p.slug} p={p} i={i} />)}
          </div>
        ) : (
          <div className="empty">
            <p className="serif big">{t('shop.none')}</p>
            <p className="muted">{t('shop.noneHint')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
