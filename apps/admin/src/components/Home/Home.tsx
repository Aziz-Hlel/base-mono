import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router';

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/signin', { replace: true });
  };

  return (
    <div className='bg-background text-foreground flex min-h-screen items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>Home</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-1 text-sm'>
            <p>
              <span className='text-muted-foreground'>Username:</span> {user?.username}
            </p>
            <p>
              <span className='text-muted-foreground'>Email:</span> {user?.email}
            </p>
            <p>
              <span className='text-muted-foreground'>Role:</span> {user?.role}
            </p>
          </div>
          <Button variant='outline' onClick={handleLogout} className='w-full'>
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
