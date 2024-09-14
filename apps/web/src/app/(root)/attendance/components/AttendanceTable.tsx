import { DataTable } from '@/components/ui/data-table';
import useGetEmployees from '@/hooks/api/employee/useGetEmployees';
import { Employee } from '@/types/employee.type';
import { FC } from 'react';
import { columns } from './columns';
import { Attendance } from '@/types/attendance.type';

interface AttendanceTableProps {
  attendances: Attendance[]
}

const AttendanceTable: FC<AttendanceTableProps> = ({attendances}) => {

  return <div><DataTable columns={columns} data={attendances}/></div>;
};

export default AttendanceTable;
