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

  // Thin bar at the very top of every page. Set to '' to hide.
  announcement: '',

  // Put your real logo in /public/brand/ and write its path here, e.g. 'brand/logo.png'.
  // Leave '' to use the built-in QALB wordmark.
  logo: '',

  // ----- CONTACT (fill these in) -----
  whatsapp: '916304726010',   // country code + number, digits only. Example: 919876543210
  email: 'support@qalbstudio.co',      // the inbox that should receive customer queries
  instagram: 'qalb.studio.co',  // handle only, without @. Example: qalbstudio
  phone: '',      // optional, shown on the Contact page
  address: '',    // optional
  hours: '',      // optional. Example: 'Mon - Sat, 10 AM - 7 PM'

  // First line of every WhatsApp order message.
  greeting: 'Assalamu alaikum',

  // ----- LAUNCH MODE -----
  // enabled: true shows the "Launching soon" banner on the home page.
  // date: optional. Example '2026-12-01T10:00:00+05:30' starts a live countdown.
  launch: { enabled: false, date: '' },
};

// Shown only while you run `npm run dev`, to remind you what is still empty.
export const missingSetup = () =>
  [
    !site.whatsapp && 'site.whatsapp',
    !site.email && 'site.email',
    !import.meta.env.VITE_FORM_ENDPOINT && 'VITE_FORM_ENDPOINT (.env)',
  ].filter(Boolean);
