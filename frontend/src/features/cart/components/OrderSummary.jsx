import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../../ui/Button';
import LoaderMini from '../../../ui/LoaderMini';
import { calculateTotals, formatCurrency } from '../../../utils/helpers';
import { useCoupon } from '../hooks/useCoupon';
import { useCreateSession } from '../hooks/useCreateSession';
import { useGetCartProducts } from '../hooks/useGetCartProducts';

export default function OrderSummary({ isCouponApplied }) {
  const { cart } = useGetCartProducts();
  const { coupon } = useCoupon();
  const { createSession, isLoading } = useCreateSession();

  const { total, subTotal } = calculateTotals(cart, coupon, isCouponApplied);
  const savings = (subTotal - total).toFixed(2);

  function handlePayment() {
    createSession({ cart, coupon: isCouponApplied ? coupon : null });
  }

  return (
    <motion.div
      className='space-y-4 rounded-lg bg-yellow-100 p-4 shadow-lg sm:p-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className='text-xl font-semibold text-yellow-800'>Order summary</p>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <dl className='flex items-center justify-between gap-4'>
            <dt className='text-yellow-700'>Original price</dt>
            <dd className='font-medium text-yellow-700'>
              {formatCurrency(subTotal)}
            </dd>
          </dl>

          {savings > 0 && isCouponApplied && (
            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-yellow-700'>Savings</dt>
              <dd className='font-medium text-yellow-700'>
                -{formatCurrency(savings)}
              </dd>
            </dl>
          )}

          {coupon && isCouponApplied && (
            <dl className='flex items-center justify-between gap-4'>
              <dt className='text-base font-normal text-yellow-700'>
                Coupon ({coupon.code})
              </dt>
              <dd className='text-base font-medium text-yellow-700'>
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          <dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
            <dt className='font-bold text-yellow-800'>Total</dt>
            <dd className='text-yellow-800-400 text-base font-bold'>
              {formatCurrency(total)}
            </dd>
          </dl>
        </div>

        <Button
          className='flex w-full items-center justify-center rounded-lg bg-yellow-700 px-5 py-2.5 text-sm font-medium text-yellow-50 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600'
          onClick={handlePayment}
          disabled={isLoading}
        >
          {isLoading ? <LoaderMini /> : 'Proceed to Checkout'}
        </Button>

        <div className='flex items-center justify-center gap-2'>
          <span className='text-sm font-normal text-yellow-700'>or</span>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-sm font-medium text-orange-600 underline hover:text-yellow-800 hover:no-underline'
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
