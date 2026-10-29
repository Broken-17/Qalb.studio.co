import { site } from '../config/site';

/* Sends the Contact form to the store owner's inbox, with NO server needed.

   - VITE_FORM_ENDPOINT set (Formspree / Web3Forms / similar): the form is POSTed there and
     that service emails it to you.
   - Not set: falls back to opening the customer's email app with the message pre-filled
     (works, but only for visitors who have an email app set up).        */
export async function sendEnquiry(data) {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
  const accessKey = import.meta.env.VITE_FORM_ACCESS_KEY;

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...(accessKey ? { access_key: accessKey } : {}),
        subject: `New message from ${data.name} - ${site.name}`,
        ...data,
      }),
    });
    if (!res.ok) throw new Error('Request failed');
    return 'sent';
  }

  const body = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.email && `Email: ${data.email}`,
    `Topic: ${data.topic}`,
    '',
    data.message,
  ]
    .filter((x) => x !== undefined && x !== false)
    .join('\n');
  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
    `${data.topic} - ${data.name}`
  )}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}
