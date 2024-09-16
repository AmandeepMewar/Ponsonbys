export default function NotFound({ children, className }) {
  return (
    <p
      className={`rounded-md border border-red-300 bg-red-100 px-8 py-4 text-lg font-semibold text-yellow-800 shadow-lg ${className}`}
    >
      {children}
    </p>
  );
}
