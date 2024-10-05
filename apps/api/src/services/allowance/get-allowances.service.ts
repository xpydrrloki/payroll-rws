import prisma from '@/prisma';
import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetAllowancesParams extends PaginationQueryParams {
  search?: string;
}

export const getAllowancesServices = async (query: GetAllowancesParams) => {
  try {
    const { page, sortBy, sortOrder, take, search } = query;
    const whereClause: Prisma.TunjanganWhereInput = {
      name: { contains: search },
      deletedAt: null
    };

    const allowances = await prisma.tunjangan.findMany({
      where: whereClause,
      skip: (page - 1) * take,
      take: take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        EmployeeTunjangan: {
          include: { employee: { include: { Payroll: true } } },
        },
      },
    });

    const count = await prisma.tunjangan.count({ where: whereClause });

    return { data: allowances, meta: { page, take, total: count } };
  } catch (error) {
    throw error;
  }
};
