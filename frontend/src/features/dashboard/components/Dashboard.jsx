import { motion } from 'framer-motion';
import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { url: 'create-product', label: 'Create Product', icon: PlusCircle },
  { url: 'products', label: 'Products', icon: ShoppingBasket },
  { url: 'analytics', label: 'Analytics', icon: BarChart },
];

export default function Dashboard() {
  const location = useLocation().pathname.split('/')[2];

  return (
    <div className='relative overflow-hidden'>
      <div className='container relative z-10 mx-auto px-4 py-16'>
        <motion.h1
          className='text-center text-4xl font-bold text-yellow-800'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>
      </div>
      <div className='mb-8 flex justify-center'>
        {tabs.map((tab) => (
          <Link
            to={tab.url}
            key={tab.url}
            className={`mx-2 flex items-center rounded-md px-4 py-2 transition-colors duration-200 ${
              location === tab.url
                ? 'bg-orange-500 text-yellow-50'
                : 'bg-yellow-800 text-yellow-50 hover:bg-orange-500'
            }`}
          >
            <tab.icon className='mr-2 h-5 w-5' />
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
