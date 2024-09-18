import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { validateCoupon } from '../../services/apiCoupon';

export function useApplyCoupon() {
  const queryClient = useQueryClient();
  const {
    mutate: applyCoupon,
    isPending: isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: validateCoupon,
    onSuccess: (data) => {
      queryClient.setQueryData(['coupon'], data.result);
      toast.success('Coupon applied');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { applyCoupon, isSuccess, isLoading };
}
