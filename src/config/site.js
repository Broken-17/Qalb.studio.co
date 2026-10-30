import { store as store0 } from './store';

/* ==========================================================================
   STORE SETTINGS. Change everything about the shop's identity HERE.
   Anything left as '' is simply hidden on the website (nothing fake is shown).
   ========================================================================== */

export const site = {
  name: 'QALB STUDIO',
  short: 'Qalb',
  arabic: 'قلب',
  tagline: 'Muslim Street Fashion',
  intro:
    'Qalb Studio is an Indian Muslim streetwear brand bringing faith and modern street style together.',

  // Thin bar at the very top of every page, e.g. 'Free size exchange within 7 days'. '' hides it.
  announcement: '',

  // Put your real logo in /public/brand/ and write its path here, e.g. 'brand/logo.png'.
  // Leave '' to use the built-in QALB wordmark.
  logo: '',

  // ----- CONTACT -----
  whatsapp: '916304726010',          // country code + number, digits only
  phone: '+91 63047 26010',          // shown on the website
  email: 'support@qalbstudio.co',    // customer queries land here
  instagram: 'qalb.studio.co',       // handle only, no @
  address: '',                       // optional
  hours: '',                         // optional. Example: 'Mon - Sat, 10 AM - 7 PM'

  // Contact-form delivery to your inbox, via Web3Forms (free, no server).
  // 1) Go to https://web3forms.com  2) enter support@qalbstudio.co  3) paste the access key below.
  // (The key is meant to be public; it only lets the form send mail to YOUR address.)
  web3formsKey: '',

  // First line of every WhatsApp order message.
  greeting: 'Assalamu alaikum',

  // Credit shown in the footer. Change `portfolio` any time.
  developer: {
    name: 'Aszar',
    phone: '7660973723',
    portfolio: 'https://raheem-portfolio-site.netlify.app/',
    instagram: '_the.broken_17',
  },

  // Legal contact shown in the policies (Indian e-commerce rules ask for a grievance contact).
  grievanceName: '',   // e.g. 'Your Name, Founder'
};

// Shown only while you run `npm run dev`, to remind you what is still empty.
export const missingSetup = () =>
  [
    !site.web3formsKey && !import.meta.env.VITE_FORM_ACCESS_KEY && 'site.web3formsKey (contact form falls back to the email app)',
    store0.cod.advance === null && 'store.cod.advance',
  ].filter(Boolean);
