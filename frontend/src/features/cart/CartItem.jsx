import { Trash } from 'lucide-react';
import Button from '../../ui/Button';
import LoaderMini from '../../ui/LoaderMini';
import { formatCurrency } from '../../utils/helpers';
import UpdateItemQuantity from './UpdateItemQuantity';
import { useRemoveFromCart } from './useRemoveFromCart';

function CartItem({ product }) {
  const { name, image, quantity, price, _id: productId } = product;

  const { removeFromCart, isLoading } = useRemoveFromCart();

  const productPrice = price * quantity;

  return (
    <div className='w-full rounded-lg bg-yellow-100 px-5 py-3 shadow-lg sm:flex sm:items-center sm:justify-between'>
      <div className='flex items-center gap-8'>
        <img
          src={image}
          alt=''
          className='h-16 w-16 rounded-full object-cover'
        />
        <p className='mb-1 text-lg font-semibold sm:mb-0'>
          {quantity}&times; {name}
        </p>
      </div>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-lg font-semibold'>{formatCurrency(productPrice)}</p>

        <UpdateItemQuantity quantity={product.quantity} productId={productId} />
        <Button
          className='flex h-10 w-10 items-center justify-center rounded-full bg-orange-500'
          onClick={() => {
            removeFromCart(productId);
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoaderMini />
          ) : (
            <Trash className='h-5 w-5 text-yellow-50 hover:text-yellow-100' />
          )}
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
