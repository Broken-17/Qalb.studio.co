/* TERMS & CONDITIONS page. Numbers (days, areas, advance) come from src/config/store.js.
   DRAFT: have a lawyer or CA review before launch. */
import { vars } from './policies';

export function terms(lang) {
  const v = vars(lang);
  return ({ en, hi, ur }[lang] || en)(v);
}

const en = (v) => [
  { id: 'orders', title: '1. Orders', items: [
    'An order is complete only after we confirm it with you on WhatsApp. Placing an order on the website or sending us a message is a request, not a confirmed sale.',
    'We may decline or cancel an order because of stock, a pricing error, an undeliverable address or suspected misuse. Anything you paid is refunded in full.',
    `We currently deliver in ${v.areas} only. Orders to other places cannot be accepted yet.`,
  ] },
  { id: 'price', title: '2. Prices & payment', items: [
    'Prices are in Indian rupees and include applicable taxes. A confirmed order keeps the price it was confirmed at.',
    'Cash on delivery needs a small advance to confirm the order. The advance is part of your total, not an extra charge. You pay the balance to the courier.',
    'Promo codes are valid only as stated (minimum order, expiry date), cannot be combined unless we say so, and can be withdrawn at any time.',
    'Never pay anyone who contacts you from a number other than our official WhatsApp number. We will never ask for your card PIN or an OTP.',
  ] },
  { id: 'delivery', title: '3. Delivery', items: [
    `Delivery usually takes ${v.areaDays} after dispatch. These are estimates, and weather, strikes or courier delays can add time.`,
    'Please give a complete address and a phone number that works. If delivery fails twice because you are unreachable, the parcel returns to us, and the advance is kept to cover shipping.',
    'Risk passes to you when the parcel is delivered to your address.',
  ] },
  { id: 'returns', title: '4. Returns & refunds (3-7 days)', items: [
    `Tell us within ${v.days} days of delivery if you want to return or exchange an item. Damaged, defective or wrong items must be reported within 48 hours.`,
    `Once we approve a return, pickup, checking and refund are completed within ${v.refund} working days.`,
    'Items must be unworn, unwashed and undamaged, with tags and original packaging.',
    'Refunds go back by UPI or bank transfer to the person who paid. Your first size exchange is free, subject to stock.',
  ] },
  { id: 'video', title: '5. Unboxing video (please record one)', items: [
    'Please record an unboxing video of every order: start with the sealed parcel, show the address label, and keep filming without cuts until you have shown each item.',
    'For damaged, defective or wrong items we may ask for this video and clear photos. It is the quickest way for us to approve your replacement or refund.',
    'A claim without proof can take longer to verify, and we may be unable to approve it.',
  ] },
  { id: 'cancel', title: '6. Cancellations', items: [
    'You can cancel for free before the order is dispatched, by messaging us on WhatsApp. Your advance or payment is refunded in full.',
    'After dispatch an order cannot be cancelled, but you can still return it as described above.',
  ] },
  { id: 'use', title: '7. Using this website', items: [
    'The QALB STUDIO name, logo, artwork, photos and text belong to us. Please do not copy or reuse them without permission.',
    'Colours may look slightly different on your screen. Product photos are for guidance, and small variations in print or fabric can happen.',
    'We try to keep information accurate but do not promise the site is always free of errors or interruptions.',
  ] },
  { id: 'law', title: '8. Liability & governing law', items: [
    'To the extent the law allows, our liability for any order is limited to the amount you paid for it.',
    'These terms are governed by the laws of India. Disputes are subject to the courts of Visakhapatnam, Andhra Pradesh.',
    `Questions or complaints: ${v.email}${v.phone ? `, WhatsApp ${v.phone}` : ''}.`,
  ] },
];

const hi = (v) => [
  { id: 'orders', title: '1. ऑर्डर', items: [
    'ऑर्डर तभी पूरा माना जाता है जब हम उसे व्हाट्सऐप पर आपसे कन्फ़र्म कर लें। वेबसाइट पर ऑर्डर देना या मैसेज भेजना एक अनुरोध है, पक्की बिक्री नहीं।',
    'स्टॉक, क़ीमत की ग़लती, डिलीवर न हो सकने वाले पते या दुरुपयोग के शक पर हम ऑर्डर मना या रद्द कर सकते हैं। आपका दिया पैसा पूरा लौटाया जाएगा।',
    `फ़िलहाल हम सिर्फ़ ${v.areas} में डिलीवर करते हैं। दूसरी जगहों के ऑर्डर अभी नहीं ले सकते।`,
  ] },
  { id: 'price', title: '2. क़ीमत और भुगतान', items: [
    'क़ीमतें भारतीय रुपये में हैं और लागू टैक्स सहित हैं। कन्फ़र्म ऑर्डर की क़ीमत वही रहती है।',
    'कैश ऑन डिलीवरी में ऑर्डर पक्का करने के लिए छोटा एडवांस देना होता है। एडवांस आपके कुल बिल का हिस्सा है, अतिरिक्त शुल्क नहीं। बाक़ी रक़म कूरियर को दें।',
    'प्रोमो कोड सिर्फ़ बताई गई शर्तों (न्यूनतम ऑर्डर, एक्सपायरी) पर मान्य हैं, जब तक हम न कहें साथ में नहीं लग सकते, और कभी भी वापस लिए जा सकते हैं।',
    'हमारे आधिकारिक व्हाट्सऐप नंबर के अलावा किसी नंबर से संपर्क करने वाले को कभी पैसे न दें। हम कभी कार्ड पिन या OTP नहीं माँगते।',
  ] },
  { id: 'delivery', title: '3. डिलीवरी', items: [
    `डिस्पैच के बाद डिलीवरी में आमतौर पर ${v.areaDays} लगते हैं। यह अनुमान है, मौसम, हड़ताल या कूरियर की देरी से समय बढ़ सकता है।`,
    'कृपया पूरा पता और चालू फ़ोन नंबर दें। अगर आप न मिलने से दो बार डिलीवरी नहीं हो पाई, तो पार्सल हमारे पास लौट आता है और शिपिंग ख़र्च के लिए एडवांस रख लिया जाता है।',
    'पार्सल आपके पते पर पहुँचते ही उसकी ज़िम्मेदारी आपकी हो जाती है।',
  ] },
  { id: 'returns', title: '4. रिटर्न और रिफ़ंड (3-7 दिन)', items: [
    `रिटर्न या एक्सचेंज चाहिए तो डिलीवरी के ${v.days} दिन के भीतर बताएँ। ख़राब, दोषपूर्ण या ग़लत आइटम की सूचना 48 घंटे के भीतर दें।`,
    `रिटर्न मंज़ूर होने के बाद पिकअप, जाँच और रिफ़ंड ${v.refund} कार्य दिवस में पूरा होता है।`,
    'आइटम बिना पहना, बिना धुला और बिना ख़राबी का हो, टैग और असली पैकिंग के साथ।',
    'रिफ़ंड भुगतान करने वाले को UPI या बैंक ट्रांसफ़र से जाता है। पहला साइज़ एक्सचेंज मुफ़्त है, स्टॉक के अनुसार।',
  ] },
  { id: 'video', title: '5. अनबॉक्सिंग वीडियो (कृपया बनाएँ)', items: [
    'हर ऑर्डर का अनबॉक्सिंग वीडियो बनाएँ: सील बंद पार्सल से शुरू करें, पते का लेबल दिखाएँ, और हर आइटम दिखाने तक बिना कट के रिकॉर्ड करते रहें।',
    'ख़राब, दोषपूर्ण या ग़लत आइटम के लिए हम यह वीडियो और साफ़ फ़ोटो माँग सकते हैं। रिप्लेसमेंट या रिफ़ंड मंज़ूर करने का यह सबसे तेज़ तरीक़ा है।',
    'बिना सबूत के दावे की जाँच में ज़्यादा समय लग सकता है, और हम उसे मंज़ूर न कर पाएँ।',
  ] },
  { id: 'cancel', title: '6. कैंसलेशन', items: [
    'ऑर्डर रवाना होने से पहले आप व्हाट्सऐप पर बताकर मुफ़्त रद्द कर सकते हैं। आपका एडवांस या भुगतान पूरा लौटाया जाएगा।',
    'रवाना होने के बाद ऑर्डर रद्द नहीं होता, पर ऊपर बताए अनुसार रिटर्न किया जा सकता है।',
  ] },
  { id: 'use', title: '7. इस वेबसाइट का उपयोग', items: [
    'QALB STUDIO का नाम, लोगो, आर्टवर्क, फ़ोटो और लेख हमारे हैं। कृपया बिना इजाज़त कॉपी या दोबारा इस्तेमाल न करें।',
    'आपकी स्क्रीन पर रंग थोड़े अलग दिख सकते हैं। प्रोडक्ट फ़ोटो सिर्फ़ मार्गदर्शन के लिए हैं, प्रिंट या कपड़े में मामूली फ़र्क़ हो सकता है।',
    'हम जानकारी सही रखने की कोशिश करते हैं, पर साइट हमेशा त्रुटि-रहित या बिना रुकावट चलेगी, इसका वादा नहीं करते।',
  ] },
  { id: 'law', title: '8. ज़िम्मेदारी और लागू क़ानून', items: [
    'क़ानून जितनी इजाज़त दे, किसी भी ऑर्डर के लिए हमारी ज़िम्मेदारी उस ऑर्डर पर आपके दिए पैसे तक सीमित है।',
    'ये शर्तें भारत के क़ानून के अधीन हैं। विवाद विशाखापट्टनम, आंध्र प्रदेश की अदालतों के अधीन होंगे।',
    `सवाल या शिकायत: ${v.email}${v.phone ? `, व्हाट्सऐप ${v.phone}` : ''}।`,
  ] },
];

const ur = (v) => [
  { id: 'orders', title: '1. آرڈر', items: [
    'آرڈر تبھی مکمل مانا جاتا ہے جب ہم اسے واٹس ایپ پر آپ سے کنفرم کر لیں۔ ویب سائٹ پر آرڈر دینا یا پیغام بھیجنا ایک درخواست ہے، پکی فروخت نہیں۔',
    'اسٹاک، قیمت کی غلطی، ڈیلیور نہ ہو سکنے والے پتے یا غلط استعمال کے شک پر ہم آرڈر منع یا منسوخ کر سکتے ہیں۔ آپ کی دی ہوئی رقم پوری لوٹائی جائے گی۔',
    `فی الحال ہم صرف ${v.areas} میں ڈیلیور کرتے ہیں۔ دوسری جگہوں کے آرڈر ابھی نہیں لے سکتے۔`,
  ] },
  { id: 'price', title: '2. قیمت اور ادائیگی', items: [
    'قیمتیں بھارتی روپوں میں ہیں اور قابلِ اطلاق ٹیکس شامل ہیں۔ کنفرم آرڈر کی قیمت وہی رہتی ہے۔',
    'کیش آن ڈیلیوری میں آرڈر پکا کرنے کے لیے چھوٹا ایڈوانس دینا ہوتا ہے۔ ایڈوانس آپ کے کل بل کا حصہ ہے، اضافی چارج نہیں۔ باقی رقم کوریئر کو دیں۔',
    'پرومو کوڈ صرف بتائی گئی شرائط (کم از کم آرڈر، میعاد) پر قابلِ استعمال ہیں، جب تک ہم نہ کہیں ساتھ نہیں لگ سکتے، اور کبھی بھی واپس لیے جا سکتے ہیں۔',
    'ہمارے سرکاری واٹس ایپ نمبر کے علاوہ کسی نمبر سے رابطہ کرنے والے کو کبھی رقم نہ دیں۔ ہم کبھی کارڈ پن یا OTP نہیں مانگتے۔',
  ] },
  { id: 'delivery', title: '3. ڈیلیوری', items: [
    `روانگی کے بعد ڈیلیوری میں عموماً ${v.areaDays} لگتے ہیں۔ یہ اندازہ ہے، موسم، ہڑتال یا کوریئر کی تاخیر سے وقت بڑھ سکتا ہے۔`,
    'براہِ کرم مکمل پتہ اور چالو فون نمبر دیں۔ اگر آپ کے نہ ملنے سے دو بار ڈیلیوری نہ ہو سکی تو پارسل ہمارے پاس واپس آتا ہے اور شپنگ خرچ کے لیے ایڈوانس رکھ لیا جاتا ہے۔',
    'پارسل آپ کے پتے پر پہنچتے ہی اس کی ذمہ داری آپ کی ہو جاتی ہے۔',
  ] },
  { id: 'returns', title: '4. واپسی اور رقم کی واپسی (3-7 دن)', items: [
    `واپسی یا تبادلہ چاہیے تو ڈیلیوری کے ${v.days} دن کے اندر بتائیں۔ خراب، ناقص یا غلط آئٹم کی اطلاع 48 گھنٹوں کے اندر دیں۔`,
    `واپسی منظور ہونے کے بعد پک اپ، جانچ اور رقم کی واپسی ${v.refund} کام کے دنوں میں مکمل ہوتی ہے۔`,
    'آئٹم بغیر پہنا، بغیر دھلا اور بغیر خرابی کا ہو، ٹیگ اور اصل پیکنگ کے ساتھ۔',
    'رقم ادا کرنے والے کو UPI یا بینک ٹرانسفر سے واپس جاتی ہے۔ پہلا سائز کا تبادلہ مفت ہے، اسٹاک کے مطابق۔',
  ] },
  { id: 'video', title: '5. ان باکسنگ ویڈیو (براہِ کرم بنائیں)', items: [
    'ہر آرڈر کی ان باکسنگ ویڈیو بنائیں: سیل بند پارسل سے شروع کریں، پتے کا لیبل دکھائیں، اور ہر آئٹم دکھانے تک بغیر کٹ کے ریکارڈنگ جاری رکھیں۔',
    'خراب، ناقص یا غلط آئٹم کے لیے ہم یہ ویڈیو اور صاف تصاویر مانگ سکتے ہیں۔ تبدیلی یا رقم کی واپسی منظور کرنے کا یہ تیز ترین طریقہ ہے۔',
    'بغیر ثبوت کے دعوے کی جانچ میں زیادہ وقت لگ سکتا ہے، اور ہم اسے منظور نہ کر پائیں۔',
  ] },
  { id: 'cancel', title: '6. منسوخی', items: [
    'آرڈر روانہ ہونے سے پہلے آپ واٹس ایپ پر بتا کر مفت منسوخ کر سکتے ہیں۔ آپ کا ایڈوانس یا ادائیگی پوری لوٹائی جائے گی۔',
    'روانہ ہونے کے بعد آرڈر منسوخ نہیں ہوتا، مگر اوپر بتائے گئے طریقے سے واپس کیا جا سکتا ہے۔',
  ] },
  { id: 'use', title: '7. اس ویب سائٹ کا استعمال', items: [
    'QALB STUDIO کا نام، لوگو، آرٹ ورک، تصاویر اور تحریر ہماری ہیں۔ براہِ کرم اجازت کے بغیر نقل یا دوبارہ استعمال نہ کریں۔',
    'آپ کی اسکرین پر رنگ تھوڑے مختلف نظر آ سکتے ہیں۔ پروڈکٹ کی تصاویر صرف رہنمائی کے لیے ہیں، پرنٹ یا کپڑے میں معمولی فرق ہو سکتا ہے۔',
    'ہم معلومات درست رکھنے کی کوشش کرتے ہیں، مگر سائٹ ہمیشہ غلطی سے پاک یا بلا رکاوٹ چلے گی، اس کا وعدہ نہیں کرتے۔',
  ] },
  { id: 'law', title: '8. ذمہ داری اور لاگو قانون', items: [
    'قانون جتنی اجازت دے، کسی بھی آرڈر کے لیے ہماری ذمہ داری اس آرڈر پر آپ کی دی ہوئی رقم تک محدود ہے۔',
    'یہ شرائط بھارت کے قانون کے تابع ہیں۔ تنازعات وشاکھاپٹنم، آندھرا پردیش کی عدالتوں کے تابع ہوں گے۔',
    `سوال یا شکایت: ${v.email}${v.phone ? `، واٹس ایپ ${v.phone}` : ''}۔`,
  ] },
];
