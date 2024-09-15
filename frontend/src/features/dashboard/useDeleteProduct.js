import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteProduct as deleteProductApi } from '../../services/apiProduct';

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending: isLoading } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteProduct, isLoading };
}
