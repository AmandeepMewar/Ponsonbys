import Logo from './Logo';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className='flex items-center justify-between bg-yellow-100 px-5 py-4 font-medium'>
      <Logo />
      <Navbar />
    </header>
  );
}
