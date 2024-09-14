'use client';
import { Attendance } from '@/types/attendance.type';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: 'employee.name',
    header: () => (
      <div className="text-left font-bold mx-auto w-36">
        <p>Nama karyawan</p>
      </div>
    ),
    cell: ({ row }) => {
      const name: string = row.original.employee.name;
      return <div className="text-left font-medium w-36 mx-auto ">{name}</div>;
    },

  },
  {
    accessorKey: 'department.name',
    header: () => (
      <div className="text-left mx-auto font-bold w-full">Departemen</div>
    ),
    cell: ({ row }) => {
      const department: string = row.original.employee.department.name;
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
      const jobTitle: string = row.original.employee.jobTitle.name;
      return (
        <div className="text-left font-medium line-clamp-1 w-full mx-auto">
          {jobTitle}
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: () => (
      <div className="text-left font-bold mx-auto w-16">
        <p>Tanggal</p>
      </div>
    ),
    cell: ({ row }) => {
        return (
          <p className="text-left font-medium line-clamp-1 w-16 mx-auto">
            {format(row.original.date, 'dd/MM/yy')}
          </p>
        );
      },
  },
  {
    
    accessorKey:"status",
    header: () => (
      <div className="text-left font-bold mx-auto w-32">
        <p>Status Kehadiran</p>
      </div>
    ),
    cell: ({ row }) => {
      const status: string = row.original.status;
      return <div className="text-left font-medium w-20 mx-auto ">{status}</div>;
    },


  }
];
