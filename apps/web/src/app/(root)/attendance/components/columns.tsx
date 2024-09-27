'use client';
import { Attendance, AttendanceStatus } from '@/types/attendance.type';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect } from 'react';
import { normalizeDateToMidnight } from '@/helper/normalizeDate';

// Function to create columns dynamically based on enableRowSelection
export const createColumns = (
  enableRowSelection: boolean,
  mutateAsync: (payload: { id: number; status: string }) => Promise<void>,
  refetchAtt: () => void,
  selectedDate: Date | undefined,
  enableUpdate: boolean,
): ColumnDef<Attendance>[] => {
  const handleChangeAttStatus = async (id: number, status: string) => {
    await mutateAsync({ id, status });
    await refetchAtt();
  };
  const columns: ColumnDef<Attendance>[] = [
    {
      accessorKey: 'employee.name',
      header: () => (
        <div className="text-left font-bold mx-auto w-36">
          <p>Nama karyawan</p>
        </div>
      ),
      cell: ({ row }) => {
        const name: string = row.original.employee.name;
        return (
          <div className="text-left font-medium w-36 mx-auto ">{name}</div>
        );
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
      id: 'status',
      header: () => (
        <div className="text-left font-bold mx-auto w-32">
          <p>Status Kehadiran</p>
        </div>
      ),
      // cell: ({ row }) => {
      //   const status: AttendanceStatus = row.original.status;
      //   const id = row.original.id;

      //   if (selectedDate && selectedDate <= new Date()) {
      //     return (
      //       <div className="text-left font-medium w-20 mx-auto ">{status}</div>
      //     );
      //   } else if (
      //     !selectedDate ||
      //     selectedDate == new Date() ||
      //     enableUpdate
      //   ) {
      //     return (
      //       <div className="items-start font-medium w-fit mx-auto ">
      //         <Select
      //           defaultValue={status as string}
      //           onValueChange={(value) => handleChangeAttStatus(id, value)}
      //         >
      //           <SelectTrigger className="w-[180px]">
      //             <SelectValue placeholder="Status kehadiran" />
      //           </SelectTrigger>
      //           <SelectContent>
      //             {Object.values(AttendanceStatus).map((status) => (
      //               <SelectItem value={status as string}>{status}</SelectItem>
      //             ))}
      //           </SelectContent>
      //         </Select>
      //       </div>
      //     );
      //   }
      // },
      cell: ({ row }) => {
        const status: AttendanceStatus = row.original.status;
        const id = row.original.id;
        const parsedDate = selectedDate
          ? new Date(normalizeDateToMidnight(selectedDate.toDateString()))
          : undefined;

        // Ensure selectedDate is properly compared
        const now = new Date(normalizeDateToMidnight(new Date().toISOString()));

        const isPastDate = parsedDate && parsedDate < now;


       
        // Allow update if it's the current date or `enableUpdate` is true
         if (!parsedDate || parsedDate >= now || enableUpdate) {
          return (
            <div className="items-start font-medium w-fit mx-auto ">
              <Select
                defaultValue={status as string}
                onValueChange={(value) => handleChangeAttStatus(id, value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status kehadiran" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(AttendanceStatus).map((status) => (
                    <SelectItem key={status} value={status as string}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }
        if (isPastDate) {
          return (
            <div className="text-left font-medium w-20 mx-auto ">{status}</div>
          );
        }
        // Ensure the function always returns something
      },
    },
  ];

  // Conditionally add the checkbox column if row selection is enabled
  if (enableRowSelection) {
    columns.unshift({
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

  return columns;
};
