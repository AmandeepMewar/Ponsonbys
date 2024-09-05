import Product from '../models/product.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json({ status: 'success', result: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function createProduct(req, res) {
  try {
    const { name, description, price, category } = req.body;

    const image = req.file.path;
    console.log(image);

    const cloudinaryResponse = await uploadOnCloudinary(image);
    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse?.secure_url
        : '',
      category,
    });

    res.status(201).json({ status: 'success', result: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
