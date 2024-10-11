import { calculatePayPeriod } from '@/helpers/calculatePayPeriod';
import { normalizeDateToMidnight } from '@/helpers/normalizeDate';
import prisma from '@/prisma';
import { Prisma } from '@prisma/client';

export const createManyPayrollService = async () => {
  try {
    const employees = await prisma.employee.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,
        EmployeePotongan: { include: { potongan: true } },
        EmployeeTunjangan: { include: { tunjangan: true } },
        Attendance: true,
        salary: true,
      },
    });

    if (!employees) {
      throw new Error('Data tidak ditemukan');
    }

    const payrollDataArgs: Prisma.PayrollCreateManyInput[] = [];
    const dateArgs = new Date();
    const { payPeriodEnd, payPeriodStart } = calculatePayPeriod(
      new Date(normalizeDateToMidnight(dateArgs.toISOString())),
    );

    employees.map((employee) => {
      const totalTunjangan = employee.EmployeeTunjangan.reduce(
        (sum, tunjangan) => {
          return sum + tunjangan.tunjangan.amount;
        },
        0,
      );
      const totalPotongan = employee.EmployeePotongan.reduce(
        (sum, potongan) => {
          return sum + potongan.potongan.amount;
        },
        0,
      );
      const grossPay = employee.salary + totalTunjangan;
      const netPay = grossPay - totalPotongan;

      payrollDataArgs.push({
        employeeId: employee.id,
        baseSalary: employee.salary,
        grossPay,
        netPay,
        payPeriodStart,
        payPeriodEnd,
        totalPotongan,
        totalTunjangan,
      });
    });
    const newPayroll = await prisma.payroll.createMany({
      data: payrollDataArgs,skipDuplicates: true
    });
    return {message: `Data payroll sebanyak: ${newPayroll.count} berhasil dibuat untuk ${employees.length} karyawan.`}
  } catch (error) {
    throw error;
  }
};
