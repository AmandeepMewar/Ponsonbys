import { Outlet } from 'react-router-dom';
import Header from './Header';
export default function AppLayout() {
  return (
    <div className='min-h-screen bg-yellow-50 text-yellow-900 flex flex-col'>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
