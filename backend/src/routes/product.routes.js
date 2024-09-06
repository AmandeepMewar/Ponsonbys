import express from 'express';
import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';
import {
  getAllProducts,
  getFeaturedProducts,
  createProduct,
  deleteProduct,
  getRecommendedProducts,
  getProductsByCategory,
  toggleFeaturedProduct,
} from '../controllers/product.controller.js';
import { UploadImage } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/recommendations', getRecommendedProducts);
router.post('/', protectRoute, adminRoute, UploadImage, createProduct);
router.patch(
  '/:id',
  protectRoute,
  adminRoute,
  UploadImage,
  toggleFeaturedProduct
);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);

export default router;
