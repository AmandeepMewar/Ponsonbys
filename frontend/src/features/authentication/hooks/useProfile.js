import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../../services/apiAuth';

export function useProfile() {
  const { data: user, isPending: isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getProfile,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
