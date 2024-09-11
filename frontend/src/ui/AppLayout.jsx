import { Outlet } from 'react-router-dom';
import Header from './Header';
export default function AppLayout() {
  return (
    <div className='flex min-h-screen flex-col bg-yellow-50 text-yellow-900'>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
