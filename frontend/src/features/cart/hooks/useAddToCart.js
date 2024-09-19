import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addToCart as addToCartApi } from '../../../services/apiCart';

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { mutate: addToCart, isPending: isLoading } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      queryClient.invalidateQueries(['cart']);
      toast.success('Product successfully added to your cart.');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { addToCart, isLoading };
}
