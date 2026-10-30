import { useState } from 'react';
import { Check } from 'lucide-react';
import { WhatsAppIcon } from '../components/Icons';
import { store } from '../config/store';
import { LANGS, useI18n } from '../i18n';
import { sendEnquiry } from '../lib/enquiry';
import { waLink } from '../lib/whatsapp';
import { useTitle } from '../hooks/hooks';

const LANG_NAME = { en: 'English', hi: 'Hindi', ur: 'Urdu' };

export default function Wholesale() {
  const { t, lang } = useI18n();
  useTitle(t('ws.eyebrow'));
  const blank = { name: '', business: '', city: '', phone: '', email: '', quantity: '', reply: lang, message: '', botcheck: '' };
  const [form, setForm] = useState(blank);
  const [state, setState] = useState({ s: 'idle', msg: '' });
  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.botcheck) return;
    setState({ s: 'sending', msg: '' });
    try {
      const { botcheck, reply, ...data } = form;
      const mode = await sendEnquiry({ topic: 'Wholesale enquiry', ...data, preferred_reply_language: LANG_NAME[reply] });
      setState({ s: 'ok', msg: mode === 'sent' ? t('f.sent') : t('f.mailto') });
      if (mode === 'sent') setForm(blank);
    } catch {
      setState({ s: 'error', msg: t('f.fail') });
    }
  };

  const wa = waLink(`Hi Qalb Studio, I'm interested in wholesale.\nName: ${form.name}\nBusiness: ${form.business}\nCity: ${form.city}\nApprox. pieces: ${form.quantity}\nPlease reply in: ${LANG_NAME[form.reply]}`);

  return (
    <section className="section page-top">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">{t('ws.eyebrow')}</p>
          <h1>{t('ws.title')}</h1>
          <p className="muted">{t('ws.sub')}</p>
        </header>
        <div className="contact-grid">
          <form className="form" onSubmit={submit}>
            <input className="hp" name="botcheck" value={form.botcheck} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="row">
              <label><span>{t('f.name')}</span><input name="name" value={form.name} onChange={set} required /></label>
              <label><span>{t('ws.biz')}</span><input name="business" value={form.business} onChange={set} /></label>
            </div>
            <div className="row">
              <label><span>{t('f.phone')}</span><input name="phone" value={form.phone} onChange={set} inputMode="tel" dir="ltr" required /></label>
              <label><span>{t('f.email')}</span><input type="email" name="email" value={form.email} onChange={set} required dir="ltr" /></label>
            </div>
            <div className="row">
              <label><span>{t('ws.city')}</span><input name="city" value={form.city} onChange={set} /></label>
              <label><span>{t('ws.qty')}</span><input name="quantity" value={form.quantity} onChange={set} inputMode="numeric" dir="ltr" /></label>
            </div>
            <label><span>{t('f.replyLang')}</span>
              <select name="reply" value={form.reply} onChange={set}>{LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}</select>
            </label>
            <label><span>{t('f.message')}</span><textarea name="message" rows={5} value={form.message} onChange={set} required placeholder={t('ws.msgPh')} /></label>
            <button className="btn btn-light" type="submit" disabled={state.s === 'sending'}>{state.s === 'sending' ? t('f.sending') : t('ws.send')}</button>
            {state.msg && <p className={`status ${state.s}`} role="status" aria-live="polite">{state.msg}</p>}
          </form>
          <aside className="contact-side">
            <ul className="ws-list">
              {['ws.b1', 'ws.b2', 'ws.b3'].map((k) => <li key={k}><Check size={18} /> {t(k)}</li>)}
              {store.wholesale.moq && <li><Check size={18} /> {t('ws.moq', { n: store.wholesale.moq })}</li>}
            </ul>
            <a className="c-tile wa" href={wa} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={22} /><span><small>{t('c.fastest')}</small><strong>{t('c.chat')}</strong></span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
