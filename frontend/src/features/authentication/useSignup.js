import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signup as signupApi } from '../../services/apiAuth';

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signup, isPending: loading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.result.user);
      toast.success(data.message);
      navigate('/');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, loading };
}
