'use client';

import useAxios from '@/hooks/useAxios';
import { AttendanceStatus } from '@/types/attendance.type';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useUpdateAttendanceStatus = () => {
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: { id: number; status: string }) => {
      try {
        const {data} = await axiosInstance.patch('/attendance', payload);
        // toast.success(data.message)
      } catch (error) {
        throw error;
      }
    },
    onError: (error: AxiosError<string>) => {
        toast.error(error.response?.data || error.message);
      },
  });
};

export default useUpdateAttendanceStatus;
