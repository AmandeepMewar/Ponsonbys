import { CircleAlert, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { useProfile } from '../authentication/useProfile';

export default function ProductItem({ product }) {
  const navigate = useNavigate();
  const { user } = useProfile();

  const [isHover, setIsHover] = useState(false);
  const description =
    product.description.split(' ').slice(0, 5).join(' ') + '...';

  const price = formatCurrency(product.price);

  function handleAddToCart() {
    if (user) {
      // TODO:
    } else {
      toast('Please log in to add items to your cart', {
        icon: (
          <CircleAlert strokeWidth={2.5} className='h-5 w-5 text-red-500' />
        ),
      });
      navigate('/login');
    }
  }

  return (
    <div className='relative flex w-full flex-col gap-2 overflow-hidden rounded-lg border bg-yellow-100 shadow-lg'>
      <div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
        <img
          className='w-full object-cover'
          src={product.image}
          alt='product image'
        />
        <div className='absolute inset-0 bg-black bg-opacity-20' />
      </div>

      <Button
        className='mx-3 flex items-center justify-center rounded-lg bg-yellow-700 px-4 py-2.5 text-center text-sm font-medium text-yellow-50 transition duration-150 hover:bg-orange-600 focus:outline-none focus:ring-orange-600'
        onClick={handleAddToCart}
      >
        <ShoppingCart size={22} className='mr-2' />
        Add to cart
      </Button>

      <div
        className='flex flex-col gap-2 px-5 py-3'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className='flex items-center justify-between gap-2'>
          <h5 className='font-semibold tracking-tight text-yellow-800'>
            {product.name}
          </h5>

          <p className='font-semibold text-orange-600'>{price}</p>
        </div>

        <p className='text-xs transition-all duration-100'>
          {isHover ? product.description : description}
        </p>
      </div>
    </div>
  );
}
