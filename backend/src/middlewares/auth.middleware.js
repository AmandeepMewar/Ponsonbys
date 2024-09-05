import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export async function protectRoute(req, res, next) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized - No access token provided',
      });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message: 'User not found',
      });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log('Error: ', error.message);
    return res.status(401).json({
      status: 'fail',
      message: 'Unauthorized - Invalid access token',
    });
  }
}

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res
      .status(403)
      .json({ status: 'fail', message: 'Access denied - Admin only' });
  }
};
