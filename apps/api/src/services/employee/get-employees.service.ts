import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { EmployeeType, Prisma, Role } from '@prisma/client';

interface GetEmployeesParams extends PaginationQueryParams {
  search?: string;
  userRole?: Role;
  departmentId?: number
  jobTitleId?:number 
}
export const getEmployeesService = async (query: GetEmployeesParams) => {
  try {
    const { page, sortBy, sortOrder, take, search, userRole,departmentId,jobTitleId, } = query;

    const whereClause: Prisma.EmployeeWhereInput = {
      deletedAt: null,
      employeeType: userRole == 'ADMIN' ? { not: 'KARYAWAN_LEPAS' } : undefined,
      departmentId: departmentId ,
      jobTitleId: jobTitleId,
      name:{contains:search}
    };

    const employees = await prisma.employee.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        jobTitle: true,
        department: true,
      },
    });
    const count = await prisma.employee.count({ where: whereClause });

    return {
      data: employees,
      meta: { page, take, total: count },
    };
  } catch (error) {
    throw error;
  }
};
