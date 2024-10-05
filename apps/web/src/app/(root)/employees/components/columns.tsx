'use client';

import { Employee } from '@/types/employee.type';
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Contact, Copy, MapPin, MoreHorizontal, User } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'name',
    header: () => (
      <div className="text-left font-bold mx-auto w-36">
        <p>Nama</p>
      </div>
    ),
    cell: ({ row }) => {
      const name: string = row.getValue('name');
      return <div className="text-left font-medium w-36 mx-auto ">{name}</div>;
    },
  },
  {
    accessorKey: 'address',
    header: () => (
      <div className="text-left mx-auto font-bold w-40">Alamat</div>
    ),
    cell: ({ row }) => {
      const address: string = row.getValue('address');
      return (
        <div className="text-left font-medium line-clamp-1 w-40 mx-auto">
          {address ? address : 'Tidak ada data.'}
        </div>
      );
    },
  },
  {
    accessorKey: 'phoneNumber',
    header: () => (
      <div className="text-left mx-auto font-bold w-32">No. Telepon</div>
    ),
    cell: ({ row }) => {
      const phoneNumber: string = row.getValue('phoneNumber');
      return (
        <div className="text-left font-medium line-clamp-1 w-32 mx-auto">
          {phoneNumber ? phoneNumber : 'Tidak ada data.'}
        </div>
      );
    },
  },
  {
    accessorKey: 'department.name',
    header: () => (
      <div className="text-left mx-auto font-bold w-full">Departemen</div>
    ),
    cell: ({ row }) => {
      const department: string = row.original.department.name;
      return (
        <div className="text-left font-medium line-clamp-1 w-full mx-auto">
          {department}
        </div>
      );
    },
  },
  {
    accessorKey: 'jobTitle.name',
    header: () => (
      <div className="text-left mx-auto font-bold w-full">Jabatan</div>
    ),
    cell: ({ row }) => {
      const jobTitle: string = row.original.jobTitle.name;
      return (
        <div className="text-left font-medium line-clamp-1 w-full mx-auto">
          {jobTitle}
        </div>
      );
    },
  },
  {
    accessorKey: 'hiringDate',
    header: () => (
      <div className="text-left mx-auto font-bold w-full">Mulai Kerja</div>
    ),
    cell: ({ row }) => {
      return (
        <p className="text-left font-medium line-clamp-1 w-full mx-auto">
          {format(row.original.hiringDate, 'dd MMMM yyyy')}
        </p>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const employee = row.original;
      const router = useRouter();

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
            // onClick={() => navigator.clipboard.writeText(employee.name)}
            >
              {/* Salin nama karyawan */}
            </DropdownMenuItem>{' '}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Copy className="mr-2 h-4 w-4" />
                <span>Salin data ...</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => {navigator.clipboard.writeText(employee.name)
                      toast("Nama tersalin")
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Nama karyawan</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                   onClick={() => {
                    if (employee.address) {
                      navigator.clipboard.writeText(employee.address);
                      toast("Alamat tersalin")
                    } else {toast.warning("Alamat tidak tersedia")}
                  }}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>Alamat karyawan</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      if (employee.phoneNumber) {
                        navigator.clipboard.writeText(employee.phoneNumber);
                        toast("Nomor telepon tersalin")
                      } else {toast.warning("Nomor telepon tidak tersedia")}
                    }}
                  >
                    <Contact className="mr-2 h-4 w-4" />
                    <span>No. Telepon </span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push(`/employees/${employee.id}`)}
            >
              Lihat detail karyawan
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
