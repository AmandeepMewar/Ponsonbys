import Product from '../models/product.model.js';
import { redis } from '../utils/redis.js';
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from '../utils/cloudinary.js';

export async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json({ status: 'success', result: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function getFeaturedProducts(req, res) {
  try {
    let featuredProducts = await redis.get('featured_products');
    if (featuredProducts) {
      return res
        .status(200)
        .json({ status: 'success', result: JSON.parse(featuredProducts) });
    }

    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts) {
      res
        .status(401)
        .json({ status: 'fail', message: 'No featured products found' });
    }

    await redis.set('featured_products', JSON.stringify(featuredProducts));

    res.status(200).json({ status: 'success', result: featuredProducts });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function createProduct(req, res) {
  try {
    const { name, description, price, category } = req.body;

    const image = req.file.path;

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

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(401)
        .json({ status: 'fail', message: 'Product not found' });
    }

    if (product.image) {
      const publicId = product.image.split('/').pop().split('.')[0];
      await deleteFromCloudinary(publicId);
    }

    await Product.findByIdAndDelete(req.params.id);

    res
      .status(203)
      .json({ status: 'success', message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function getRecommendedProducts(req, res) {
  try {
    const products = await Product.aggregate([
      { $sample: { size: 3 } },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    res.status(200).json({ status: 'success', result: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function getProductsByCategory(req, res) {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });

    res.status(200).json({ status: 'success', result: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

export async function toggleFeaturedProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductCache();
      res.status(200).json({ status: 'success', result: updatedProduct });
    } else {
      res.status(404).json({ status: 'fail', message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

async function updateFeaturedProductCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set('featured_products', JSON.stringify(featuredProducts));
  } catch (error) {
    console.log(error.message);
  }
}
