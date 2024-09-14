import { BarChart, PlusCircle, ShoppingBasket } from 'lucide-react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from '../features/dashboard/Dashboard';

const tabs = [
  { id: 'create', label: 'Create Product', icon: PlusCircle },
  { id: 'products', label: 'Products', icon: ShoppingBasket },
  { id: 'analytics', label: 'Analytics', icon: BarChart },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <Dashboard />
      <main className='flex justify-center'>
        <Outlet />
      </main>
    </div>
  );
}
