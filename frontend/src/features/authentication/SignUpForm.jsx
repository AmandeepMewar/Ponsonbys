import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Mail,
  User,
  Lock,
  UserPlus,
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react';
import FormInput from '../../ui/FormInput';
import InputIcon from '../../ui/InputIcon';
import Input from '../../ui/Input';
import { Link } from 'react-router-dom';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState, handleSubmit, getValues } = useForm();
  const { errors } = formState;

  function onSubmit() { }
  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label='Full name'
        htmlFor='fullName'
        error={errors?.fullName?.message}
      >
        <InputIcon Icon={User} />
        <Input
          id='fullName'
          type='text'
          placeholder='John Doe'
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormInput>

      <FormInput
        label='Email address'
        htmlFor='email'
        error={errors?.email?.message}
      >
        <InputIcon Icon={Mail} />
        <Input
          id='email'
          type='email'
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
        error={errors?.password?.message}
      >
        <InputIcon Icon={Lock} />
        <Input
          id='password'
          type={showPassword ? 'text' : 'password'}
          placeholder='••••••••'
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password needs a minimum of 6 characters',
            },
          })}
        />

        <InputIcon
          Icon={showPassword ? Eye : EyeOff}
          className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
          onClick={() => setShowPassword((s) => !s)}
        />
      </FormInput>

      <FormInput
        label='Confirm Password'
        htmlFor='confirmPassword'
        error={errors?.confirmPassword?.message}
      >
        <InputIcon Icon={Lock} />
        <Input
          id='confirmPassword'
          type='password'
          placeholder='••••••••'
          {...register('confirmPassword', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Password need to match',
          })}
        />
      </FormInput>

      <button
        type='submit'
        className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-yellow-700
							 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2
							  focus:ring-orange-600 transition duration-150 ease-in-out disabled:opacity-50'
      >
        <UserPlus className='mr-2 h-5 w-5' /> Sign up
      </button>

      <p className='mt-8 text-center text-sm text-yellow-700'>
        Already have an account?{' '}
        <Link
          to='/login'
          className='font-semibold text-orange-600 hover:text-orange-500'
        >
          Login here <ArrowRight className='inline h-4 w-4' />
        </Link>
      </p>
    </form>
  );
}
