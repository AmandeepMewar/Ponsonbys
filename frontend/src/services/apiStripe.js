export async function createSession({ cart, coupon }) {
  const response = await fetch('/api/payments/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      products: cart,
      couponCode: coupon ? coupon.code : null,
    }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data.result;
}

export async function checkoutSuccess(sessionId) {
  if (!sessionId) return null;

  const response = await fetch('/api/payments/checkout-success', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
}
