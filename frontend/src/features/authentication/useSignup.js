import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';

export function useSignup() {
  const { mutation: signup, isPending: loading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
    },
  });

  return { signup, loading };
}
