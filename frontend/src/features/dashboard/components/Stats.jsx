import { IndianRupee, Package, ShoppingCart, Users } from 'lucide-react';
import { formatCurrency } from '../../../utils/helpers';
import StatCard from './StatCard';
export default function Stats({ analyticsData }) {
  return (
    <div className='mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      <StatCard title='Users' value={analyticsData.users} icon={Users} />
      <StatCard
        title='Products'
        value={analyticsData.products}
        icon={Package}
        import
      />
      <StatCard
        title='Sales'
        value={analyticsData.totalSales}
        icon={ShoppingCart}
      />
      <StatCard
        title='Revenue'
        value={`${formatCurrency(analyticsData.totalRevenue)}`}
        icon={IndianRupee}
      />
    </div>
  );
}
