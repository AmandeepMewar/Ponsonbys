import express from 'express';
import {
  login,
  signup,
  logout,
  refreshTokens,
} from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-tokens', refreshTokens);

export default router;
