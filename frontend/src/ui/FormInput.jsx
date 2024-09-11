export default function FormInput({ label, htmlFor, error, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className='block text-sm font-medium text-yellow-800'
      >
        {label}
      </label>
      <div className='relative rounded-md shadow-sm'>{children}</div>
      {error && (
        <p className='text-xs font-medium text-red-500 pl-2 pt-1'>{error}</p>
      )}
    </div>
  );
}
