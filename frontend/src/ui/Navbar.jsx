import { NavLink } from 'react-router-dom';
import {
  House,
  Lock,
  LogIn,
  LogOut,
  ShoppingBag,
  UserPlus,
} from 'lucide-react';
export default function Navbar() {
  // const user = { role: 'admin' };
  const user = null;
  const isAdmin = user?.role === 'admin';
  return (
    <nav className='flex text-sm gap-5 justify-center items-center'>
      <NavLink to='/' className='flex gap-1 items-center hover:text-orange-500'>
        <House size={20} />
        <span>Home</span>
      </NavLink>
      <NavLink
        to='cart'
        className='flex gap-1 items-center hover:text-orange-500'
      >
        <ShoppingBag size={20} />
        <span>Shopping Bag</span>
        <span className=' bg-yellow-900 rounded-full px-2 py-0.5 text-yellow-50 text-xs'>
          2
        </span>
      </NavLink>
      {isAdmin && (
        <NavLink className='flex gap-1 items-center text-yellow-50 px-2.5 py-1.5 rounded-md bg-yellow-900 hover:bg-yellow-800'>
          <Lock size={20} />
          <span>Dashboard</span>
        </NavLink>
      )}
      {user ? (
        <NavLink className='flex gap-1 items-center bg-orange-500 hover:bg-orange-600 text-yellow-50 px-2.5 py-1.5 rounded-md'>
          <LogOut size={20} />
          <span>Log out</span>
        </NavLink>
      ) : (
        <>
          <NavLink
            to='signup'
            className='flex gap-1 items-center text-yellow-50 px-2.5 py-1.5 rounded-md bg-yellow-900 hover:bg-yellow-800'
          >
            <UserPlus size={20} />
            <span>Sign Up</span>
          </NavLink>

          <NavLink
            to='login'
            className='flex gap-1 items-center bg-orange-500 hover:bg-orange-600 text-yellow-50 px-2.5 py-1.5 rounded-md'
          >
            <LogIn size={20} />
            <span>Log In</span>
          </NavLink>
        </>
      )}
    </nav>
  );
}
