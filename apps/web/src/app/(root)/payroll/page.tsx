'use client';
import React, { useEffect, useState } from 'react';
import Girik from './components/Girik';
import ReactPDF, { PDFViewer } from '@react-pdf/renderer';
import DatePicker from '@/components/DatePicker';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Payroll = () => {
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

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;

    // Update the page state
    setPage(newPage);

    // Update the URL without reloading the page
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.replace(`${pathname}?${params}`);
  };
  // Update URL when the date changes
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);

    const params = new URLSearchParams(searchParams.toString());
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
    <div>
      <div>
        payroll
        <DatePicker
          captionLayout="buttons"
          name=""
          date={date}
          setDate={setDate}
        />
        
        <PDFViewer width="1000" height="650" className="payroll"><Girik/></PDFViewer>
      </div>
    </div>
  );
};

export default Payroll;
