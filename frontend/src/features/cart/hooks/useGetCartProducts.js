import { useQuery } from '@tanstack/react-query';
import { getCartProducts as getCartProductsApi } from '../../../services/apiCart';

export function useGetCartProducts() {
  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartProductsApi,
  });

  return { cart, isLoading };
}
