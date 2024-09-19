import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { removeFromCart as removeFromCartApi } from '../../../services/apiCart';

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  const { mutate: removeFromCart, isPending: isLoading } = useMutation({
    mutationFn: removeFromCartApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['cart']);
      queryClient.invalidateQueries(['user']);
      const message = data.result.length
        ? 'Product removed from your cart successfully.'
        : 'Your cart is now empty.';
      toast.success(message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { removeFromCart, isLoading };
}
