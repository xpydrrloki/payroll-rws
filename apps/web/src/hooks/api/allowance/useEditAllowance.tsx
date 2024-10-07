'use client';
import useAxios from '@/hooks/useAxios';
import { Tunjangan } from '@/types/payroll.type';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { toast } from 'sonner';

const useEditAllowance = (id?: number) => {
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: Partial<Tunjangan>) => {
      const { data } = await axiosInstance.patch(`/allowance/${id}`, payload);
      toast.success(data.message);
    },
    onError: (error: AxiosError<string>) => {
      toast.error(error.response?.data || error.message);
    },
  });
};

export default useEditAllowance;
