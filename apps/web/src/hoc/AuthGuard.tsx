'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthGuardCustomer(Component: any) {
  return function IsAuth(props: any) {
    const [isLoading, setIsLoading] = useState(true);
    const logoutAction = useAuthStore((state) => state.logoutAction);

    const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;

    const { role, id } = useAuthStore((state) => state.user);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });

    useEffect(() => {
      // const token = localStorage.getItem('token');
      if (!id && !token) {
        logoutAction();
        localStorage.removeItem("Authorization")
        localStorage.removeItem("token")
        redirect('/login');
      }
    }),
      [role, isLoading, token];

    [role, isLoading, token];

    if (isLoading || !role) {
      return (
        <h1 className="container flex h-screen justify-center px-4 text-4xl pt-24 font-extrabold">
          Loading...
        </h1>
      );
    }
    return <Component {...props} />;
  };
}
