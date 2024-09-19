import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import { useApplyCoupon } from './useApplyCoupon';
import { useCoupon } from './useCoupon';

export default function CouponCard({ isCouponApplied, setIsCouponApplied }) {
  const { coupon } = useCoupon();
  const [codeInput, setCodeInput] = useState('');
  const { applyCoupon, isLoading, isSuccess } = useApplyCoupon();

  function handleCoupon() {
    applyCoupon(codeInput);
  }

  function handleRemoveCoupon() {
    setIsCouponApplied(false);
    setCodeInput('');
  }

  useEffect(
    function () {
      if (isSuccess) setIsCouponApplied(true);
    },
    [isSuccess, setIsCouponApplied]
  );

  return (
    <motion.div
      className='space-y-4 rounded-lg bg-yellow-100 p-4 shadow-lg sm:p-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className='space-y-4'>
        <div>
          <label
            htmlFor='voucher'
            className='mb-2 block text-sm font-medium text-yellow-800'
          >
            Do you have a voucher or gift card?
          </label>
          <input
            type='text'
            id='voucher'
            className='focus:ring--00 block w-full rounded-lg border border-yellow-800 bg-yellow-50 p-2.5 text-sm text-yellow-800 placeholder-yellow-700 focus:border-orange-500 disabled:bg-gray-200'
            placeholder='Enter code here'
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            required
            disabled={isCouponApplied || isLoading}
          />
        </div>

        <Button
          type='button'
          className='flex w-full items-center justify-center rounded-lg bg-yellow-700 px-5 py-2.5 text-sm font-medium text-yellow-50 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600 disabled:cursor-not-allowed disabled:bg-yellow-700 disabled:opacity-50'
          onClick={handleCoupon}
          disabled={isCouponApplied || isLoading}
        >
          {isCouponApplied ? 'Applied' : 'Apply Code'}
        </Button>
      </div>

      {isCouponApplied && coupon && (
        <div className='mt-4 flex flex-col items-center'>
          <h3 className='text-md font-semibold text-yellow-700'>
            Applied Coupon
          </h3>

          <p className='mt-2 text-sm font-medium tracking-widest text-yellow-700'>
            {coupon.code} - {coupon.discountPercentage}% off
          </p>

          <Button
            type='button'
            className='mt-2 flex w-full items-center justify-center rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500'
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </Button>
        </div>
      )}

      {coupon && !isCouponApplied && (
        <div className='mt-4 flex flex-col items-center'>
          <h3 className='text-sm font-medium text-yellow-800'>
            Your Available Coupon:
          </h3>
          <p className='mt-2 text-sm text-yellow-700'>
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </motion.div>
  );
}
