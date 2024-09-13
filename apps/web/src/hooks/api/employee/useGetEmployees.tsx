'use client';

import useAxios from '@/hooks/useAxios';
import { Employee } from '@/types/employee.type';
import { PaginationQueryParams } from '@/types/pagination.type';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface GetEmployeeQueries extends PaginationQueryParams {
  search?: string;
}

const useGetEmployees = (queries: GetEmployeeQueries) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ['employees', queries],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get<{
          data: Employee[];
          meta: any;
        }>('/employee', { params: queries });
        return data;
      } catch (error) {
        if (error instanceof AxiosError) {
          
          toast.error(error.response?.data.message || error.message) ;
        }
      }
    
    },
    
  });
};

export default useGetEmployees;
