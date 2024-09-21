import { motion } from 'framer-motion';
import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { url: 'create-product', label: 'Add Product', icon: PlusCircle },
  { url: 'products', label: 'Product List', icon: ShoppingBasket },
  { url: 'analytics', label: 'Sales Analytics', icon: BarChart },
];

export default function Dashboard() {
  const location = useLocation().pathname.split('/')[2];

  return (
    <div className='relative overflow-hidden'>
      <div className='container relative z-10 mx-auto px-4 py-8 md:py-12'>
        <motion.h1
          className='text-center text-2xl font-bold text-yellow-800 md:text-4xl'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>
      </div>
      <div className='mb-8 flex flex-wrap justify-center gap-3'>
        {tabs.map((tab) => (
          <Link
            to={tab.url}
            key={tab.url}
            className={`mx-2 flex items-center rounded-md px-2 py-2 text-sm transition-colors duration-200 md:px-4 md:py-2 md:text-base ${
              location === tab.url
                ? 'bg-orange-500 text-yellow-50'
                : 'bg-yellow-800 text-yellow-50 hover:bg-orange-500'
            }`}
          >
            <tab.icon className='mr-2 h-5 w-5' />
            <span>{tab.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
