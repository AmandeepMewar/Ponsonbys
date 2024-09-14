import { Outlet } from 'react-router-dom';
import Dashboard from '../features/dashboard/Dashboard';

export default function Admin() {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      <Dashboard />
      <main className='flex justify-center'>
        <Outlet />
      </main>
    </div>
  );
}
