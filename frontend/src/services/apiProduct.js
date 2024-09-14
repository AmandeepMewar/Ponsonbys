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

  console.log(response.ok);
  if (!response.ok) throw new Error(data.message);

  return data.result;
}
