import { motion } from 'framer-motion';
import LoginForm from '../features/authentication/components/LoginForm';
export default function Login() {
  return (
    <div className='flex flex-col items-center py-12 sm:px-6 lg:px-8'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='pb-12 text-center text-xl font-bold text-yellow-800 sm:text-4xl'>
          Login to your Account
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='flex w-11/12 flex-col justify-center rounded-md bg-yellow-100 px-8 py-12 sm:w-2/3 lg:w-2/5 lg:px-16'
      >
        <LoginForm />
      </motion.div>
    </div>
  );
}
