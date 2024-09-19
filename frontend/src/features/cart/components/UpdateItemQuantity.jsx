import { Minus, Plus } from 'lucide-react';
import Button from '../../../ui/Button';
import { useUpdateQuantity } from '../hooks/useUpdateQuantity';

export default function UpdateItemQuantity({ quantity, productId }) {
  const { updateQuantity, isLoading } = useUpdateQuantity();
  return (
    <div className='flex items-center gap-2 md:gap-3'>
      <Button
        className='flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600'
        onClick={() => updateQuantity({ quantity: quantity - 1, productId })}
        disabled={isLoading}
      >
        <Minus className='h-5 w-5 text-yellow-50' />
      </Button>
      <span className='text-lg font-medium text-yellow-800'>{quantity}</span>
      <Button
        className='flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600'
        onClick={() => updateQuantity({ quantity: quantity + 1, productId })}
        disabled={isLoading}
      >
        <Plus className='h-5 w-5 text-yellow-50' />
      </Button>
    </div>
  );
}
