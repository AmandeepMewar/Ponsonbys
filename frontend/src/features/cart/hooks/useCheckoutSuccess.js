import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { checkoutSuccess as checkoutSuccessApi } from '../../../services/apiStripe';

export function useCheckoutSuccess() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: checkoutSuccess,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: checkoutSuccessApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
    onError: (err) => {
      toast.error(err.message);
      navigate('/');
    },
  });

  return { checkoutSuccess, isLoading, data };
}
