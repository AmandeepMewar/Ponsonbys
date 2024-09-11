import { ArrowRight, Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from '../../ui/FormInput';
import Input from '../../ui/Input';
import InputIcon from '../../ui/InputIcon';
import { useLogin } from './useLogin';

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
          disabled={isLoading}
          {...register('password', { required: 'This field is required' })}
        />
        <InputIcon
          Icon={showPassword ? Eye : EyeOff}
          className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
          onClick={() => setShowPassword((s) => !s)}
        />
      </FormInput>

      <button
        type='submit'
        className='flex w-full justify-center rounded-md border border-transparent bg-yellow-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 disabled:opacity-50'
        disabled={isLoading}
      >
        <LogIn className='mr-2 h-5 w-5' /> Login
      </button>

      <p className='mt-8 text-center text-sm text-yellow-700'>
        Not a member?{' '}
        <Link
          to='/signup'
          className='font-semibold text-orange-600 hover:text-orange-500'
        >
          Sign up now <ArrowRight className='inline h-4 w-4' />
        </Link>
      </p>
    </form>
  );
}
