import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router';

const FullScreenLoader = () => (
  <div className='bg-background text-foreground flex min-h-screen items-center justify-center'>
    <Spinner className='size-6' />
  </div>
);

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <FullScreenLoader />;
  if (!isAuthenticated) return <Navigate to='/signin' replace />;

  return <Outlet />;
};

export const GuestRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <FullScreenLoader />;
  if (isAuthenticated) return <Navigate to='/home' replace />;

  return <Outlet />;
};
