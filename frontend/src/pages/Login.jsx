import LoginForm from '../features/authentication/LoginForm';
import { motion } from 'framer-motion';
export default function Login() {
  return (
    <div className='flex flex-col items-center py-12 sm:px-6 lg:px-8'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className='text-center text-yellow-800 sm:text-4xl pb-12 text-xl font-bold'>
          Login to your Account
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='flex flex-col rounded-md justify-center bg-yellow-100 py-12 px-16 lg:w-2/5 sm:w-2/3 w-full'
      >

        <LoginForm />
      </motion.div>
    </div>
  );
}
