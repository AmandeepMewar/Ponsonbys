function Table({ children, className }) {
  return <table className={className}>{children}</table>;
}

function Header({ headers }) {
  return (
    <thead className='bg-yellow-200'>
      <tr>
        {headers.map((head) => (
          <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-yellow-900'
            key={head}
          >
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Body({ children }) {
  return (
    <tbody className='divide-y divide-yellow-900 bg-yellow-100 text-yellow-900'>
      {children}
    </tbody>
  );
}

function Row({ children, value }) {
  return (
    <td className='whitespace-nowrap px-6 py-4 text-center'>
      {value ? <div className='text-sm'>{value}</div> : children}
    </td>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;
