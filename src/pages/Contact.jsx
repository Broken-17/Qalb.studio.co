import { useState } from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '../components/Icons';
import { site } from '../config/site';
import { sendEnquiry } from '../lib/enquiry';
import { waLink } from '../lib/whatsapp';
import { useTitle } from '../hooks/hooks';

const topics = ['Order enquiry', 'Product question', 'Sizing help', 'Bulk / custom order', 'Something else'];
const empty = { name: '', phone: '', email: '', topic: topics[0], message: '', botcheck: '' };

export default function Contact() {
  useTitle('Contact');
  const [form, setForm] = useState(empty);
  const [state, setState] = useState({ s: 'idle', msg: '' });
  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.botcheck) return; // spam trap
    if (form.phone && !/^[0-9+\s-]{8,15}$/.test(form.phone.trim())) {
      setState({ s: 'error', msg: 'Please enter a valid phone number.' });
      return;
    }
    setState({ s: 'sending', msg: '' });
    try {
      const { botcheck, ...data } = form;
      const mode = await sendEnquiry(data);
      setState({
        s: 'ok',
        msg:
          mode === 'sent'
            ? 'Thank you! Your message has been sent. We will get back to you soon.'
            : 'Your email app should open with the message ready. Press Send there to finish.',
      });
      if (mode === 'sent') setForm(empty);
    } catch {
      setState({ s: 'error', msg: 'Something went wrong. Please message us on WhatsApp instead.' });
    }
  };

  return (
    <section className="section page-top">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">Contact</p>
          <h1>We&rsquo;d love to hear from you.</h1>
          <p className="muted">Questions about an order, a size or a product? Send us a message and we&rsquo;ll reply.</p>
        </header>

        <div className="contact-grid">
          <form className="form" onSubmit={submit}>
            <input className="hp" name="botcheck" value={form.botcheck} onChange={set} tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="row">
              <label><span>Your name *</span><input name="name" value={form.name} onChange={set} required autoComplete="name" /></label>
              <label><span>Phone / WhatsApp</span><input name="phone" value={form.phone} onChange={set} inputMode="tel" autoComplete="tel" /></label>
            </div>
            <div className="row">
              <label><span>Email *</span><input type="email" name="email" value={form.email} onChange={set} required autoComplete="email" /></label>
              <label>
                <span>Topic</span>
                <select name="topic" value={form.topic} onChange={set}>{topics.map((t) => <option key={t}>{t}</option>)}</select>
              </label>
            </div>
            <label><span>Message *</span><textarea name="message" rows={6} value={form.message} onChange={set} required placeholder="Tell us how we can help..." /></label>
            <button className="btn btn-light" type="submit" disabled={state.s === 'sending'}>
              {state.s === 'sending' ? 'Sending...' : 'Send message'}
            </button>
            {state.msg && <p className={`status ${state.s}`} role="status" aria-live="polite">{state.msg}</p>}
          </form>

          <aside className="contact-side">
            <a className="c-tile wa" href={waLink('Hi! I have a question.')} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={22} />
              <span><small>Fastest reply</small><strong>Chat on WhatsApp</strong></span>
            </a>
            {site.email && (
              <a className="c-tile" href={`mailto:${site.email}`}>
                <Mail size={22} /><span><small>Email</small><strong>{site.email}</strong></span>
              </a>
            )}
            {site.instagram && (
              <a className="c-tile" href={`https://www.instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer">
                <InstagramIcon size={22} /><span><small>Instagram</small><strong>@{site.instagram}</strong></span>
              </a>
            )}
            {site.phone && (
              <a className="c-tile" href={`tel:${site.phone}`}>
                <Phone size={22} /><span><small>Phone</small><strong>{site.phone}</strong></span>
              </a>
            )}
            {site.hours && (
              <div className="c-tile"><Clock size={22} /><span><small>Hours</small><strong>{site.hours}</strong></span></div>
            )}
            {site.address && (
              <div className="c-tile"><MapPin size={22} /><span><small>Address</small><strong>{site.address}</strong></span></div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
