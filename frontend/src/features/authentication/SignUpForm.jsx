import { Eye, EyeOff, Lock, Mail, User, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthLink from '../../ui/AuthLink';
import Button from '../../ui/Button';
import FormInput from '../../ui/FormInput';
import Input from '../../ui/Input';
import InputIcon from '../../ui/InputIcon';
import { useSignup } from './useSignup';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isLoading } = useSignup();
  const { register, formState, handleSubmit, getValues, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password, confirmPassword }) {
    signup(
      {
        name: fullName,
        email,
        password,
        passwordConfirm: confirmPassword,
      },
      { onSettled: () => reset() }
    );
  }
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          disabled={isLoading}
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
          className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3'
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
          disabled={isLoading}
          {...register('confirmPassword', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Password need to match',
          })}
        />
      </FormInput>

      <Button type='submit' disabled={isLoading}>
        <UserPlus className='mr-2 h-5 w-5' /> Sign up
      </Button>

      <AuthLink message='Already have an account? ' linkText='Login here' />
    </form>
  );
}
