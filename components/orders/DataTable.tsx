// src/orders/DataTable.tsx
"use client";

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Asegúrate de que la ruta sea correcta
import { Button } from "@/components/ui/button"; // Asegúrate de que la ruta sea correcta
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Link from "next/link"; // Importa el componente Link
import { Order } from "@/interfaces/Order"; // Asegúrate de que la ruta sea correcta

interface DataTableProps<T> { // Cambia el nombre del tipo genérico
  columns: ColumnDef<T>[];
  data: T[];
}

export function DataTable<T extends Order>({ columns, data }: DataTableProps<T>) { // Usa T en lugar de Order
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <TableCell className="py-4">
                    <Link href={`/orders/${row.original.id}`}>
                      <Button variant="outline">Ver Detalles</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-end gap-1 mt-4">
        <Button size={'icon'} onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
          <ChevronsLeft />
        </Button>
        <Button size={'icon'} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ChevronLeft />
        </Button>
        <span>
          Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <Button size={'icon'} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <ChevronRight />
        </Button>
        <Button size={'icon'} onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}