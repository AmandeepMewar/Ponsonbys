import CartProducts from '../features/cart/CartProducts';

export default function Cart() {
  return (
    <div className='py-8 md:py-16'>
      <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
        <CartProducts />
      </div>
    </div>
  );
}
