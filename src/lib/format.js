export const money = (n) =>
  typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : null;

// percent off, only when a real MRP above the price is provided
export const percentOff = (price, mrp) =>
  typeof price === 'number' && typeof mrp === 'number' && mrp > price
    ? Math.round(((mrp - price) / mrp) * 100)
    : 0;
