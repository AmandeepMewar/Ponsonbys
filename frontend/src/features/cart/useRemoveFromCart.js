import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { removeFromCart as removeFromCartApi } from '../../services/apiCart';

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  const { mutate: removeFromCart, isPending: isLoading } = useMutation({
    mutationFn: removeFromCartApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Product removed Successfully!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { removeFromCart, isLoading };
}
