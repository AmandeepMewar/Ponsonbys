import { motion } from 'framer-motion';
import SignUpForm from '../features/authentication/components/SignUpForm';
export default function SignUp() {
  return (
    <div className='flex flex-col items-center py-12 sm:px-6 lg:px-8'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className='pb-12 text-center text-xl font-bold text-yellow-800 sm:text-4xl'>
          Create Your Account
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='flex w-11/12 flex-col justify-center rounded-md bg-yellow-100 px-8 py-12 sm:w-2/3 lg:w-2/5 lg:px-16'
      >
        <SignUpForm />
      </motion.div>
    </div>
  );
}
