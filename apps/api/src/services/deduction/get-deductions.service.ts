import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetDeductionsParams extends PaginationQueryParams {
  search?: string;
}

export const getDeductionsServices = async (query: GetDeductionsParams) => {
  try {
    const { page, sortBy, sortOrder, take, search } = query;

    const whereClause: Prisma.PotonganWhereInput = {
      name: { contains: search },
      deletedAt: null,
    };

    const deductions = await prisma.potongan.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        EmployeePotongan: {
          include: { employee: { include: { Payroll: true } } },
        },
      },
    });

    const count = await prisma.potongan.count({ where: whereClause });

    return { data: deductions, meta: { page, take, total: count } };
  } catch (error) {
    throw error;
  }
};
