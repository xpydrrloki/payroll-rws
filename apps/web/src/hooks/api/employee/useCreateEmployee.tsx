import useAxios from '@/hooks/useAxios';
import { Employee, EmployeeType } from '@/types/employee.type';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

interface CreateEmployeeArgs {
  name: string;
  phoneNumber: string;
  address: string;
  jobTitleId: number;
  departmentId: number;
  employeeType: EmployeeType;
  hiringDate: Date;
}
const useCreateEmployee = () => {
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: CreateEmployeeArgs) => {
      try {
        const response = await axiosInstance.post<{message:string, data:Employee}>('/employee', payload);
        toast.success(response.data.message);
      } catch (error) {
        throw error;
      }
    },
    onError: (error: AxiosError<string>) => {
      toast.error(error.response?.data || error.message);
    },
  });
};

export default useCreateEmployee;
