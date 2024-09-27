import { DataTable } from '@/components/ui/data-table';
import useGetEmployees from '@/hooks/api/employee/useGetEmployees';
import { Employee } from '@/types/employee.type';
import { FC } from 'react';
import { createColumns } from './columns';
import { Attendance } from '@/types/attendance.type';
import useUpdateAttendanceStatus from '@/hooks/api/attendance/useUpdateAttendanceStatus';

interface AttendanceTableProps {
  attendances: Attendance[];
  enableRowSelection?: boolean;
  refetchAtt: () => void;
  selectedDate: Date | undefined;
  enableUpdate?: boolean;
}

const AttendanceTable: FC<AttendanceTableProps> = ({
  attendances,
  enableRowSelection = false,
  refetchAtt,
  selectedDate,
  enableUpdate = false,
}) => {
  const { mutateAsync } = useUpdateAttendanceStatus();
  const columns = createColumns(
    enableRowSelection,
    mutateAsync,
    refetchAtt,
    selectedDate,
    enableUpdate,
  );
  return (
    <div>
      <DataTable
        columns={columns}
        data={attendances}
        enableRowSelection={enableRowSelection}
      />
    </div>
  );
};

export default AttendanceTable;
