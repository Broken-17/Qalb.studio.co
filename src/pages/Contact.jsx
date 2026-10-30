import { useState } from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '../components/Icons';
import { site } from '../config/site';
import { LANGS, useI18n } from '../i18n';
import { sendEnquiry } from '../lib/enquiry';
import { waLink } from '../lib/whatsapp';
import { useTitle } from '../hooks/hooks';

// the topic sent to your inbox is always English; only the label the customer sees is translated
const TOPICS = ['Order enquiry', 'Product question', 'Sizing help', 'Bulk / custom order', 'Something else'];
const LANG_NAME = { en: 'English', hi: 'Hindi', ur: 'Urdu' };

export default function Contact() {
  const { t, lang } = useI18n();
  useTitle(t('contact.eyebrow'));
  const blank = { name: '', phone: '', email: '', topic: TOPICS[0], reply: lang, message: '', botcheck: '' };
  const [form, setForm] = useState(blank);
  const [state, setState] = useState({ s: 'idle', msg: '' });
  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.botcheck) return; // spam trap
    if (form.phone && !/^[0-9+\s-]{8,15}$/.test(form.phone.trim())) {
      setState({ s: 'error', msg: t('f.badPhone') });
      return;
    }
    setState({ s: 'sending', msg: '' });
    try {
      const { botcheck, reply, ...data } = form;
      const mode = await sendEnquiry({ ...data, preferred_reply_language: LANG_NAME[reply] });
      setState({ s: 'ok', msg: mode === 'sent' ? t('f.sent') : t('f.mailto') });
      if (mode === 'sent') setForm(blank);
    } catch {
      setState({ s: 'error', msg: t('f.fail') });
    }
  };

  return (
    <section className="section page-top">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">{t('contact.eyebrow')}</p>
          <h1>{t('contact.title')}</h1>
          <p className="muted">{t('contact.sub')}</p>
        </header>

        <div className="contact-grid">
          <form className="form" onSubmit={submit}>
            <input className="hp" name="botcheck" value={form.botcheck} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="row">
              <label><span>{t('f.name')}</span><input name="name" value={form.name} onChange={set} required autoComplete="name" /></label>
              <label><span>{t('f.phone')}</span><input name="phone" value={form.phone} onChange={set} inputMode="tel" autoComplete="tel" dir="ltr" /></label>
            </div>
            <div className="row">
              <label><span>{t('f.email')}</span><input type="email" name="email" value={form.email} onChange={set} required autoComplete="email" dir="ltr" /></label>
              <label>
                <span>{t('f.topic')}</span>
                <select name="topic" value={form.topic} onChange={set}>{TOPICS.map((x, i) => <option key={x} value={x}>{t(`topic.${i + 1}`)}</option>)}</select>
              </label>
            </div>
            <label>
              <span>{t('f.replyLang')}</span>
              <select name="reply" value={form.reply} onChange={set}>{LANGS.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}</select>
            </label>
            <label><span>{t('f.message')}</span><textarea name="message" rows={6} value={form.message} onChange={set} required placeholder={t('f.messagePh')} /></label>
            <button className="btn btn-light" type="submit" disabled={state.s === 'sending'}>
              {state.s === 'sending' ? t('f.sending') : t('f.send')}
            </button>
            {state.msg && <p className={`status ${state.s}`} role="status" aria-live="polite">{state.msg}</p>}
          </form>

          <aside className="contact-side">
            <a className="c-tile wa" href={waLink('Hi! I have a question.')} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={22} />
              <span><small>{t('c.fastest')}</small><strong>{t('c.chat')}</strong></span>
            </a>
            {site.email && (
              <a className="c-tile" href={`mailto:${site.email}`}>
                <Mail size={22} /><span><small>{t('c.email')}</small><strong>{site.email}</strong></span>
              </a>
            )}
            {site.instagram && (
              <a className="c-tile" href={`https://www.instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer">
                <InstagramIcon size={22} /><span><small>{t('c.insta')}</small><strong dir="ltr">@{site.instagram}</strong></span>
              </a>
            )}
            {site.phone && (
              <a className="c-tile" href={`tel:${site.phone.replace(/\s/g, '')}`}>
                <Phone size={22} /><span><small>{t('c.phone')}</small><strong dir="ltr">{site.phone}</strong></span>
              </a>
            )}
            {site.hours && <div className="c-tile"><Clock size={22} /><span><small>{t('c.hours')}</small><strong>{site.hours}</strong></span></div>}
            {site.address && <div className="c-tile"><MapPin size={22} /><span><small>{t('c.address')}</small><strong>{site.address}</strong></span></div>}
          </aside>
        </div>
      </div>
    </section>
  );
}
