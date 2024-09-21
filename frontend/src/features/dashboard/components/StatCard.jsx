import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon: Icon }) {
  return (
    <motion.div
      className='flex items-center gap-5 rounded-lg bg-yellow-100 py-4 pl-4 pr-5 shadow-lg'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='rounded-full bg-yellow-200 p-5'>
        <Icon className='h-5 w-5 md:h-7 md:w-7' />
      </div>
      <div className='flex flex-col gap-[2px]'>
        <h5 className='text-xs font-bold uppercase text-yellow-700'>{title}</h5>
        <h4 className='text-xl font-semibold text-yellow-800 sm:text-2xl'>
          {value}
        </h4>
      </div>
    </motion.div>
  );
}
