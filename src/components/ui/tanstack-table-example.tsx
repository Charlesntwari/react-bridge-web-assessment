import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from './table';

type Row = {
  id: number;
  title: string;
  status: string;
  assignee?: string;
};

export default function TanStackTableExample() {
  const data = useMemo<Row[]>(() => [
    { id: 1, title: 'Design login screen', status: 'todo', assignee: 'Alice' },
    { id: 2, title: 'Implement auth', status: 'progress', assignee: 'Bob' },
    { id: 3, title: 'Write tests', status: 'review', assignee: 'Carol' },
    { id: 4, title: 'Deploy to Netlify', status: 'done', assignee: 'Dave' },
  ], []);

  const columns = useMemo<ColumnDef<Row>[]>(
    () => [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'title', header: 'Title' },
      { accessorKey: 'status', header: 'Status' },
      { accessorKey: 'assignee', header: 'Assignee' },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </tr>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>Example tasks table powered by @tanstack/react-table</TableCaption>
      </Table>
    </div>
  );
}
