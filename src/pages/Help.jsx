import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { help } from '../data/help';
import { useTitle } from '../hooks/hooks';

export default function Help() {
  useTitle('Help');
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);
  const g = help.sizeGuide;

  return (
    <section className="section page-top">
      <div className="container narrow">
        <header className="page-head"><p className="eyebrow">Help</p><h1>Shipping, returns &amp; sizing</h1></header>

        {help.shipping.length > 0 && (
          <div className="help-block"><h2>Shipping</h2><ul>{help.shipping.map((t) => <li key={t}>{t}</li>)}</ul></div>
        )}
        {help.returns.length > 0 && (
          <div className="help-block"><h2>Returns &amp; exchanges</h2><ul>{help.returns.map((t) => <li key={t}>{t}</li>)}</ul></div>
        )}
        {g.rows.length > 0 && (
          <div className="help-block" id="size-guide">
            <h2>Size guide</h2>
            {g.note && <p className="muted">{g.note}</p>}
            <div className="table-wrap">
              <table>
                <thead><tr>{g.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>{g.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </div>
        )}
        {help.faqs.length > 0 && (
          <div className="help-block">
            <h2>FAQs</h2>
            {help.faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
