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

const useCreateAllowance = () => {
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: CreateAllowanceArgs) => {
      
        const {data} = await axiosInstance.post("/allowance", payload)
        toast.success(data.message)
    },
    onError : (error: AxiosError<string>) => {
        toast.error(error.response?.data || error.message);
      },
  });
};

export default useCreateAllowance;
