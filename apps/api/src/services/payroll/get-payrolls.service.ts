import { PaginationQueryParams } from '@/types/pagination.type';
import { Prisma } from '@prisma/client';

interface GetPayrollQueryParams extends PaginationQueryParams {
  month?: Date;
  jobTitleId?: number;
  departmentId?: number;
}
export const getPayrollsService = async (query: GetPayrollQueryParams) => {
  try {
    const { page, sortBy, sortOrder, take, departmentId, jobTitleId, month } =
      query;

      const parseDate = month 
      const whereClause: Prisma.PayrollWhereInput = {
        employee:{jobTitleId, departmentId}
        // date: {gte: month, lt: month?.getMonth()+1}
      }
  } catch (error) {
    throw error;
  }
};
