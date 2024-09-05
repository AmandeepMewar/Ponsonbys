import express from 'express';
import { protectRoute, adminRoute } from '../middlewares/auth.middleware.js';
import {
  getAllProducts,
  createProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { UploadImage } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts);
router.post('/', protectRoute, adminRoute, UploadImage, createProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);

export default router;
