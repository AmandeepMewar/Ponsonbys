export default function Button({ children, className, ...props }) {
  const classes =
    className ||
    'flex w-full justify-center rounded-md border border-transparent bg-yellow-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 disabled:opacity-50';
  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}
