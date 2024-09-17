import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addToCart as addToCartApi } from '../../services/apiCart';

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { mutate: addToCart, isPending: isLoading } = useMutation({
    mutationFn: addToCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
      toast.success('Product added to cart successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { addToCart, isLoading };
}
