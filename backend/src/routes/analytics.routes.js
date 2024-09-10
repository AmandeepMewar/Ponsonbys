import express from 'express';
import { adminRoute, protectRoute } from '../middlewares/auth.middleware.js';
import { getAnalyticsHandler } from '../controllers/analytics.controller.js';
const router = express.Router();

router.get('/', protectRoute, adminRoute, getAnalyticsHandler);

export default router;
