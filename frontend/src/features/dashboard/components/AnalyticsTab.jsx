import { motion } from 'framer-motion';

import Loader from '../../../ui/Loader';
import { useAnalytics } from '../hooks/useAnalytics';
import AnalyticsChart from './AnalyticsChart';
import Stats from './Stats';

export default function AnalyticsTab() {
  const { data, isLoading } = useAnalytics();

  const { analyticsData = {}, dailySalesData = [] } = data || {};

  if (isLoading) return <Loader />;

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <Stats analyticsData={analyticsData} />
      <motion.div
        className='rounded-lg bg-yellow-100 p-6 shadow-lg'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <div className='p-4'>
          <h1 className='mb-4 text-2xl font-semibold'>
            Sales Revenue Insights from the Last 7 Days
          </h1>

          <AnalyticsChart dailySalesData={dailySalesData} />
        </div>
      </motion.div>
    </div>
  );
}
