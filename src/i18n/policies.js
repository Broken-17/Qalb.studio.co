/* ==========================================================================
   HELP & POLICIES. Written to match what leading Indian fashion platforms offer
   (7-day returns, free size exchange, refunds in 3-7 working days, defect/wrong-item
   cover) and adapted to a small COD-with-advance store.
   The values (days, advance, areas) come from src/config/store.js, so changing a number
   there updates every language automatically.
   DRAFT: have a lawyer or CA look at Terms and Privacy before launch.
   ========================================================================== */

export const POLICY_UPDATED = '2026-10-29';

import { site } from '../config/site';
import { areaList, areaName, store } from '../config/store';
import { money } from '../lib/format';

export function policies(lang) {
  const P = { en, hi, ur };
  return (P[lang] || en)(vars(lang));
}

export function vars(lang) {
  const L = lang in { hi: 1, ur: 1 } ? lang : 'en';
  const adv = store.cod.advance || 0;
  const eg = 1000;
  const fee = store.shippingFee;
  const T = {
    en: {
      wd: 'working days',
      free: 'Delivery is free.',
      fee: `A flat shipping charge of ${money(fee)} applies per order.`,
      cod: adv
        ? `Cash on delivery is available. To confirm a COD order you pay a small advance of ${money(adv)} now (by UPI), and the remaining balance to the courier when the parcel arrives.`
        : 'Cash on delivery is available. You pay the full amount to the courier when the parcel arrives.',
      faq: adv
        ? `Say your order total is ${money(eg)} and the advance is ${money(adv)}. You pay ${money(adv)} now to confirm and ${money(eg - adv)} to the courier. The advance is part of your total, never extra.`
        : 'You pay the full amount when the parcel arrives.',
    },
    hi: {
      wd: 'कार्य दिवस',
      free: 'डिलीवरी मुफ़्त है।',
      fee: `हर ऑर्डर पर ${money(fee)} का तय शिपिंग शुल्क लगता है।`,
      cod: adv
        ? `कैश ऑन डिलीवरी उपलब्ध है। COD ऑर्डर पक्का करने के लिए आप अभी (UPI से) ${money(adv)} का छोटा एडवांस देते हैं, और बाक़ी रक़म पार्सल आने पर कूरियर को।`
        : 'कैश ऑन डिलीवरी उपलब्ध है। पार्सल आने पर पूरी रक़म कूरियर को दें।',
      faq: adv
        ? `मान लीजिए आपका कुल बिल ${money(eg)} है और एडवांस ${money(adv)}। आप ${money(adv)} अभी देते हैं और ${money(eg - adv)} कूरियर को। एडवांस आपके कुल बिल का हिस्सा है, अतिरिक्त नहीं।`
        : 'पार्सल आने पर पूरी रक़म दें।',
    },
    ur: {
      wd: 'کام کے دن',
      free: 'ڈیلیوری مفت ہے۔',
      fee: `ہر آرڈر پر ${money(fee)} کا مقررہ شپنگ چارج لگتا ہے۔`,
      cod: adv
        ? `کیش آن ڈیلیوری دستیاب ہے۔ COD آرڈر پکا کرنے کے لیے آپ ابھی (UPI سے) ${money(adv)} کا چھوٹا ایڈوانس دیتے ہیں، اور باقی رقم پارسل آنے پر کوریئر کو۔`
        : 'کیش آن ڈیلیوری دستیاب ہے۔ پارسل آنے پر پوری رقم کوریئر کو دیں۔',
      faq: adv
        ? `فرض کریں آپ کا کل بل ${money(eg)} ہے اور ایڈوانس ${money(adv)}۔ آپ ${money(adv)} ابھی دیتے ہیں اور ${money(eg - adv)} کوریئر کو۔ ایڈوانس آپ کے کل بل کا حصہ ہے، اضافی نہیں۔`
        : 'پارسل آنے پر پوری رقم دیں۔',
    },
  }[L];
  return {
    days: store.returnDays,
    refund: store.refundDays,
    processing: store.processingDays,
    areas: areaList(L),
    areaDays: store.areas.map((a) => `${areaName(a, L)}: ${a.days} ${T.wd}`).join(L === 'ur' ? '؛ ' : '; '),
    shipText: fee ? T.fee : T.free,
    codText: T.cod,
    advFaq: T.faq,
    email: site.email,
    phone: site.phone,
    grievance: site.grievanceName ? `${site.grievanceName}, ${site.email}` : '',
  };
}

/* v = { adv, advText, days, refund, areas, processing, vizDays, apDays, email, phone, grievance, wa } */

const en = (v) => ({
  sections: [
    {
      id: 'shipping', title: 'Shipping & delivery',
      items: [
        'We deliver across India. Remote or hard-to-reach pincodes can take a little longer.',
        `Orders are packed and handed to the courier within ${v.processing} working days of confirmation.`,
        `Delivery time after dispatch: ${v.areaDays}.`,
        v.shipText,
        'You will get tracking or courier details on WhatsApp once your parcel is dispatched.',
        'Please share a complete address with landmark and a working phone number. Couriers call before delivery.',
        'If delivery fails twice because the phone is unreachable or nobody is available, the parcel returns to us. See “Cash on delivery” for what happens to the advance.',
      ],
    },
    {
      id: 'cod', title: 'Cash on delivery & advance',
      items: [
        v.codText,
        'The advance is not an extra fee. It is part of your order total and is subtracted from it. You only pay the balance to the courier.',
        'It confirms that the order is real and helps cover shipping, because cash-on-delivery parcels that are refused cost us the courier fees both ways.',
        'You can also pay the full amount upfront by UPI if you prefer. Then there is nothing to pay at the door.',
        'We confirm every order personally on WhatsApp and share the payment details there. Please never pay anyone who contacts you from another number.',
        'If you refuse a COD parcel without a valid reason (for example, it is the wrong or a damaged item), the advance is kept to cover the shipping costs. If we cancel an order or cannot deliver, the advance is refunded in full.',
      ],
    },
    {
      id: 'returns', title: 'Returns & exchanges',
      items: [
        `You can request a return or exchange within ${v.days} days of delivery.`,
        'The item must be unworn, unwashed and undamaged, with tags and original packaging intact.',
        'Your first size exchange is free. We will arrange a pickup and send the new size, subject to stock.',
        'Wrong item, manufacturing defect or damaged in transit? Tell us within 48 hours of delivery with clear photos. We will replace it or refund you in full, and the pickup is on us. We strongly recommend recording an unboxing video, without cuts, from the moment you open the sealed parcel. It is the best proof and settles claims fastest.',
        'Not eligible for return: items worn, washed or altered; items without tags; items bought in a final sale or marked “no returns”; and customised pieces.',
        'For hygiene and quality reasons we may refuse items returned with perfume, stains or damage that was not there at delivery.',
        'To start, message us on WhatsApp with your order details and photos. We reply within one working day.',
      ],
    },
    {
      id: 'refunds', title: 'Refunds & cancellations',
      items: [
        `Once we receive and check the returned item, your refund is processed within ${v.refund} working days.`,
        'Refunds go back to the way you paid: UPI or bank transfer for prepaid and COD orders. We will ask for your UPI ID or bank details on WhatsApp.',
        'The shipping you paid (if any) is refunded when the return is due to our mistake, a defect or a damaged item.',
        'You can cancel for free before the order is dispatched. Just message us on WhatsApp, and your advance or payment is returned in full.',
        'Once an order is dispatched it cannot be cancelled, but you can still return it under the returns policy once it arrives.',
        'If a promo code was used and part of the order is returned, the refund is the amount you actually paid for that item.',
      ],
    },
    {
      id: 'faq', title: 'Frequently asked questions',
      faq: [
        { q: 'Do I need an account?', a: 'No. Add pieces to your bag, enter your delivery details and send the order to us on WhatsApp. That is it.' },
        { q: 'Which cities do you deliver to?', a: `${v.areas}. Enter your pincode in the bag and it will tell you straight away.` },
        { q: 'How does the advance work?', a: v.advFaq },
        { q: 'How do I choose my size?', a: 'Open the Size Guide, compare with a tee that fits you well, or message us. If you are between sizes, go one up for a relaxed fit.' },
        { q: 'Can I change my address after ordering?', a: 'Yes, until the order is dispatched. Message us on WhatsApp as soon as you can.' },
        { q: 'Do you offer bulk or custom orders?', a: 'Yes. Visit the Wholesale page and send us the details.' },
        { q: 'How do I use a promo code?', a: 'Open your bag, type the code in the Promo code box and press Apply. The discount shows in your order summary.' },
        { q: 'I received a wrong or damaged item.', a: 'We are sorry. Message us within 48 hours with photos and we will replace it or refund you, with free pickup.' },
      ],
    },
    {
      id: 'privacy', title: 'Privacy',
      items: [
        'We collect only what we need to serve you: your name, phone number, address and the items you order. You send these to us yourself on WhatsApp, or through the contact form.',
        'We use them to confirm, pack and deliver your order, and to answer your questions. We do not sell your data.',
        'We share your name, address and phone only with the courier delivering your parcel.',
        'Contact-form messages are delivered to our inbox through an email-forwarding service (Web3Forms).',
        'This website stores your bag, language and delivery details in your own browser (local storage) so they are there when you return. Nothing is sent to us until you place an order. You can clear it from your browser settings at any time.',
        'We never see or store your card, UPI PIN or bank passwords. Payment details are only shared on WhatsApp, and you should never share a PIN or OTP with anyone.',
        `To ask us to delete your details, email ${v.email}.`,
      ],
    },
    {
      id: 'grievance', title: 'Contact & grievances',
      items: [
        `Questions, complaints or feedback: ${v.email}${v.phone ? `, or WhatsApp ${v.phone}` : ''}.`,
        v.grievance ? `Grievance contact: ${v.grievance}.` : 'We acknowledge complaints within 48 hours and aim to resolve them within 7 days.',
      ],
    },
  ],
});

const hi = (v) => ({
  sections: [
    {
      id: 'shipping', title: 'शिपिंग और डिलीवरी',
      items: [
        'हम पूरे भारत में डिलीवर करते हैं। दूर-दराज़ के पिनकोड में थोड़ा ज़्यादा समय लग सकता है।',
        `ऑर्डर कन्फ़र्म होने के ${v.processing} कार्य दिवस के भीतर पैक करके कूरियर को सौंप दिया जाता है।`,
        `डिस्पैच के बाद डिलीवरी का समय: ${v.areaDays}।`,
        v.shipText,
        'पार्सल रवाना होते ही ट्रैकिंग या कूरियर की जानकारी व्हाट्सऐप पर मिल जाएगी।',
        'कृपया लैंडमार्क के साथ पूरा पता और चालू फ़ोन नंबर दें। कूरियर वाले डिलीवरी से पहले कॉल करते हैं।',
        'अगर फ़ोन न लगने या कोई न मिलने से दो बार डिलीवरी नहीं हो पाई, तो पार्सल हमारे पास लौट आता है। एडवांस का क्या होगा, यह “कैश ऑन डिलीवरी” में देखें।',
      ],
    },
    {
      id: 'cod', title: 'कैश ऑन डिलीवरी और एडवांस',
      items: [
        v.codText,
        'एडवांस कोई अतिरिक्त शुल्क नहीं है। यह आपके ऑर्डर की कुल राशि का ही हिस्सा है और उसी में से घटाया जाता है। कूरियर को आप सिर्फ़ बाक़ी रक़म देते हैं।',
        'इससे पता चलता है कि ऑर्डर असली है, और शिपिंग का ख़र्च निकल जाता है, क्योंकि लौटाए गए COD पार्सल का कूरियर ख़र्च दोनों तरफ़ का हमें उठाना पड़ता है।',
        'चाहें तो पूरी रक़म UPI से पहले ही दे सकते हैं। फिर दरवाज़े पर कुछ नहीं देना होगा।',
        'हर ऑर्डर हम खुद व्हाट्सऐप पर कन्फ़र्म करते हैं और भुगतान की जानकारी वहीं देते हैं। किसी दूसरे नंबर से संपर्क करने वाले को कभी पैसे न दें।',
        'अगर आप बिना सही वजह के COD पार्सल लेने से मना करते हैं (जैसे ग़लत या ख़राब आइटम न हो), तो शिपिंग ख़र्च के लिए एडवांस रख लिया जाता है। अगर हम ऑर्डर रद्द करें या डिलीवर न कर पाएँ, तो एडवांस पूरा लौटाया जाता है।',
      ],
    },
    {
      id: 'returns', title: 'रिटर्न और एक्सचेंज',
      items: [
        `डिलीवरी के ${v.days} दिन के भीतर आप रिटर्न या एक्सचेंज माँग सकते हैं।`,
        'आइटम बिना पहना, बिना धुला और बिना ख़राबी का हो, टैग और असली पैकिंग के साथ।',
        'पहला साइज़ एक्सचेंज मुफ़्त है। हम पिकअप करवाएँगे और स्टॉक के अनुसार नया साइज़ भेजेंगे।',
        'ग़लत आइटम, निर्माण की ख़राबी या रास्ते में टूट-फूट? डिलीवरी के 48 घंटे के भीतर साफ़ फ़ोटो के साथ बताएँ। हम बदल देंगे या पूरा पैसा लौटाएँगे, और पिकअप हमारी तरफ़ से। हम पार्सल खोलते समय, बिना कट के, अनबॉक्सिंग वीडियो रिकॉर्ड करने की सलाह देते हैं। यह सबसे अच्छा सबूत है और दावा जल्दी निपटता है।',
        'रिटर्न नहीं होंगे: पहने, धुले या बदले हुए आइटम; बिना टैग के आइटम; फ़ाइनल सेल या “नो रिटर्न” वाले आइटम; और कस्टम पीस।',
        'साफ़-सफ़ाई और क्वालिटी के कारण परफ़्यूम, दाग या डिलीवरी के बाद हुई ख़राबी वाले आइटम हम वापस नहीं ले सकते।',
        'शुरू करने के लिए ऑर्डर की जानकारी और फ़ोटो के साथ हमें व्हाट्सऐप करें। हम एक कार्य दिवस में जवाब देते हैं।',
      ],
    },
    {
      id: 'refunds', title: 'रिफ़ंड और कैंसलेशन',
      items: [
        `लौटाया हुआ आइटम मिलकर जाँचने के बाद ${v.refund} कार्य दिवस में रिफ़ंड हो जाता है।`,
        'रिफ़ंड उसी तरीक़े से जाता है जिससे आपने भुगतान किया था: UPI या बैंक ट्रांसफ़र। हम व्हाट्सऐप पर आपकी UPI ID या बैंक जानकारी माँगेंगे।',
        'अगर रिटर्न हमारी ग़लती, ख़राबी या टूट-फूट की वजह से है, तो आपका दिया हुआ शिपिंग शुल्क (अगर कोई हो) भी लौटाया जाता है।',
        'ऑर्डर रवाना होने से पहले आप मुफ़्त में रद्द कर सकते हैं। बस व्हाट्सऐप पर बताएँ, एडवांस या भुगतान पूरा लौटा दिया जाएगा।',
        'रवाना होने के बाद ऑर्डर रद्द नहीं हो सकता, लेकिन पहुँचने पर आप रिटर्न नीति के तहत लौटा सकते हैं।',
        'अगर प्रोमो कोड लगा था और ऑर्डर का कुछ हिस्सा लौटाया गया, तो उस आइटम पर आपने जितना असल में दिया, उतना रिफ़ंड होगा।',
      ],
    },
    {
      id: 'faq', title: 'अक्सर पूछे जाने वाले सवाल',
      faq: [
        { q: 'क्या अकाउंट बनाना ज़रूरी है?', a: 'नहीं। बैग में पीस डालें, डिलीवरी की जानकारी भरें और ऑर्डर व्हाट्सऐप पर हमें भेज दें। बस।' },
        { q: 'आप किन शहरों में डिलीवर करते हैं?', a: `${v.areas}। बैग में पिनकोड डालते ही तुरंत पता चल जाएगा।` },
        { q: 'एडवांस कैसे काम करता है?', a: v.advFaq },
        { q: 'अपना साइज़ कैसे चुनूँ?', a: 'साइज़ गाइड खोलें, अपनी फ़िट वाली टी-शर्ट से मिलाएँ, या हमें मैसेज करें। दो साइज़ के बीच हों तो ढीले फ़िट के लिए एक साइज़ बड़ा लें।' },
        { q: 'ऑर्डर के बाद पता बदल सकता हूँ?', a: 'हाँ, ऑर्डर रवाना होने तक। जल्द से जल्द व्हाट्सऐप पर बताएँ।' },
        { q: 'क्या थोक या कस्टम ऑर्डर मिलते हैं?', a: 'हाँ। थोक पेज पर जाकर जानकारी भेजें।' },
        { q: 'प्रोमो कोड कैसे लगाऊँ?', a: 'बैग खोलें, प्रोमो कोड के बॉक्स में कोड लिखें और लगाएँ दबाएँ। छूट ऑर्डर सारांश में दिखेगी।' },
        { q: 'ग़लत या ख़राब आइटम मिला।', a: 'हमें अफ़सोस है। 48 घंटे के भीतर फ़ोटो के साथ मैसेज करें, हम बदलेंगे या पैसे लौटाएँगे, पिकअप मुफ़्त।' },
      ],
    },
    {
      id: 'privacy', title: 'प्राइवेसी',
      items: [
        'हम सिर्फ़ उतनी जानकारी लेते हैं जितनी सेवा के लिए ज़रूरी है: आपका नाम, फ़ोन, पता और ऑर्डर के आइटम। आप ये ख़ुद व्हाट्सऐप या संपर्क फ़ॉर्म से हमें भेजते हैं।',
        'इनका इस्तेमाल ऑर्डर कन्फ़र्म करने, पैक करने, डिलीवर करने और आपके सवालों के जवाब देने में होता है। हम आपका डेटा बेचते नहीं हैं।',
        'नाम, पता और फ़ोन सिर्फ़ आपका पार्सल पहुँचाने वाले कूरियर के साथ साझा होते हैं।',
        'संपर्क फ़ॉर्म के संदेश एक ईमेल-फ़ॉरवर्डिंग सेवा (Web3Forms) के ज़रिए हमारे इनबॉक्स में पहुँचते हैं।',
        'यह वेबसाइट आपका बैग, भाषा और डिलीवरी की जानकारी आपके अपने ब्राउज़र (लोकल स्टोरेज) में रखती है ताकि लौटने पर मिल जाए। ऑर्डर देने तक हमें कुछ नहीं भेजा जाता। आप इसे ब्राउज़र सेटिंग से कभी भी मिटा सकते हैं।',
        'हम आपका कार्ड, UPI पिन या बैंक पासवर्ड कभी नहीं देखते। भुगतान की जानकारी सिर्फ़ व्हाट्सऐप पर साझा होती है, और पिन या OTP किसी को न बताएँ।',
        `अपनी जानकारी मिटवाने के लिए ${v.email} पर ईमेल करें।`,
      ],
    },
    {
      id: 'grievance', title: 'संपर्क और शिकायत',
      items: [
        `सवाल, शिकायत या सुझाव: ${v.email}${v.phone ? `, या व्हाट्सऐप ${v.phone}` : ''}।`,
        v.grievance ? `शिकायत अधिकारी: ${v.grievance}।` : 'हम शिकायत 48 घंटे में स्वीकार करते हैं और 7 दिन में निपटाने की कोशिश करते हैं।',
      ],
    },
  ],
});

const ur = (v) => ({
  sections: [
    {
      id: 'shipping', title: 'شپنگ اور ڈیلیوری',
      items: [
        'ہم پورے بھارت میں ڈیلیور کرتے ہیں۔ دور دراز کے پن کوڈ میں تھوڑا زیادہ وقت لگ سکتا ہے۔',
        `آرڈر کنفرم ہونے کے ${v.processing} کام کے دنوں کے اندر پیک کر کے کوریئر کو دے دیا جاتا ہے۔`,
        `روانگی کے بعد ڈیلیوری کا وقت: ${v.areaDays}۔`,
        v.shipText,
        'پارسل روانہ ہوتے ہی ٹریکنگ یا کوریئر کی تفصیل واٹس ایپ پر مل جائے گی۔',
        'براہِ کرم لینڈ مارک کے ساتھ مکمل پتہ اور چالو فون نمبر دیں۔ کوریئر والے ڈیلیوری سے پہلے کال کرتے ہیں۔',
        'اگر فون نہ لگنے یا کوئی نہ ملنے سے دو بار ڈیلیوری نہ ہو سکی تو پارسل ہمارے پاس واپس آ جاتا ہے۔ ایڈوانس کا کیا ہوگا، یہ “کیش آن ڈیلیوری” میں دیکھیں۔',
      ],
    },
    {
      id: 'cod', title: 'کیش آن ڈیلیوری اور ایڈوانس',
      items: [
        v.codText,
        'ایڈوانس کوئی اضافی فیس نہیں ہے۔ یہ آپ کے آرڈر کی کل رقم کا ہی حصہ ہے اور اسی میں سے منہا ہوتا ہے۔ کوریئر کو آپ صرف باقی رقم دیتے ہیں۔',
        'اس سے آرڈر کے اصلی ہونے کی تصدیق ہوتی ہے اور شپنگ کا خرچ نکل آتا ہے، کیونکہ واپس آنے والے COD پارسل کا کوریئر خرچ دونوں طرف کا ہمیں اٹھانا پڑتا ہے۔',
        'چاہیں تو پوری رقم UPI سے پہلے ہی ادا کر سکتے ہیں۔ پھر دروازے پر کچھ نہیں دینا ہوگا۔',
        'ہر آرڈر ہم خود واٹس ایپ پر کنفرم کرتے ہیں اور ادائیگی کی تفصیل وہیں دیتے ہیں۔ کسی دوسرے نمبر سے رابطہ کرنے والے کو کبھی رقم نہ دیں۔',
        'اگر آپ بغیر معقول وجہ کے COD پارسل لینے سے انکار کرتے ہیں (مثلاً غلط یا خراب آئٹم نہ ہو) تو شپنگ خرچ کے لیے ایڈوانس رکھ لیا جاتا ہے۔ اگر ہم آرڈر منسوخ کریں یا ڈیلیور نہ کر سکیں تو ایڈوانس پورا واپس ہوتا ہے۔',
      ],
    },
    {
      id: 'returns', title: 'واپسی اور تبادلہ',
      items: [
        `ڈیلیوری کے ${v.days} دن کے اندر آپ واپسی یا تبادلہ مانگ سکتے ہیں۔`,
        'آئٹم بغیر پہنا، بغیر دھلا اور بغیر خرابی کا ہو، ٹیگ اور اصل پیکنگ کے ساتھ۔',
        'پہلا سائز کا تبادلہ مفت ہے۔ ہم پک اپ کروائیں گے اور اسٹاک کے مطابق نیا سائز بھیجیں گے۔',
        'غلط آئٹم، تیاری کی خرابی یا راستے میں ٹوٹ پھوٹ؟ ڈیلیوری کے 48 گھنٹوں کے اندر صاف تصاویر کے ساتھ بتائیں۔ ہم بدل دیں گے یا پوری رقم لوٹائیں گے، اور پک اپ ہماری طرف سے۔ ہم پارسل کھولتے وقت، بغیر کٹ کے، ان باکسنگ ویڈیو ریکارڈ کرنے کا مشورہ دیتے ہیں۔ یہ بہترین ثبوت ہے اور دعویٰ جلد نمٹتا ہے۔',
        'واپس نہیں ہوں گے: پہنے، دھلے یا بدلے ہوئے آئٹم؛ بغیر ٹیگ کے آئٹم؛ فائنل سیل یا “نو ریٹرن” والے آئٹم؛ اور کسٹم پیس۔',
        'صفائی اور کوالٹی کی وجہ سے پرفیوم، داغ یا ڈیلیوری کے بعد ہوئی خرابی والے آئٹم ہم واپس نہیں لے سکتے۔',
        'شروع کرنے کے لیے آرڈر کی تفصیل اور تصاویر کے ساتھ ہمیں واٹس ایپ کریں۔ ہم ایک کام کے دن میں جواب دیتے ہیں۔',
      ],
    },
    {
      id: 'refunds', title: 'رقم کی واپسی اور منسوخی',
      items: [
        `واپس کیا ہوا آئٹم ملنے اور جانچنے کے بعد ${v.refund} کام کے دنوں میں رقم واپس ہو جاتی ہے۔`,
        'رقم اسی طریقے سے واپس جاتی ہے جس سے آپ نے ادا کی تھی: UPI یا بینک ٹرانسفر۔ ہم واٹس ایپ پر آپ کی UPI ID یا بینک تفصیل مانگیں گے۔',
        'اگر واپسی ہماری غلطی، خرابی یا ٹوٹ پھوٹ کی وجہ سے ہو تو آپ کی دی ہوئی شپنگ فیس (اگر کوئی ہو) بھی لوٹائی جاتی ہے۔',
        'آرڈر روانہ ہونے سے پہلے آپ مفت منسوخ کر سکتے ہیں۔ بس واٹس ایپ پر بتائیں، ایڈوانس یا ادائیگی پوری لوٹا دی جائے گی۔',
        'روانہ ہونے کے بعد آرڈر منسوخ نہیں ہو سکتا، لیکن پہنچنے پر آپ واپسی کی پالیسی کے تحت لوٹا سکتے ہیں۔',
        'اگر پرومو کوڈ لگا تھا اور آرڈر کا کچھ حصہ لوٹایا گیا تو اس آئٹم پر آپ نے جتنا اصل میں دیا، اتنی رقم واپس ہوگی۔',
      ],
    },
    {
      id: 'faq', title: 'اکثر پوچھے جانے والے سوالات',
      faq: [
        { q: 'کیا اکاؤنٹ بنانا ضروری ہے؟', a: 'نہیں۔ بیگ میں پیس ڈالیں، ڈیلیوری کی تفصیل بھریں اور آرڈر واٹس ایپ پر ہمیں بھیج دیں۔ بس۔' },
        { q: 'آپ کن شہروں میں ڈیلیور کرتے ہیں؟', a: `${v.areas}۔ بیگ میں پن کوڈ لکھتے ہی فوراً پتہ چل جائے گا۔` },
        { q: 'ایڈوانس کیسے کام کرتا ہے؟', a: v.advFaq },
        { q: 'اپنا سائز کیسے چنوں؟', a: 'سائز گائیڈ کھولیں، اپنی فٹ والی ٹی شرٹ سے ملائیں، یا ہمیں پیغام کریں۔ دو سائز کے بیچ ہوں تو کھلی فٹنگ کے لیے ایک سائز بڑا لیں۔' },
        { q: 'آرڈر کے بعد پتہ بدل سکتا ہوں؟', a: 'جی ہاں، آرڈر روانہ ہونے تک۔ جلد از جلد واٹس ایپ پر بتائیں۔' },
        { q: 'کیا تھوک یا کسٹم آرڈر ملتے ہیں؟', a: 'جی ہاں۔ تھوک کے صفحے پر جا کر تفصیل بھیجیں۔' },
        { q: 'پرومو کوڈ کیسے لگاؤں؟', a: 'بیگ کھولیں، پرومو کوڈ کے باکس میں کوڈ لکھیں اور لگائیں دبائیں۔ رعایت آرڈر کے خلاصے میں نظر آئے گی۔' },
        { q: 'غلط یا خراب آئٹم ملا۔', a: 'ہمیں افسوس ہے۔ 48 گھنٹوں کے اندر تصاویر کے ساتھ پیغام کریں، ہم بدلیں گے یا رقم لوٹائیں گے، پک اپ مفت۔' },
      ],
    },
    {
      id: 'privacy', title: 'پرائیویسی',
      items: [
        'ہم صرف اتنی معلومات لیتے ہیں جتنی خدمت کے لیے ضروری ہے: آپ کا نام، فون، پتہ اور آرڈر کے آئٹمز۔ آپ یہ خود واٹس ایپ یا رابطہ فارم سے ہمیں بھیجتے ہیں۔',
        'ان کا استعمال آرڈر کنفرم کرنے، پیک کرنے، ڈیلیور کرنے اور آپ کے سوالات کے جواب دینے میں ہوتا ہے۔ ہم آپ کا ڈیٹا بیچتے نہیں ہیں۔',
        'نام، پتہ اور فون صرف آپ کا پارسل پہنچانے والے کوریئر کے ساتھ شیئر ہوتے ہیں۔',
        'رابطہ فارم کے پیغامات ایک ای میل فارورڈنگ سروس (Web3Forms) کے ذریعے ہمارے ان باکس میں پہنچتے ہیں۔',
        'یہ ویب سائٹ آپ کا بیگ، زبان اور ڈیلیوری کی تفصیل آپ کے اپنے براؤزر (لوکل اسٹوریج) میں رکھتی ہے تاکہ واپسی پر مل جائے۔ آرڈر دینے تک ہمیں کچھ نہیں بھیجا جاتا۔ آپ اسے براؤزر سیٹنگ سے کبھی بھی مٹا سکتے ہیں۔',
        'ہم آپ کا کارڈ، UPI پن یا بینک پاس ورڈ کبھی نہیں دیکھتے۔ ادائیگی کی تفصیل صرف واٹس ایپ پر شیئر ہوتی ہے، اور پن یا OTP کسی کو نہ بتائیں۔',
        `اپنی معلومات مٹوانے کے لیے ${v.email} پر ای میل کریں۔`,
      ],
    },
    {
      id: 'grievance', title: 'رابطہ اور شکایات',
      items: [
        `سوال، شکایت یا مشورہ: ${v.email}${v.phone ? `، یا واٹس ایپ ${v.phone}` : ''}۔`,
        v.grievance ? `شکایتی افسر: ${v.grievance}۔` : 'ہم شکایت 48 گھنٹوں میں تسلیم کرتے ہیں اور 7 دن میں نمٹانے کی کوشش کرتے ہیں۔',
      ],
    },
  ],
});
