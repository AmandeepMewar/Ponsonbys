import Logo from './Logo';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className='flex justify-between px-5 py-4 items-center font-medium'>
      <Logo />
      <Navbar />
    </header>
  );
}
