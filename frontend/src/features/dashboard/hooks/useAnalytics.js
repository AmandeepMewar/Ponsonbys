import { useQuery } from '@tanstack/react-query';
import { getAnalyticsData } from '../../../services/apiAnalytics';

export function useAnalytics() {
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: getAnalyticsData,
  });

  return { data, isLoading };
}
