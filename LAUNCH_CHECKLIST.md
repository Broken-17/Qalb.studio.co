# Before Qalb Studio goes live

- [ ] Review all product prices, MRP, fabric, fit, sizes, colors, stock and image rights.
- [ ] Replace any sample/demo promo code (QALB10) or disable it. Promo discounts are currently a front-end demonstration, not a secure server-side promotion system.
- [ ] Confirm exact COD advance amount, shipping fee, delivery timelines, eligible PIN codes and refund treatment.
- [ ] Have the shipping/returns/cancellation policy reviewed for your actual operations and applicable Indian consumer rules. Current wording is a cautious draft, not legal advice.
- [ ] Add a verified size chart for each relevant product.
- [ ] Configure Formspree: create a form at Formspree, set `VITE_FORM_ENDPOINT` in a local `.env` file using `.env.example`, and test the contact form. Never commit secret keys.
- [ ] Verify WhatsApp, Instagram and email links on desktop and mobile.
- [ ] Test cart, quantity changes, product stock, promo code, mobile navigation, language preference and WhatsApp order summary.
- [ ] Add privacy policy, terms, and any required business/GST details before accepting online payments.
- [ ] Test a full order enquiry and manually confirm order totals before dispatch.
