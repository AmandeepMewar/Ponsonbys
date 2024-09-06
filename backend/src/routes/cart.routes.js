import express from 'express';
import {
  addToCart,
  removeAllFromCart,
  updateQuantity,
  getCartProducts,
} from '../controllers/cart.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get('/', protectRoute, getCartProducts);
router.post('/', protectRoute, addToCart);
router.delete('/', protectRoute, removeAllFromCart);
router.put('/:productId', protectRoute, updateQuantity);

export default router;
