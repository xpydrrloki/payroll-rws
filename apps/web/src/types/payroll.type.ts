import { Employee } from "./employee.type";

export interface Payroll {
    id: number;
    baseSalary: number;
    payDate: Date;
    netPay: number;
    employeeId: number;
    employee: Employee;
    TunjanganPayroll: TunjanganPayroll[];
    PotonganPayroll: PotonganPayroll[];
  }
  export interface Tunjangan {
    id: number;
    name: string;
    description: string;
    TunjanganPayroll: TunjanganPayroll[];
  }
  export interface TunjanganPayroll {
    id: number;
    payrollId: number;
    tunjanganId: number;
    amount: number;
    payroll: Payroll;
    tunjangan: Tunjangan;
  }
  export interface Potongan {
    id: number;
    name: string;
    description: string;
    PotonganPayroll: PotonganPayroll[];
  }
  export interface PotonganPayroll {
    id: number;
    payrollId: number;
    potonganId: number;
    amount: number;
    payroll: Payroll;
    potongan: Potongan;
  }