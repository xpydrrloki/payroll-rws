'use client';
import { axiosInstance } from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAxios = () => {
  const logoutAction = useAuthStore((state) => state.logoutAction);

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
      (err: AxiosError) => {
        if (err?.response?.status === 401) {
          logoutAction();
          localStorage.removeItem('Authorization');
          localStorage.removeItem('token');
        }
        return Promise.reject(err);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.request.eject(responseIntercept);
    };
  }, [window.localStorage, logoutAction]);

  return { axiosInstance };
};

export default useAxios;
