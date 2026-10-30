import { site } from '../config/site';

/* Sends a form (Contact, Wholesale) to the store owner's inbox with NO server.

   1. Web3Forms key set (site.web3formsKey or VITE_FORM_ACCESS_KEY): posted to Web3Forms,
      which emails it to support@qalbstudio.co.
   2. VITE_FORM_ENDPOINT set (e.g. a Formspree URL): posted there instead.
   3. Neither: opens the customer's email app with the message pre-filled.               */
export async function sendEnquiry(data) {
  const key = site.web3formsKey || import.meta.env.VITE_FORM_ACCESS_KEY;
  const custom = import.meta.env.VITE_FORM_ENDPOINT;
  const endpoint = custom || (key ? 'https://api.web3forms.com/submit' : '');

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...(key ? { access_key: key } : {}),
        subject: `${data.topic || 'New message'} - ${data.name} (${site.name} website)`,
        from_name: `${site.name} website`,
        ...(data.email ? { replyto: data.email } : {}),
        ...data,
      }),
    });
    if (!res.ok) throw new Error('Request failed');
    const json = await res.json().catch(() => ({}));
    if (json && json.success === false) throw new Error(json.message || 'Request failed');
    return 'sent';
  }

  const body = Object.entries(data)
    .filter(([k, v]) => v && k !== 'message')
    .map(([k, v]) => `${k}: ${v}`)
    .concat(['', data.message || ''])
    .join('\n');
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
    `${data.topic || 'Message'} - ${data.name}`
  )}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}
