import { Employee } from "./employee.type";

export enum OvertimeType {
    HARI_KERJA = 'HARI_KERJA',
    HARI_LIBUR = 'HARI_LIBUR',
  }
  
  export interface Overtime {
    id: number;
    date: Date;
    workHours: number;
    type: OvertimeType;
    employeeId: number;
    employee: Employee;
  }

export enum AttendanceStatus {
  HADIR = 'HADIR',
  MANGKIR = 'MANGKIR',
  SAKIT = 'SAKIT',
  CUTI = 'CUTI',
}

export interface Attendance {
  id: number;
  date: Date;
  status: AttendanceStatus;
  employeeId: number;
  employee: Employee;
}