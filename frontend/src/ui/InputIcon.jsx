export default function InputIcon({ Icon, className, onClick }) {
  return (
    <div
      className={
        className
          ? `${className}`
          : 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'
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
