import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createProduct as createProductApi } from '../../../services/apiProduct';

export function useCreateProduct() {
  const navigate = useNavigate();
  const { mutate: createProduct, isPending: isLoading } = useMutation({
    mutationFn: createProductApi,
    onSuccess: () => {
      toast.success('Product has been successfully created.');

      navigate('/dashboard/products');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createProduct, isLoading };
}
