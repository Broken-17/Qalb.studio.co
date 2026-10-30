import { Link } from 'react-router-dom';
import { Ruler } from 'lucide-react';
import { WhatsAppIcon } from '../components/Icons';
import { store } from '../config/store';
import { useI18n } from '../i18n';
import { products } from '../lib/catalog';
import { waLink } from '../lib/whatsapp';
import { useTitle } from '../hooks/hooks';

export default function SizeGuide() {
  const { t, loc } = useI18n();
  useTitle(t('sg.eyebrow'));
  // a product can bring its own chart (sizeChart in info.js); show those too
  const custom = products.filter((p) => p.sizeChart && p.sizeChart.rows?.length);

  const Table = ({ chart }) => (
    <div className="table-wrap">
      <table>
        <thead><tr>{chart.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{chart.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );

  return (
    <section className="section page-top">
      <div className="container narrow">
        <header className="page-head">
          <p className="eyebrow">{t('sg.eyebrow')}</p>
          <h1>{t('sg.title')}</h1>
          <p className="muted">{t('sg.sub')}</p>
        </header>

        <Table chart={store.sizeChart} />
        <p className="muted small sg-note">{t('sg.note')}</p>

        {custom.map((p) => (
          <div key={p.slug} className="sg-custom">
            <h3><Link to={`/product/${p.slug}`}>{loc(p).name}</Link></h3>
            <Table chart={p.sizeChart} />
          </div>
        ))}

        <h2 className="sg-how"><Ruler size={22} /> {t('sg.how')}</h2>
        <div className="how-measure">
          {[1, 2, 3].map((i) => (
            <div key={i} className="how-step"><span className="how-no">{i}</span><h3>{t(`sg.h${i}`)}</h3><p>{t(`sg.d${i}`)}</p></div>
          ))}
        </div>
        <p className="sg-between">{t('sg.between')}</p>
        <a className="btn btn-wa" href={waLink('Hi! I need help choosing my size.')} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /> {t('sg.ask')}</a>
      </div>
    </section>
  );
}
