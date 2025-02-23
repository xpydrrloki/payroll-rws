'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency } from '@/helper/formatCurrency';
import { Potongan } from '@/types/payroll.type';
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';

export const createDeductionsColumns = (args: {
  enableRowSelection: boolean;
  handleEditDeductionDialog: (allowanceId: number) => void;
  handleDeleteDeductionDialog: (allowanceId: number) => void;
}): ColumnDef<Potongan>[] => {
  const { enableRowSelection, handleEditDeductionDialog ,handleDeleteDeductionDialog} = args;
  const deductionColumns: ColumnDef<Potongan>[] = [
    {
      accessorKey: 'name',
      header: () => (
        <div className="text-left font-bold mx-auto w-36">
          <p>Nama</p>
        </div>
      ),
      cell: ({ row }) => {
        const name: string = row.getValue('name');
        return (
          <div className="text-left font-medium w-36 mx-auto ">{name}</div>
        );
      },
    },
    {
      accessorKey: 'description',
      header: () => (
        <div className="text-left font-bold mx-auto w-36">
          <p>Deskripsi</p>
        </div>
      ),
      cell: ({ row }) => {
        const description: string = row.getValue('description');
        return (
          <div className="text-left font-medium w-36 mx-auto ">
            {description}
          </div>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: () => (
        <div className="text-left font-bold mx-auto w-36">
          <p>Nominal</p>
        </div>
      ),
      cell: ({ row }) => {
        const amount: string = row.getValue('amount');
        return (
          <div className="text-left font-medium w-36 mx-auto ">
            {formatCurrency(amount)}
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const potongan = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Lainnya</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleEditDeductionDialog(potongan.id)}
              >
                <Pencil className="size-4 mx-1" />
                Ubah data
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteDeductionDialog(potongan.id)}
              >
                <Trash className="size-4 mx-1" />
                Hapus Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (enableRowSelection) {
    deductionColumns.unshift({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    });
  }
  return deductionColumns;
};
