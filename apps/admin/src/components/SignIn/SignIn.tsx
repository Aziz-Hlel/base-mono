import { LoginForm } from './sign-in-form';
import useSignInForm from './use-signIn-form';

const SignIn = () => {
  const { form, onSubmit } = useSignInForm();
  return (
    <div className='bg-background flex min-h-screen w-full items-center justify-center'>
      <LoginForm form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default SignIn;
