'use client';

import { Employee } from '@/types/employee.type';
import { ColumnDef } from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
  

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="text-left">Nama</div>,
    cell: ({ row }) => {
      const name: string = row.getValue('name');
      return <div className="text-left font-medium ">{name}</div>;
    },
  },
  {
    accessorKey: 'address',
    header: 'Alamat',
  },
  {
    accessorKey: 'phoneNumber',
    header: 'No. Telpon',
  },
  {
    accessorKey: 'department.name',
    header: 'Departemen',
  },
  {
    accessorKey: 'jobTitle.name',
    header: 'Jabatan',
  },
  {
    accessorKey: 'hiringDate',
    header: 'Mulai Kerja',
    cell: ({row})=>{
        return (<p>{format(row.original.hiringDate, "dd MMMM yyyy")}</p>)
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
        const employee = row.original
        const router = useRouter()
   
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
                onClick={() => navigator.clipboard.writeText(employee.name)}
              >
                Salin nama karyawan
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>router.push(`/employees/${employee.id}`)}>Lihat detail karyawan</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
    }
  }
];
