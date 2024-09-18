export async function getCoupon() {
  const response = await fetch('/api/coupon');

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data.result;
}

export async function validateCoupon(code) {
  if (code === null) return null;
  const response = await fetch('/api/coupon/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
}
