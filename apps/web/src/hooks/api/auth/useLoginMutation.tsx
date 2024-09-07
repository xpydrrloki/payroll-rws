'use client';
import React from 'react';
import useAxios from '../../useAxios';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const useLoginMutation = () => {
  const { axiosInstance } = useAxios();
  const loginAction = useAuthStore((state) => state.loginAction);
  const router = useRouter();
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
      const user = data.data;
      const token = data.token;
      const payload = { ...user, token };
      loginAction(payload);
      localStorage.setItem('Authorization', `Bearer ${token}`);
      localStorage.setItem('token', `${token}`);

      toast.success('Login berhasil.');
      router.push('/');
    },
    onError: (error: AxiosError<string>) => {
      toast.error(error.response?.data || error.message);
    },
  });
};
export default useLoginMutation;
