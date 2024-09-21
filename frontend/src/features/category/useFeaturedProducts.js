import { useQuery } from '@tanstack/react-query';
import { getFeaturedProducts } from '../../services/apiProduct';

export function useFeaturedProducts() {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['featured'],
    queryFn: getFeaturedProducts,
  });

  return { data, isLoading };
}
