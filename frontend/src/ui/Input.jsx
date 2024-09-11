import React from 'react';

const Input = React.forwardRef(function Input(props, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className='block w-full py-2 px-10 bg-yellow-50 border border-yellow-800 rounded-md shadow-sm
                 placeholder-yellow-700 focus:outline-none focus:ring-yellow-900 focus:border-orange-600 sm:text-sm'
    />
  );
});

export default Input;
