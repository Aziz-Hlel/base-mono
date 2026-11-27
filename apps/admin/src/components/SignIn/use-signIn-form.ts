import { useAuth } from '@/context/AuthContext';
import { type SignInRequestDto, signInSchema } from '@/types/auth/SignInRequestDto';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const useSignInForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignInRequestDto>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInRequestDto) => {
    try {
      await login(data);
      toast.success('Signed in successfully');
      navigate('/home', { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in';
      form.setError('root', { message });
      toast.error(message);
    }
  };

  return {
    form,
    onSubmit,
  };
};

export default useSignInForm;
