import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetAttendancesServiceArgs extends PaginationQueryParams {
  // employeeId: number;
  jobTitleId?: number;
  departmentId?: number;
}

export const getAttendancesService = async (
  query: GetAttendancesServiceArgs,
) => {
  try {
    const {
      page,
      sortBy,
      sortOrder,
      take,
      jobTitleId,
      departmentId,
    } = query;
    // const employee = await prisma.employee.findFirst({
    //   where: { id: Number(employeeId) },
    // });
    // if (!employee) {
    //   throw new Error('Data karyawan tidak ditemukan');
    // }
    const whereClause: Prisma.AttendanceWhereInput = {
      // employeeId: Number(employeeId),
      employee: { jobTitleId, departmentId },
    };
    const attendances = await prisma.attendance.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { employee: { include: { jobTitle: true, department: true } } },
    });
    const count = await prisma.attendance.count({ where: whereClause });

    return { data: attendances, meta: { page, take, total: count } };
  } catch (error) {
    throw error;
  }
};
