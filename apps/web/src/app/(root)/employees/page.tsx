'use client';
import useGetEmployees from '@/hooks/api/employee/useGetEmployees';
import React, { useState } from 'react';
import EmployeeTable from './components/EmployeeTable';
import Pagination from '@/components/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddEmployeeDialog from './components/AddEmployeeDialog';

const Employees = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  );

  const { data, status, isLoading, error } = useGetEmployees({
    page,
    take: 10,
  });
  const handleChangePaginate = ({ selected }: { selected: number }) => {
    const params = new URLSearchParams(searchParams);
    if (selected == page) {
      params.set('page', String(selected + 1));
    } else {
      params.delete('page');
    }
    router.replace(`${pathname}?${params}`);
    setPage(selected + 1);
  };
  return (
    <main className="container px-8 py-12">
      <h2 className="mx-auto mb-4 max-w-6xl text-2xl font-bold">Employees</h2>
      <div className="container mx-auto mb-10 min-h-[640px] max-h-[720px] min-w-[840px] max-w-6xl border-2 bg-white py-4 shadow-xl flex flex-col justify-between">
        {isLoading || !data ? (
          <div>Loading...</div>
        ) : (
          <div className='px-4'>
            <div className="flex justify-end mx-2 ">
              <AddEmployeeDialog/>
            </div>
            <EmployeeTable employees={data.data} />
          </div>
        )}
        <div className="container items-center mb-4 flex justify-center">
          <Pagination
            total={data?.meta?.total || 0}
            take={data?.meta?.take || 0}
            onChangePage={handleChangePaginate}
          />
        </div>
      </div>
    </main>
  );
};

export default Employees;
