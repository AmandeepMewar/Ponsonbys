import { Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthLink from '../../../ui/AuthLink';
import Button from '../../../ui/Button';
import FormInput from '../../../ui/FormInput';
import Input from '../../../ui/Input';
import InputIcon from '../../../ui/InputIcon';
import LoaderMini from '../../../ui/LoaderMini';
import { useLogin } from '../hooks/useLogin';

export default function LoginForm() {
  const { login, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ email, password }) {
    login(
      { email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <FormInput
        label='Email address'
        htmlFor='email'
        error={errors?.email?.message}
      >
        <InputIcon Icon={Mail} />
        <Input
          type='email'
          id='email'
          disabled={isLoading}
          placeholder='you@example.com'
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormInput>

      <FormInput
        label='Password'
        htmlFor='password'
        error={errors.password?.message}
      >
        <InputIcon Icon={Lock} />
        <Input
          type={showPassword ? 'text' : 'password'}
          id='password'
          placeholder='••••••••'
          disabled={isLoading}
          {...register('password', { required: 'This field is required' })}
        />
        <InputIcon
          Icon={showPassword ? Eye : EyeOff}
          className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
          onClick={() => setShowPassword((s) => !s)}
        />
      </FormInput>

      <Button type='submit' disabled={isLoading}>
        {isLoading ? (
          <LoaderMini />
        ) : (
          <>
            <LogIn className='mr-2 h-5 w-5' /> Login
          </>
        )}
      </Button>

      <AuthLink message='Not a member? ' linkText='Sign up now' />
    </form>
  );
}
