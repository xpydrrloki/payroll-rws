"use client"
import { Sidebar } from '@/components/Sidebar';
import AuthGuardCustomer from '@/hoc/AuthGuard';
import { FC, ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="flex md:flex-row bg-main-offWhite md:justify-between">
      <Sidebar />
      {children}
    </div>
  );
};

export default AuthGuardCustomer(AuthLayout);
