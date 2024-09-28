'use client';

import useAxios from '@/hooks/useAxios';
import { AttendanceStatus } from '@/types/attendance.type';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useUpdateManyAttendanceStatus = () => {
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: { ids: string[]; status: string }) => {
      try {
        const {data} = await axiosInstance.patch('/attendance/multi', payload);
        toast.success(data.message)
      } catch (error) {
        throw error;
      }
    },
    onError: (error: AxiosError<string>) => {
        toast.error(error.response?.data || error.message);
      },
  });
};

export default useUpdateManyAttendanceStatus;
