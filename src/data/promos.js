/* ==========================================================================
   PROMO CODES. Customers type a code in their bag.
   To add one: copy a block, change the code, set active: true.
   To stop one: set active: false (or delete it).

   type   'percent'  value = % off the subtotal
          'flat'     value = rupees off
          'freeship' removes the shipping charge (only matters if store.shippingFee > 0)
   min        minimum subtotal needed (rupees)
   maxOff     cap for percent codes (rupees), optional
   expires    last valid day 'YYYY-MM-DD', optional
   firstOrder just a label shown in the bag, optional
   ========================================================================== */

export const promos = [
  { code: 'WELCOME10', type: 'percent', value: 10, min: 999, maxOff: 300, active: false, note: '10% off your first order' },
  { code: 'QALB100', type: 'flat', value: 100, min: 1499, active: false, note: 'Rs 100 off orders above Rs 1,499' },
  { code: 'EID25', type: 'percent', value: 25, min: 0, maxOff: 500, expires: '2027-04-30', active: false, note: 'Festive offer' },
];
