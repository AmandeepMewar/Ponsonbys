import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProductsByCategory as getProductsByCategoryApi } from '../../services/apiProduct';

export function useProductByCategory() {
  const { category } = useParams();

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['category', category],
    queryFn: () => getProductsByCategoryApi(category),
  });

  return { data, isLoading };
}
