"use client"
import useAxios from '@/hooks/useAxios';
import { PaginationQueryParams } from '@/types/pagination.type';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { toast } from 'sonner';

interface GetDeductionsParams extends PaginationQueryParams {
  search?: string;
}

const useGetDeductions = (query: GetDeductionsParams) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ['deductions', query],
    queryFn: async () => {
      try {
        const {data}  = await axiosInstance.get('/deduction', {
          params: query,
        });
        return data;
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message || error.message);
        }
      }
    },
  });
};

export default useGetDeductions;
