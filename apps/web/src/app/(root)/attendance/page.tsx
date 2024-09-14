'use client';
import useGetAttendance from '@/hooks/api/attendance/useGetAttendance';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AttendanceTable from './components/AttendanceTable';
import Pagination from '@/components/Pagination';
import DatePicker from '@/components/DatePicker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import useGetJobs from '@/hooks/api/jobs/useGetJobs';

const Attendance = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const initialPage = searchParams.get('page')
    ? Math.ceil(Number(searchParams.get('page')))
    : 1;
  const initialDate = searchParams.get('date')
    ? new Date(searchParams.get('date')!)
    : undefined;
  const [page, setPage] = useState<number>(initialPage);
  const [departmentId, setDepartmentId] = useState<number>(0);
  const [jobTitleId, setJobTitleId] = useState<number>(0);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const { data: jobs, isLoading: isLoadingJobs } = useGetJobs();
  const {
    data,
    status,
    isLoading: isLoadingAttQuery,
    error,
    refetch: refetchAttendance,
  } = useGetAttendance({
    page,
    take: 10,
    date: date?.toISOString(),
    departmentId,
    jobTitleId
  });
  const handleChangePaginate = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;

    // Update the page state
    setPage(newPage);

    // Update the URL without reloading the page
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    router.replace(`${pathname}?${params}`);
  };
  // Update URL when the date changes
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);

    const params = new URLSearchParams(searchParams);
    if (newDate) {
      params.set('date', newDate.toISOString()); // Add date to query params
    } else {
      params.delete('date'); // Remove date if not selected
    }
    params.set('page', String(page)); // Keep page in URL
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
      <h2 className="mx-auto mb-4 max-w-6xl text-2xl font-bold">
        Presensi & Lembur
      </h2>
      <div className="container mx-auto rounded-lg mb-10 min-h-[640px] max-h-[720px] min-w-[840px] max-w-6xl border-2 bg-white py-4 shadow-xl flex flex-col justify-between">
        {isLoadingAttQuery || !data || isLoadingJobs || !jobs ? (
          <div className="p-4 mx-auto my-16">
            <h3 className="font-light text-2xl">Mengambil Data...</h3>
          </div>
        ) : (
          <div className="px-4">
            <div className="flex justify-start mx-2 items-center">
              {/* <AddEmployeeDialog refetchEmployees={refetchEmployees}/> */}
              <DatePicker
                captionLayout="buttons"
                date={date}
                setDate={handleDateChange}
                name=""
              />
              <div className="flex items-center gap-x-8">
                <div className="w-48">
                  <Label htmlFor={'departmentId'}>{'Departemen'}</Label>
                  <Select
                    name="departmentId"
                    onValueChange={(value) => setDepartmentId(Number(value))}
                    defaultValue={String(departmentId)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={'Pilih Departemen'} />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs?.map((job, idx) => (
                        <SelectItem key={idx} value={String(job.id)}>
                          {job.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div
                  className={`${departmentId == 0 ? 'w-0 text-transparent border-none' : 'w-48 '} transition-all duration-200`}
                >
                  <Label htmlFor={'jobTitleId'}>{'Jabatan'}</Label>
                  <Select name='jobTitleId' onValueChange={(val)=>setJobTitleId(Number(val))}
                    value={String(jobTitleId)}>
                    <SelectTrigger
                      className={`${departmentId == 0 ? 'w-0 hidden border-none' : 'w-48 '} transition-all duration-200`}
                    >
                      <SelectValue placeholder={'Pilih Jabatan'} />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs[
                        departmentId == 0 ? 0 : departmentId - 1
                      ].JobTitle.map((title, idx) => (
                        <SelectItem key={idx} value={String(title.id)}>
                          {title.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* <div>asdasd</div> */}
            </div>
            <AttendanceTable attendances={data.data} />
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

export default Attendance;
