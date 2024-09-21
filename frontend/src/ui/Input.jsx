import React from 'react';

const Input = React.forwardRef(function Input(props, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className='block w-full rounded-md border border-yellow-800 bg-yellow-50 px-10 py-2 text-xs placeholder-yellow-700 shadow-sm focus:border-orange-600 focus:outline-none focus:ring-yellow-900 sm:text-sm'
    />
  );
});

export default Input;
