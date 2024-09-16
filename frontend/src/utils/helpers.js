export function formatCurrency(price) {
  const formattedPrice = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);

  return formattedPrice;
}
