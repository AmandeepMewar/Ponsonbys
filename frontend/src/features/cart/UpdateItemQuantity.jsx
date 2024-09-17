import { Minus, Plus } from 'lucide-react';

export default function UpdateItemQuantity({ quantity }) {
  return (
    <div className='flex items-center gap-2 md:gap-3'>
      <button className='flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600'>
        <Minus className='h-5 w-5 text-yellow-50' />
      </button>
      <span className='text-lg font-medium text-yellow-800'>{quantity}</span>
      <button className='flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600'>
        <Plus className='h-5 w-5 text-yellow-50' />
      </button>
    </div>
  );
}
