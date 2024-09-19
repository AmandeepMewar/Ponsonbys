import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createSession as createSessionApi } from '../../services/apiStripe';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export function useCreateSession() {
  const { mutate: createSession, isPending: isLoading } = useMutation({
    mutationFn: createSessionApi,

    onSuccess: async (data) => {
      const stripe = await stripePromise;
      toast.success('Stripe Session created!');
      await stripe.redirectToCheckout({
        sessionId: data.id,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createSession, isLoading };
}
