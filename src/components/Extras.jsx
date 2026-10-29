import { useEffect, useState } from 'react';
import { WhatsAppIcon } from './Icons';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { missingSetup } from '../config/site';
import { waLink } from '../lib/whatsapp';

export function Toast() {
  const { toast } = useCart();
  return (
    <div className={`toast${toast ? ' show' : ''}`} role="status" aria-live="polite">
      <Check size={16} /> {toast}
    </div>
  );
}

export function WhatsAppFloat() {
  return (
    <a className="wa-float" href={waLink('Hi! I have a question about Qalb Studio.')} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <WhatsAppIcon size={28} />
    </a>
  );
}

/* Only visible while developing (npm run dev). Never shown on the live site. */
export function DevNotice() {
  if (!import.meta.env.DEV) return null;
  const missing = missingSetup();
  if (!missing.length) return null;
  return (
    <div className="dev-notice">
      <strong>Setup still needed:</strong> {missing.join(', ')} <span>(only you see this while developing)</span>
    </div>
  );
}

export function Countdown({ date }) {
  const target = new Date(date).getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!date || Number.isNaN(target) || target <= now) return null;
  const s = Math.floor((target - now) / 1000);
  const parts = [
    ['Days', Math.floor(s / 86400)],
    ['Hours', Math.floor((s % 86400) / 3600)],
    ['Mins', Math.floor((s % 3600) / 60)],
    ['Secs', s % 60],
  ];
  return (
    <div className="countdown" aria-label="Time until launch">
      {parts.map(([l, v]) => (
        <div key={l}>
          <strong>{String(v).padStart(2, '0')}</strong>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}
