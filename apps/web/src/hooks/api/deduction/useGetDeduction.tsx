"use client"

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useGetDeduction = (id?: number) => {
    const { axiosInstance } = useAxios();
    return useQuery({
      queryKey: ['deduction', id],
      queryFn: async () => {
        try {
          if(!id){
              return
          }
          const { data } = await axiosInstance.get(`/deduction/${id}`);
          return data;
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data.message || error.message);
          }
        }
      },
    });
}

export default useGetDeduction