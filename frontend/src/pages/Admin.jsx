import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useProfile } from '../features/authentication/hooks/useProfile';
import Dashboard from '../features/dashboard/components/Dashboard';
export default function Admin() {
  const navigate = useNavigate();
  const { user } = useProfile();

  useEffect(
    function () {
      if (user?.role !== 'admin') navigate('/');
    },
    [user, navigate]
  );
  return (
    <div className='relative min-h-screen overflow-auto'>
      <Dashboard />
      <main className='flex w-full justify-center'>
        <Outlet />
      </main>
    </div>
  );
}
