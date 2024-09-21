export default function FormInput({ label, htmlFor, error, children }) {
  return (
    <div className='w-full'>
      <label
        htmlFor={htmlFor}
        className='block text-sm font-medium text-yellow-800'
      >
        {label}
      </label>
      <div className='relative rounded-md shadow-sm'>{children}</div>
      {error && (
        <p className='pl-2 pt-1 text-xs font-medium text-red-500'>{error}</p>
      )}
    </div>
  );
}
