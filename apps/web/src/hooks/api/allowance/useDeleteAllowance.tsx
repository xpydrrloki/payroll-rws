import useAxios from '@/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useDeleteAllowance = () => {
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (id?: number) => {
      if (id) {
        const { data } = await axiosInstance.delete(`/allowance/${id}`);
        toast.success(data.message);
      } else {
        return null;
      }
    },
    onError: (error: AxiosError<string>) => {
      toast.error(error.response?.data || error.message);
    },
  });
};

export default useDeleteAllowance;
