import { ArrowRight, CheckCircle, HandHeart } from 'lucide-react';
import { useEffect } from 'react';
import Confetti from 'react-confetti';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCheckoutSuccess } from '../features/cart/hooks/useCheckoutSuccess';
import { useRemoveFromCart } from '../features/cart/hooks/useRemoveFromCart';
import Button from '../ui/Button';
import Loader from '../ui/Loader';

export default function PurchaseSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { removeFromCart } = useRemoveFromCart();
  const { checkoutSuccess, isLoading, data } = useCheckoutSuccess();
  const session_id = searchParams.get('session_id');

  useEffect(() => {
    if (!session_id) {
      navigate('/');
      return;
    }

    checkoutSuccess(session_id, {
      onSuccess: () => removeFromCart(),
    });
  }, [session_id, navigate, checkoutSuccess, removeFromCart]);

  if (isLoading || !data?.orderId) return <Loader />;

  return (
    <div className='flex h-screen items-center justify-center px-4'>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <div className='relative z-10 w-full max-w-md overflow-hidden rounded-lg bg-yellow-100 shadow-xl'>
        <div className='p-6 sm:p-8'>
          <div className='flex justify-center'>
            <CheckCircle className='mb-4 h-16 w-16 text-yellow-700' />
          </div>
          <h1 className='mb-2 text-center text-2xl font-bold text-yellow-700 sm:text-3xl'>
            Purchase Successful!
          </h1>

          <p className='mb-6 text-center text-yellow-700'>
            Thank you for your order. {"We're"} processing it now.
          </p>

          <div className='mb-6 rounded-lg bg-yellow-200 p-4'>
            <div className='mb-2 flex items-center justify-between'>
              <span className='text-sm text-orange-700'>Order number</span>
              <span className='text-sm font-semibold text-yellow-700'>
                {data.orderId}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm text-orange-700'>
                Estimated delivery
              </span>
              <span className='text-sm font-semibold text-yellow-700'>
                3-5 business days
              </span>
            </div>
          </div>

          <div className='space-y-4'>
            <Button>
              <HandHeart className='mr-2' size={18} />
              Thanks for trusting us!
            </Button>
            <Link
              to={'/'}
              className='flex w-full items-center justify-center rounded-lg bg-orange-500 px-4 py-2 font-semibold text-yellow-50 transition duration-300 hover:bg-orange-600'
            >
              Continue Shopping
              <ArrowRight className='ml-2' size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
