import { useQuery } from '@tanstack/react-query';
import { getCoupon } from '../../services/apiCoupon';

export function useCoupon() {
  const { data: coupon, isPending: isLoading } = useQuery({
    queryKey: ['coupon'],
    queryFn: getCoupon,
  });

  return { coupon, isLoading };
}
