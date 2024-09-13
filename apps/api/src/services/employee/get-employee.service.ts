import prisma from '@/prisma';

export const getEmployeeService = async (id: number) => {
  try {
    const employee = await prisma.employee.findFirst({
      where: { id, deletedAt: null },
      include: {
        jobTitle: true,
        department: true,
        Payroll: true,
        Attendance: true,
        Overtime: true,
      },
    });
    if(!employee){
        throw new Error("Data karyawan tidak ditemukan!")
    }

    return employee
  } catch (error) {
    throw error;
  }
};
