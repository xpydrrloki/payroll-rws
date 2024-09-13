import { Attendance, Overtime } from './attendance.type';
import { Payroll } from './payroll.type';

export interface Department {
  id: number;
  name: string;
  JobTitle: JobTitle[];
  Employee: Employee[];
}

export interface JobTitle {
  id: number;
  name: string;
  description?: string;
  departmentId: number;
  department: Department;
  Employee: Employee[];
}

export enum EmployeeType {
  KARYAWAN_LEPAS = 'KARYAWAN_LEPAS',
  KARYAWAN_TETAP = 'KARYAWAN_TETAP',
}

export interface Employee {
  id: number;
  name: string;
  employeeType: EmployeeType;
  address?: string;
  phoneNumber?: string;
  hiringDate: Date;
  updatedAt: Date;
  deletedAt?: Date;
  departmentId: number;
  jobTitleId: number;
  department: Department;
  jobTitle: JobTitle;
  Overtime: Overtime[];
  Attendance: Attendance[];
  Payroll: Payroll[];
}
