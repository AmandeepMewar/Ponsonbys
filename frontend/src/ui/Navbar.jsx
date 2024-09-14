import {
  House,
  Lock,
  LogIn,
  LogOut,
  ShoppingBag,
  UserPlus,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../features/authentication/useLogout';
import { useProfile } from '../features/authentication/useProfile';
import Button from './Button';

export default function Navbar() {
  const { user } = useProfile();
  const { logout } = useLogout();

  const isAdmin = user?.role === 'admin';
  // const isAdmin = true;

  return (
    <nav className='flex items-center justify-center gap-5 text-sm'>
      <NavLink to='/' className='flex items-center gap-1 hover:text-orange-500'>
        <House size={20} data-testid='home-icon' />
        <span>Home</span>
      </NavLink>
      <NavLink
        to='cart'
        className='flex items-center gap-1 hover:text-orange-500'
      >
        <ShoppingBag size={20} />
        <span>Shopping Bag</span>
        <span className='rounded-full bg-yellow-900 px-1.5 py-0.5 text-xs text-yellow-50'>
          3
        </span>
      </NavLink>
      {isAdmin && (
        <NavLink
          to='/dashboard'
          className='flex items-center gap-1 rounded-md bg-yellow-900 px-2.5 py-1.5 text-yellow-50 hover:bg-yellow-800'
        >
          <Lock size={20} />
          <span>Dashboard</span>
        </NavLink>
      )}
      {user ? (
        <Button
          type=''
          className='flex items-center gap-1 rounded-md bg-orange-500 px-2.5 py-1.5 text-yellow-50 hover:bg-orange-600'
          onClick={logout}
        >
          <LogOut size={20} />
          <span>Log out</span>
        </Button>
      ) : (
        <>
          <NavLink
            to='signup'
            className='flex items-center gap-1 rounded-md bg-yellow-900 px-2.5 py-1.5 text-yellow-50 hover:bg-yellow-800'
          >
            <UserPlus size={20} />
            <span>Sign Up</span>
          </NavLink>

          <NavLink
            to='login'
            className='flex items-center gap-1 rounded-md bg-orange-500 px-2.5 py-1.5 text-yellow-50 hover:bg-orange-600'
          >
            <LogIn size={20} />
            <span>Log In</span>
          </NavLink>
        </>
      )}
    </nav>
  );
}
