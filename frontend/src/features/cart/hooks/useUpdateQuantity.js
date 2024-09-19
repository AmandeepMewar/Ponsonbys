import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateQuantity as updateQuantityApi } from '../../../services/apiCart';
export function useUpdateQuantity() {
  const queryClient = useQueryClient();
  const { mutate: updateQuantity, isPending: isLoading } = useMutation({
    mutationFn: updateQuantityApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateQuantity, isLoading };
}
