import Product from '../models/product.model.js';

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json({ status: 'success', result: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
