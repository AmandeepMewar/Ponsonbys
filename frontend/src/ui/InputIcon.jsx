export default function InputIcon({ Icon, className, onClick }) {
  return (
    <div
      className={
        className
          ? `${className}`
          : 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'
      }
    >
      <Icon
        className='h-5 w-5 text-yellow-800'
        aria-hidden='true'
        onClick={onClick}
      />
    </div>
  );
}
