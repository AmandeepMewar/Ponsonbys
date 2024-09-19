import { motion } from 'framer-motion';
import { useState } from 'react';

import Button from '../../../ui/Button';
import Loader from '../../../ui/Loader';
import NotFound from '../../../ui/NotFound';
import { useProfile } from '../../authentication/hooks/useProfile';
import { useGetCartProducts } from '../hooks/useGetCartProducts';
import { useRemoveFromCart } from '../hooks/useRemoveFromCart';
import CartItem from './CartItem';
import CouponCard from './CouponCard';
import OrderSummary from './OrderSummary';
import Recommendations from './Recommendations';

export default function CartProducts() {
  const { cart = [], isLoadingCart } = useGetCartProducts();
  const { user } = useProfile();
  const { removeFromCart, isLoadingRemove } = useRemoveFromCart();

  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const isLoading = isLoadingCart || isLoadingRemove;

  if (isLoading) return <Loader />;

  return (
    <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
      <motion.div
        className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className='mb-8 ml-2 text-2xl font-semibold'>
          Your cart, {user?.name}
        </h2>
        {cart.length === 0 ? (
          <NotFound className='inline'>
            Nothing here yet. Start shopping to add items to your cart!
          </NotFound>
        ) : (
          <div className='flex flex-col items-center space-y-6'>
            {cart.map((product) => (
              <CartItem key={product._id} product={product} />
            ))}
            <Button
              className='flex w-1/2 justify-center rounded-md border border-transparent bg-yellow-700 px-4 py-2 text-sm font-medium text-yellow-50 shadow-sm transition duration-150 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              onClick={() => removeFromCart()}
              disabled={isLoading}
            >
              Clear Cart
            </Button>
          </div>
        )}
        {cart.length > 0 && <Recommendations />}
      </motion.div>

      {cart.length > 0 && (
        <motion.div
          className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <OrderSummary
            isCouponApplied={isCouponApplied}
            setIsCouponApplied={setIsCouponApplied}
          />
          <CouponCard
            isCouponApplied={isCouponApplied}
            setIsCouponApplied={setIsCouponApplied}
          />
        </motion.div>
      )}
    </div>
  );
}
