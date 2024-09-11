import { useForm } from 'react-hook-form';
import FormInput from '../../ui/FormInput';
import InputIcon from '../../ui/InputIcon';
import Input from '../../ui/Input';
import { ArrowRight, Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  function onSubmit() { }
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
          type='password'
          id='password'
          {...register('password', { required: 'This field is required' })}
        />
        <InputIcon
          Icon={showPassword ? Eye : EyeOff}
          className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
          onClick={() => setShowPassword((s) => !s)}
        />
      </FormInput>

      <button
        type='submit'
        className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-yellow-700
							 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-orange-600 transition duration-150 ease-in-out disabled:opacity-50'
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
