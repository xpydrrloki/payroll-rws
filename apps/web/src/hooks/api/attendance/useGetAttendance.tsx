"use client"
import useAxios from '@/hooks/useAxios';
import { PaginationQueryParams } from '@/types/pagination.type';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface GetAttendancesQuery extends PaginationQueryParams {
  jobTitleId?: number;
  departmentId?: number;
  date?: string;
}

const useGetAttendance = (query: GetAttendancesQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ['attendances', query],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get('/attendance', {
            params: query,
          });
          return data
      } catch (error) {
        if (error instanceof AxiosError) {
          
            toast.error(error.response?.data.message || error.message) ;
          }
      }
    },
  });
};

export default useGetAttendance;
