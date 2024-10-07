import { Employee } from "./employee.type";

export interface Payroll {
  id: number;
  baseSalary: number;
  payPeriodStart: Date;
  payPeriodEnd: Date;
  grossPay: number;
  netPay: number;
  employeeId: number;
  totalTunjangan: number;
  totalPotongan: number;

  employee: Employee; // Assuming an Employee interface exists
}


export interface Tunjangan {
  id: number;
  name: string;
  description: string;
  amount: number;
  EmployeeTunjangan: EmployeeTunjangan[];
}

export interface EmployeeTunjangan {
  id: number;
  employeeId: number;
  tunjanganId: number;

  employee: Employee; // Assuming an Employee interface exists
  tunjangan: Tunjangan;
}

export interface Potongan {
  id: number;
  name: string;
  description: string;
  amount: number;
  EmployeePotongan: EmployeePotongan[];
}

export interface EmployeePotongan {
  id: number;
  employeeId: number;
  potonganId: number;

  employee: Employee; // Assuming an Employee interface exists
  potongan: Potongan;
}

// Assuming Employee interface, modify according to your Employee model
