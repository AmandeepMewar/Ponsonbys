export function formatCurrency(price) {
  const hasDecimal = price % 1 !== 0;

  const formattedPrice = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(price);

  return formattedPrice;
}

export function calculateTotals(cart, coupon, isCouponApplied) {
  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let total = subTotal;

  if (coupon && isCouponApplied) {
    const discount = subTotal * (coupon.discountPercentage / 100);
    total = subTotal - discount;
  }

  return { total, subTotal };
}
