import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Loader from '../../ui/Loader';
import NotFound from '../../ui/NotFound';
import ProductItem from './ProductItem';
import { useProductByCategory } from './useProductByCategory';

export default function CategoryProducts() {
  const { category } = useParams();
  const { data: products, isLoading } = useProductByCategory();

  if (isLoading) return <Loader />;

  return (
    <div className='min-h-screen'>
      <div className='relative z-10 mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
        <motion.h1
          className='mb-8 text-center text-4xl font-bold text-yellow-800 sm:text-5xl'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>

        <motion.div
          className='grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {products?.length === 0 && (
            <NotFound className='col-span-full text-center'>
              Looks like we&apos;re out of {category} in this category. Check
              back later for more styles!
            </NotFound>
          )}

          {products?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
