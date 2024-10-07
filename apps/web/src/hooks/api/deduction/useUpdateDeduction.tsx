"use client"
import useAxios from '@/hooks/useAxios';
import { Potongan } from '@/types/payroll.type';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react'
import { toast } from 'sonner';

const useUpdateDeduction = (id?: number) => {
   const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: Partial<Potongan>) => {
      const { data } = await axiosInstance.patch(`/deduction/${id}`, payload);
      toast.success(data.message);
    },
    onError: (error: AxiosError<string>) => {
      toast.error(error.response?.data || error.message);
    },
  });
}

export default useUpdateDeduction