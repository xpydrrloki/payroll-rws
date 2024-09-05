'use client';
import { axiosInstance } from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAxios = () => {
  const logoutAction = useAuthStore((state) => state.logoutAction);
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('Authorization')
      : null;
  const parsedToken = token?.split(' ')[1];
  const router = useRouter();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${parsedToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      (err: AxiosError) => {
        if (err?.response?.status === 401) {
          localStorage.removeItem('Authorization');
          localStorage.removeItem('token');
          logoutAction();
        }
        return Promise.reject(err);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.request.eject(responseIntercept);
    };
  }, []);

  return { axiosInstance };
};

export default useAxios;
