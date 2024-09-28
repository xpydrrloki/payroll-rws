import { DataTable } from '@/components/ui/data-table';
import useGetEmployees from '@/hooks/api/employee/useGetEmployees';
import { Employee } from '@/types/employee.type';
import { FC } from 'react';
import { columns } from './columns';

interface EmployeeTableProp {
  employees: Employee[] 
}

const EmployeeTable: FC<EmployeeTableProp> = ({employees}) => {

  return <div><DataTable columns={columns} data={employees} getRowId={(row)=>String(row.id)}/></div>;
};

export default EmployeeTable;
