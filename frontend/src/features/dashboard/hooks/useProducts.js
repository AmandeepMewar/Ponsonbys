import { useQuery } from '@tanstack/react-query';
import { getAllProducts as getAllProductsApi } from '../../../services/apiProduct';

export function useProducts() {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProductsApi,
  });

  return { data, isLoading };
}
