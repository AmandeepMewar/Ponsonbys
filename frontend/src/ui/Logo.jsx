import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <div>
      <Link
        to='/'
        className='text-lg font-bold uppercase text-orange-700 sm:text-2xl'
      >
        Ponsonbys
      </Link>
    </div>
  );
}
