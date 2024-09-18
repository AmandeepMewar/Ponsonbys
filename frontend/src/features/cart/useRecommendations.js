import { useQuery } from '@tanstack/react-query';
import { getRecommendedProducts } from '../../services/apiProduct';

export function useRecommendations() {
  const { data: products, isPending: isLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: getRecommendedProducts,
  });

  return { products, isLoading };
}
