export async function getCartProducts() {
  const response = await fetch('/api/cart/');

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data.result;
}

export async function addToCart(productId) {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId: productId }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
}
