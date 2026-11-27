import { useEffect } from 'react';
import { toast } from 'sonner';

const NetworkStatusGuard = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const handleOffline = () =>
      toast.error('You are currently offline. Please check your internet connection.', {
        classNames: {
          toast: 'cursor-default',
          icon: 'text-destructive',
        },
      });

    window.addEventListener('offline', handleOffline);

    // TODO: Enable API health check once API client & env config are added:
    // axios
    //   .get(ENV.BASE_URL + apiRoutes.health())
    //   .then(() => {
    //     console.log('API connected');
    //   })
    //   .catch((err) => {
    //     console.error('API connection failed:', err);
    //   });

    return () => {
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return children;
};

export default NetworkStatusGuard;
