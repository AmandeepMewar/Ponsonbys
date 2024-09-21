import {
  House,
  Lock,
  LogIn,
  LogOut,
  ShoppingBag,
  UserPlus,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../features/authentication/hooks/useLogout';
import { useProfile } from '../features/authentication/hooks/useProfile';
import Button from './Button';
import LoaderMini from './LoaderMini';

export default function Navbar() {
  const { user } = useProfile();
  const { logout, isLoading } = useLogout();

  const isAdmin = user?.role === 'admin';

  const cartQuantity =
    user?.cartItems?.reduce((sum, item) => item.quantity + sum, 0) || 0;

  return (
    <nav className='flex items-center justify-center gap-5 text-sm'>
      <NavLink to='/' className='flex items-center gap-1 hover:text-orange-500'>
        <House size={20} data-testid='home-icon' />
        <span className='hidden md:inline'>Home</span>
      </NavLink>
      <NavLink
        to='cart'
        className='flex items-center gap-1 hover:text-orange-500'
      >
        <ShoppingBag size={20} />
        <span className='hidden md:inline'>Shopping Bag</span>
        <span className='rounded-full bg-yellow-900 px-1.5 py-0.5 text-xs text-yellow-50'>
          {cartQuantity}
        </span>
      </NavLink>
      {isAdmin && (
        <NavLink
          to='/dashboard'
          className='flex items-center gap-1 rounded-md bg-yellow-900 px-2.5 py-1.5 text-yellow-50 hover:bg-yellow-800'
        >
          <Lock size={20} />
          <span className='hidden md:inline'>Dashboard</span>
        </NavLink>
      )}
      {user ? (
        <Button
          type=''
          className='flex items-center gap-1 rounded-md bg-orange-500 px-2.5 py-1.5 text-yellow-50 hover:bg-orange-600'
          onClick={logout}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderMini />
          ) : (
            <>
              <LogOut size={20} />
              <span className='hidden sm:inline'>Log out</span>
            </>
          )}
        </Button>
      ) : (
        <>
          <NavLink
            to='signup'
            className='flex items-center gap-1 rounded-md bg-yellow-900 px-2.5 py-1.5 text-yellow-50 hover:bg-yellow-800'
          >
            <UserPlus size={20} />
            <span className='hidden sm:inline'>Sign Up</span>
          </NavLink>

          <NavLink
            to='login'
            className='flex items-center gap-1 rounded-md bg-orange-500 px-2.5 py-1.5 text-yellow-50 hover:bg-orange-600'
          >
            <LogIn size={20} />
            <span className='hidden sm:inline'>Log In</span>
          </NavLink>
        </>
      )}
    </nav>
  );
}
