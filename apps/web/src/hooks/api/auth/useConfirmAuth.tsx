import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { toast } from 'sonner';

const useConfirmAuth = () => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: { username: string; password: string }) => {
      try {
        const {data} = await axiosInstance.post('/auth/login', payload);
        return data
      } catch (error) {
        throw error;
      }
    },
    onSuccess: async (data) => {
      
    },
    onError: (error: AxiosError<string>) => {
      toast.error(error.response?.data || error.message);
    },
  });
};

export default useConfirmAuth;
