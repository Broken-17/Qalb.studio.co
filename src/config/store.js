/* ==========================================================================
   STORE RULES: delivery areas, COD advance, returns, sizes.
   Every number the customer sees comes from here. Lines marked CONFIRM are
   sensible starting points; set the real value before you launch.
   ========================================================================== */

export const store = {
  // ----- WHERE YOU DELIVER -----
  // A customer's pincode decides the area. Add a new area (or change the days) any time.
  // Pincodes are matched by their first digits (prefixes) or an inclusive range.
  areas: [
    { id: 'india', name: 'India', hi: 'भारत', ur: 'بھارت', prefixes: ['1', '2', '3', '4', '5', '6', '7', '8'], days: '3-7' },
  ],
  processingDays: '1-2', // time to pack and hand over to the courier. CONFIRM

  shippingFee: 0, // flat shipping charge added to every order (0 = free delivery)

  // ----- CASH ON DELIVERY -----
  cod: {
    enabled: true,
    // Paid up-front to confirm a COD order. It is NOT extra: it is subtracted from the order total,
    // and the customer pays only the remaining balance to the courier. CONFIRM the amount.
    advance: 100,
    // Optional: orders above this amount need no advance. null = always ask for the advance.
    waiveAdvanceAbove: null,
    // UPI id customers pay the advance to, e.g. 'qalbstudio@upi'. '' = "we'll share payment details on WhatsApp".
    upiId: '',
  },
  prepaid: { enabled: true }, // customer may pay everything up-front by UPI instead

  // ----- RETURNS -----
  returnDays: 7,        // days after delivery to request a return / exchange
  refundDays: '3-7',    // working days to refund once the return is received
  maxPerItem: 10,

  // ----- WHOLESALE -----
  wholesale: { moq: null }, // minimum pieces, e.g. 10. null hides the line.

  // ----- SIZE GUIDE (default; a product can bring its own `sizeChart` in info.js) -----
  // Body chest and garment length, in inches. Approximate: confirm against your real garments.
  sizeChart: {
    head: ['Size', 'Chest (in)', 'Length (in)', 'Shoulder (in)'],
    rows: [
      ['S', '38', '27', '17'],
      ['M', '40', '28', '18'],
      ['L', '42', '29', '19'],
      ['XL', '44', '30', '20'],
      ['XXL', '46', '31', '21'],
    ],
  },

  // ----- CATEGORY NAMES in other languages (categories come from each product's info.js) -----
  categoryNames: {
    'T-Shirts': { hi: 'टी-शर्ट', ur: 'ٹی شرٹس' },
    'Oversized Tees': { hi: 'ओवरसाइज़्ड टी', ur: 'اوورسائزڈ ٹیز' },
    Hoodies: { hi: 'हुडी', ur: 'ہوڈیز' },
    Collection: { hi: 'कलेक्शन', ur: 'کلیکشن' },
  },
};

// find which delivery area a pincode belongs to (first match wins), or null
export function areaForPincode(pin) {
  const p = String(pin || '').trim();
  if (!/^[1-9][0-9]{5}$/.test(p)) return null;
  const n = Number(p);
  return (
    store.areas.find(
      (a) => (a.prefixes && a.prefixes.some((x) => p.startsWith(x))) || (a.range && n >= a.range[0] && n <= a.range[1])
    ) || null
  );
}

export const areaName = (a, lang = 'en') => (lang !== 'en' && a[lang]) || a.name;
// "Visakhapatnam and Andhra Pradesh" in the chosen language
export const areaList = (lang = 'en') => {
  const n = store.areas.map((a) => areaName(a, lang));
  const and = { en: ' and ', hi: ' और ', ur: ' اور ' }[lang] || ' and ';
  return n.length > 1 ? n.slice(0, -1).join(', ') + and + n[n.length - 1] : n[0] || '';
};
