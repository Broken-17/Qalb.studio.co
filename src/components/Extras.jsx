import { useState } from 'react';
import { Check } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { useCart } from '../context/CartContext';
import { missingSetup } from '../config/site';
import { useI18n } from '../i18n';
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
  const { t } = useI18n();
  return (
    <a className="wa-float" data-tip={t('tip.whatsapp')} href={waLink('Hi! I have a question about Qalb Studio.')} target="_blank" rel="noopener noreferrer" aria-label={t('tip.whatsapp')}>
      <WhatsAppIcon size={28} />
    </a>
  );
}

/* Only visible while developing (npm run dev). Never shown on the live site. */
export function DevNotice() {
  const [hidden, setHidden] = useState(false);
  if (!import.meta.env.DEV || hidden) return null;
  const missing = missingSetup();
  if (!missing.length) return null;
  return (
    <div className="dev-notice">
      <div>
        <strong>Setup still needed:</strong> {missing.join(', ')} <span>(only you see this while developing)</span>
      </div>
      <button type="button" aria-label="Hide this note" onClick={() => setHidden(true)}>&times;</button>
    </div>
  );
}
