'use client';
import { axiosInstance } from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAxios = () => {
  const logoutAction = useAuthStore((state) => state.logoutAction);
  const router = useRouter();

  const value = typeof window !== 'undefined' ? localStorage : null;

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      async (err: AxiosError) => {
        if (err?.response?.status === 401) {
          await new Promise<void>((res) => {
            setTimeout(res, 2000);
          });
          logoutAction();
          localStorage.removeItem('Authorization');
          localStorage.removeItem('token');

          router.push('/login');

        }
        return Promise.reject(err);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.request.eject(responseIntercept);
    };
  }, [value, logoutAction]);

  return { axiosInstance };
};

export default useAxios;
