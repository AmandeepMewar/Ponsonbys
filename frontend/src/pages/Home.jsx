import CategoryItem from '../ui/CategoryItem';

const categories = [
  { href: '/jeans', name: 'Jeans', imageUrl: '/assets/jeans.jpg' },
  {
    href: '/t-shirts',
    name: 'T-shirts',
    imageUrl: '/assets/tshirts.jpg',
  },
  { href: '/shoes', name: 'Shoes', imageUrl: '/assets/shoes.jpg' },
  { href: '/glasses', name: 'Glasses', imageUrl: '/assets/glasses.jpg' },
  { href: '/jackets', name: 'Jackets', imageUrl: '/assets/jackets.jpg' },
  { href: '/suits', name: 'Suits', imageUrl: '/assets/suits.jpg' },
  { href: '/bags', name: 'Bags', imageUrl: '/assets/bags.jpg' },
];

export default function Home() {
  return (
    <div className='relative min-h-screen overflow-hidden text-white'>
      <div className='relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
        <h1 className='mb-4 text-center text-5xl font-bold text-yellow-800 sm:text-6xl'>
          Find Your Style
        </h1>
        <p className='mb-12 text-center text-xl text-yellow-700'>
          Embrace the Latest Trends in Sustainable Fashion Wear
        </p>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
