'use client';
import useAxios from '@/hooks/useAxios';
import { Department } from '@/types/employee.type';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useGetJobs = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      try {
        const {data} = await axiosInstance.get<Department[]>('/job');
        
        return data
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message || error.message);
        }
      }
    },
  });
};

export default useGetJobs;
