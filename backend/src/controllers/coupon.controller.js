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

export async function validateCoupon(req, res) {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });

    if (!coupon) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Coupon not found' });
    }

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res
        .status(404)
        .json({ status: 'fail', message: 'Coupon expired' });
    }

    res.status(200).json({
      status: 'success',
      result: {
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
