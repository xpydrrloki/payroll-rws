"use client"
import useAxios from '@/hooks/useAxios';
import { PaginationQueryParams } from '@/types/pagination.type';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React from 'react';
import { toast } from 'sonner';

interface GetAllowancesParams extends PaginationQueryParams {
  search?: string;
}

const useGetAllowances = (query: GetAllowancesParams) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ['allowances', query],
    queryFn: async () => {
      try {
        
        const {data}  = await axiosInstance.get('/allowance', {
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

export default useGetAllowances;
