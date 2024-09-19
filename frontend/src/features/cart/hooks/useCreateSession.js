import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createSession as createSessionApi } from '../../../services/apiStripe';

const PUBLISHABLE_KEY =
  'pk_test_51Pw3xE2NFixKYFKKG7ZtkFGlIjJBjCMClA2S3tDOm1bbivQbD24UDXvaXjQuTmVNRuW5Opx4KMpNLyjLJ4nUERgL0030s74oqw';

const stripePromise = loadStripe(PUBLISHABLE_KEY);

export function useCreateSession() {
  const { mutate: createSession, isPending: isLoading } = useMutation({
    mutationFn: createSessionApi,

    onSuccess: async (data) => {
      const stripe = await stripePromise;
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
