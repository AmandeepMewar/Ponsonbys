import { ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function AuthLink({ message, linkText }) {
  const location = useLocation().pathname === '/signup' ? '/login' : '/signup';

  return (
    <p className='mt-8 text-center text-sm text-yellow-700'>
      {message}
      <Link
        to={location}
        className='block font-semibold text-orange-600 hover:text-orange-500 md:inline'
      >
        {linkText} <ArrowRight className='inline h-4 w-4' />
      </Link>
    </p>
  );
}
