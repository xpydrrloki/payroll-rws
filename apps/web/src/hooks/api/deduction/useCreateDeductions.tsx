'use client';
import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface CreateAllowanceArgs {
  name: string;
  amount: number;
  description: string;
}

const useCreateDeductions = () => {
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: CreateAllowanceArgs) => {
        const {data} = await axiosInstance.post("/deduction", payload)
        toast.success(data.message)
    },
    onError : (error: AxiosError<string>) => {
        toast.error(error.response?.data || error.message);
      },
  });
};

export default useCreateDeductions;
