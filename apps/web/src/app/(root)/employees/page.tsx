'use client';
import useGetEmployees from '@/hooks/api/employee/useGetEmployees';
import React, { useEffect, useState } from 'react';
import EmployeeTable from './components/EmployeeTable';
import Pagination from '@/components/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddEmployeeDialog from './components/AddEmployeeDialog';
import AuthGuardCustomer from '@/hoc/AuthGuard';
import JobSelect from '@/components/JobSelect';
import useGetJobs from '@/hooks/api/jobs/useGetJobs';

const Employees = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const initialPage = searchParams.get('page')
    ? Math.ceil(Number(searchParams.get('page')))
    : 1;
  const [page, setPage] = useState<number>(initialPage);
  const [departmentId, setDepartmentId] = useState<number>(0);
  const [jobTitleId, setJobTitleId] = useState<number>(0);
    const { data: jobs, isLoading:isLoadingJobs } = useGetJobs();


  const { data, status, isLoading, error , refetch:refetchEmployees} = useGetEmployees({
    page,
    take: 10,
    
  });
  const handleChangePaginate = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;

    // Update the page state
    setPage(newPage);

    // Update the URL without reloading the page
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.replace(`${pathname}?${params}`);
  };

  useEffect(() => {
    const currentPage = Number(searchParams.get('page')) || 1;
    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [searchParams]);
  return (
    <main className="container px-8 py-12">
      <h2 className="mx-auto mb-4 max-w-6xl text-2xl font-bold">Data Karyawan</h2>
      <div className="container mx-auto rounded-lg mb-10 min-h-[640px] max-h-[720px] min-w-[840px] max-w-6xl border-2 bg-white py-4 shadow-xl flex flex-col justify-between">
        {isLoading || !data ? (
          <div className='p-4 mx-auto my-16'><h3 className='font-light text-2xl'>Mengambil Data...</h3></div>
        ) : (
          <div className="px-4 ">
            <div className="flex justify-end mx-2 items-center">
              {!isLoadingJobs && jobs && (<JobSelect departmentId={departmentId} jobTitleId={jobTitleId} jobs={jobs} setDepartmentId={setDepartmentId} setJobTitleId={setJobTitleId} />)}
              <AddEmployeeDialog refetchEmployees={refetchEmployees} jobs={jobs} isLoadingJobs={isLoadingJobs}/>
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

export default AuthGuardCustomer(Employees);
