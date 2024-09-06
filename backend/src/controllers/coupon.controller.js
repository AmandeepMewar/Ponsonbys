import Coupon from '../models/coupon.model.js';

export async function getCoupon(req, res) {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });

    res.status(200).json({ status: 'success', result: coupon || null });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
