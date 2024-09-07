'use client';
import { Button } from './ui/button';
import { baseClass, listSuper } from './HelperSidebar';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import Logo from './Logo';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

export const Sidebar = () => {
  const { username, role } = useAuthStore((state) => state.user);
  const logoutAction = useAuthStore((state) => state.logoutAction);
  const router = useRouter();
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-50 flex  flex-row items-center justify-between gap-4 border-b-2 bg-white px-5 py-6 md:h-screen w-[240px] md:flex-col md:justify-start md:border-b-0 md:border-r-2">
      <div className="flex flex-col items-center justify-between h-full w-full gap-2">
        <div className="flex w-full flex-col items-center gap-2">
          <div className="mb-10 py-4 text-main-black">
            <Logo />
          </div>
          <React.Fragment>
            {listSuper.map((item, index) => (
              <Button
                key={index}
                variant="secondary"
                className={`${baseClass} ${
                  item.url === pathname
                    ? 'w-full justify-start px-4 py-3'
                    : 'w-full justify-start bg-white px-4 py-3 text-black/50'
                }`}
                onClick={() => router.push(item.url)}
              >
                {item.icon}
                {item.name}
              </Button>
            ))}
          </React.Fragment>
        </div>
        <div className="w-full flex flex-col gap-6 ">
          <div className="items-start flex flex-col justify-between h-full gap-y-2 px-4">
            <p className="text-xl">{username}</p>
            <p className="text-lg font-bold">{role}</p>
          </div>
          <div>
            <Button
              variant="link"
              className="w-fit justify-start gap-4 px-4 py-3 text-red-500"
              onClick={() => {
                localStorage.removeItem('Authorization');
                localStorage.removeItem('token');
                logoutAction();
                router.push('/login');
                toast.warning("Anda sudah ter-logout.")
              }}
            >
              <LogOut size={20} />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
