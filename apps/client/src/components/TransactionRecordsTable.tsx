import React from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { TransactionsRecordsDto } from '@/types/transaction-record';

interface TransactionRecordsTableProps {
  data: TransactionsRecordsDto[];
}

const columns = [
  {
    accessorKey: 'transactionId',
    header: "Transaction Id",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'transactionType',
    header: "Transaction Type",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'createdAt',
    header: "Created At",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'counterparty',
    header: "Counter Party",
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'amount',
    header: "Amount",
    cell: (props) => <p>{props.getValue()}</p>
  },
];

const TransactionRecordsTable: React.FC<TransactionRecordsTableProps> = ({ data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className='relative overflow-x-auto pt-12 w-full ml-64'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            {table.getHeaderGroups().map(headerGroup => <React.Fragment key={headerGroup.id}>
              {headerGroup.headers.map(
                header => (
                  <th scope='col' className='px-6 py-3' key={header.id}>
                    {header?.column?.columnDef?.header}
                  </th>
                )
              )}
            </React.Fragment>)}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700' key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className='py-4 px-6'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
};

export default TransactionRecordsTable;