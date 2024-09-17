import { motion } from 'framer-motion';
import Loader from '../../ui/Loader';
import NotFound from '../../ui/NotFound';
import { useProfile } from '../authentication/useProfile';
import CartItem from './CartItem';
import Recommendations from './Recommendations';
import { useGetCartProducts } from './useGetCartProducts';

export default function CartProducts() {
  const { cart = [], isLoading } = useGetCartProducts();
  const { user } = useProfile();

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
          <div className='space-y-6'>
            {cart.map((product) => (
              <CartItem key={product._id} product={product} />
            ))}
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
        ></motion.div>
      )}
    </div>
  );
}
