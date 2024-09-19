import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { toggleFeaturedProduct as toggleFeaturedProductApi } from '../../../services/apiProduct';

export function useToggleFeaturedProduct() {
  const queryClient = useQueryClient();
  const { mutate: toggleFeaturedProduct, isPending: isLoading } = useMutation({
    mutationFn: toggleFeaturedProductApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['products']);
      toast.success(`${data.name} is featured now!`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { toggleFeaturedProduct, isLoading };
}
