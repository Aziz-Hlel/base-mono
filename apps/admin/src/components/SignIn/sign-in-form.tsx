import { Controller, type UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import type { SignInRequestDto } from '@/types/auth/SignInRequestDto';

interface LoginFormProps {
  form: UseFormReturn<SignInRequestDto>;
  onSubmit: (data: SignInRequestDto) => void;
}

export function LoginForm({ form, onSubmit }: LoginFormProps) {
  const formId = 'sign-in-form';

  const isFormSubmitting = form.formState.isSubmitting;
  const rootError = form.formState.errors.root;

  return (
    <div className={cn('flex w-full max-w-md flex-col gap-6 px-4')}>
      <Card>
        <CardContent className='p-6 md:p-8'>
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className='flex flex-col items-center gap-2 text-center'>
                <h1 className='text-2xl font-bold'>Welcome back</h1>
                <p className='text-muted-foreground text-balance text-sm'>
                  Sign in to your Excellense Admin account
                </p>
              </div>

              <Controller
                name='email'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${formId}-${field.name}`}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={`${formId}-${field.name}`}
                      type='email'
                      aria-invalid={fieldState.invalid}
                      placeholder='admin@excellense.com'
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              <Controller
                name='password'
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${formId}-${field.name}`}>Password</FieldLabel>
                    <Input
                      {...field}
                      id={`${formId}-${field.name}`}
                      type='password'
                      aria-invalid={fieldState.invalid}
                      placeholder='••••••••'
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {rootError && <FieldError errors={[rootError]} />}

              <Field>
                {isFormSubmitting ? (
                  <Button disabled>
                    <Spinner data-icon='inline-start' />
                    Signing in...
                  </Button>
                ) : (
                  <Button type='submit'>Sign In</Button>
                )}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
