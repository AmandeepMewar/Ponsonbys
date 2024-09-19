import { motion } from 'framer-motion';
import ProductTable from './ProductTable';
export default function ProductList() {
  return (
    <motion.div
      className='mx-auto mb-12 max-w-4xl overflow-hidden rounded-lg bg-yellow-100 shadow-lg'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ProductTable />
    </motion.div>
  );
}
