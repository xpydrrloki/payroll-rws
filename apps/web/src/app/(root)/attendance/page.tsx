'use client';
import useGetAttendance from '@/hooks/api/attendance/useGetAttendance';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AttendanceTable from './components/AttendanceTable';
import Pagination from '@/components/Pagination';
import DatePicker from '@/components/DatePicker';

import useGetJobs from '@/hooks/api/jobs/useGetJobs';
import JobSelect from '@/components/JobSelect';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import EnableUpdateSwitch from './components/EnableUpdateSwitch';
import AttendanceStatusSelect from './components/AttendanceStatusSelect';
import { RowSelectionState } from '@tanstack/react-table';

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
  const [enableUpdate, setEnableUpdate] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data: jobs, isLoading: isLoadingJobs } = useGetJobs();
  const {
    data,
    status,
    isLoading: isLoadingAttQuery,
    error,
    refetch: refetchAttendance,
  } = useGetAttendance({
    page,
    take: 20,
    date: date?.toISOString(),
    departmentId,
    jobTitleId,
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
  useEffect(() => {
    setRowSelection({});
  }, [date]);
  return (
    <main className="container px-8 py-12">
      <h2 className="mx-auto mb-4 max-w-6xl text-2xl font-bold">
        Presensi & Lembur
      </h2>
      <div className="container mx-auto rounded-lg mb-10 min-h-[640px]  min-w-[840px] max-w-6xl border-2 bg-white py-4 shadow-xl flex flex-col justify-between">
        {isLoadingAttQuery || !data ? (
          <div className="p-4 mx-auto my-16">
            <h3 className="font-light text-2xl">Mengambil Data...</h3>
          </div>
        ) : (
          <div className="px-4">
            <div className="flex mx-2 items-center justify-around gap-x-4">
              <DatePicker
                captionLayout="buttons"
                date={date}
                setDate={handleDateChange}
                name=""
                disabled={{ after: new Date() }}
              />
              <EnableUpdateSwitch
                switchState={enableUpdate}
                setSwitchState={setEnableUpdate}
                selectedDate={date}
              />
              {isLoadingJobs || !jobs ? (
                <></>
              ) : (
                <JobSelect
                  jobs={jobs}
                  departmentId={departmentId}
                  jobTitleId={jobTitleId}
                  setDepartmentId={setDepartmentId}
                  setJobTitleId={setJobTitleId}
                />
              )}
            </div>
            <div className="flex mx-2 justify-between  items-center gap-x-4 my-2 h-9 transition-all duration-75">
              <div>Search...</div>
              {Object.keys(rowSelection).length ? (
                <AttendanceStatusSelect
                  rowSelection={rowSelection}
                  enableUpdate={enableUpdate}
                  refetchAtt={refetchAttendance}
                  setRowSelection={setRowSelection}
                />
              ) : (
                <></>
              )}
            </div>
            <AttendanceTable
              attendances={data.data}
              enableRowSelection={true}
              refetchAtt={refetchAttendance}
              selectedDate={date}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              enableUpdate={enableUpdate}
            />
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
