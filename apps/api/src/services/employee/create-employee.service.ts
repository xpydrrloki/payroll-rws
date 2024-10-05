import prisma from '@/prisma';
import { Employee } from '@prisma/client';

interface CreateEmployeeArgs
  extends Omit<Employee, 'deletedAt' | 'updatedAt' | 'id'> {}
export const createEmployeeService = async (body: CreateEmployeeArgs) => {
  try {
    const {
      address,
      departmentId,
      employeeType,
      hiringDate,
      jobTitleId,
      name,
      phoneNumber,
      salary
    } = body;

    const newEmployee = await prisma.employee.create({
      data: {
        address,
        employeeType,
        hiringDate,
        name,
        jobTitleId : Number(jobTitleId),
        departmentId : Number(departmentId),
        phoneNumber,
        salary
      },
    });
    return {
      message: 'Data karyawan berhasil ditambahkan.',
      // data: newEmployee,
    };
  } catch (error) {
    throw error;
  }
};
