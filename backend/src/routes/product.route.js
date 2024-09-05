import express from 'express';
import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';
import {
  getAllProducts,
  createProduct,
} from '../controllers/product.controller.js';
import { UploadImage } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts);
router.post('/', protectRoute, adminRoute, UploadImage, createProduct);
export default router;
