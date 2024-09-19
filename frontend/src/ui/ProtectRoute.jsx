import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useProfile } from '../features/authentication/hooks/useProfile';
import Loader from './Loader';

export default function ProtectRoute() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useProfile();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate('/login');
    },
    [navigate, isAuthenticated, isLoading]
  );

  if (!isAuthenticated) return <Loader />;

  if (isAuthenticated) return <Outlet />;
}
