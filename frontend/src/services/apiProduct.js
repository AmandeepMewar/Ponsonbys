export async function createProduct(newProduct) {
  const formData = new FormData();
  formData.append('name', newProduct.productName);
  formData.append('description', newProduct.description);
  formData.append('price', newProduct.price);
  formData.append('category', newProduct.category);
  formData.append('image', newProduct.image);

  const response = await fetch('/api/products/', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
}

export async function getAllProducts() {
  const response = await fetch('/api/products/');

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data.result;
}

export async function deleteProduct(id) {
  const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
}

export async function toggleFeaturedProduct(id) {
  const response = await fetch(`/api/products/${id}`, { method: 'PATCH' });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data.result;
}

export async function getProductsByCategory(category) {
  const response = await fetch(`/api/products/category/${category}`);

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data.result;
}

export async function getRecommendedProducts() {
  const response = await fetch('/api/products/recommendations');

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data.result;
}

export async function getFeaturedProducts() {
  const response = await fetch('/api/products/featured/');

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data.result;
}
