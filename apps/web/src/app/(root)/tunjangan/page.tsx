'use client';
import useGetAllowances from '@/hooks/api/allowance/useGetAllowances';
import React, { useEffect, useState } from 'react';
import { RowSelectionState } from '@tanstack/react-table';
import Pagination from '@/components/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import useGetDeductions from '@/hooks/api/deduction/useGetDeductions';
import CreateAllowanceDialog from './components/allowance/CreateAllowanceDialog';
import CreateDeductionDialog from './components/deduction/CreateDeductionDialog';
import EditDeductionDialog from './components/deduction/EditDeductionDialog';
import EditAllowanceDialog from './components/allowance/EditAllowanceDialog';
import DeductionTable from './components/deduction/DeductionTable';
import AllowanceTable from './components/allowance/AllowanceTable';
import DeleteAllowanceDialog from './components/allowance/DeleteAllowanceDialog';
import DeleteDeductionDialog from './components/deduction/DeleteDeductionDialog';

const Tunjangan = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const initialAllowancePage = searchParams.get('allowance-page')
    ? Math.ceil(Number(searchParams.get('allowance-page')))
    : 1;
  const initialDeductionPage = searchParams.get('deduction-page')
    ? Math.ceil(Number(searchParams.get('deduction-page')))
    : 1;
  const [allowanceRowSelection, setAllowanceRowSelection] =
    useState<RowSelectionState>({});
  const [deductionRowSelection, setDeductionRowSelection] =
    useState<RowSelectionState>({});
  const [allowancePage, setAllowancePage] =
    useState<number>(initialAllowancePage);

  const [deductionPage, setDeductionPage] =
    useState<number>(initialDeductionPage);
  const [allowanceId, setAllowanceId] = useState<number | undefined>();
  const [deductionId, setDeductionId] = useState<number | undefined>();

  const [openEditAllowance, setOpenEditAllowance] = useState<boolean>(false);
  const [openDeleteAllowance, setOpenDeleteAllowance] =
    useState<boolean>(false);
  const [openEditDeduction, setOpenEditDeduction] = useState<boolean>(false);
  const [openDeleteDeduction, setOpenDeleteDeduction] =
    useState<boolean>(false);

  const {
    data: allowances,
    isLoading: isLoadingAllowance,
    refetch: refetchAllowances,
  } = useGetAllowances({
    page: allowancePage,
    take: 5,
  });

  const {
    data: deductions,
    isLoading: isLoadingDeductions,
    refetch: refetchDeductions,
  } = useGetDeductions({
    page: deductionPage,
    take: 5,
  });

  const handleChangeAllowancePaginate = ({
    selected,
  }: {
    selected: number;
  }) => {
    const newPage = selected + 1;

    // Update the page state
    setAllowancePage(newPage);

    // Update the URL without reloading the page
    const params = new URLSearchParams(searchParams.toString());
    params.set('allowance-page', String(newPage));
    router.replace(`${pathname}?${params}`, { scroll: false });
  };
  const handleChangeDeductionPaginate = ({
    selected,
  }: {
    selected: number;
  }) => {
    const newPage = selected + 1;

    // Update the page state
    setDeductionPage(newPage);

    // Update the URL without reloading the page
    const params = new URLSearchParams(searchParams.toString());
    params.set('deduction-page', String(newPage));
    router.replace(`${pathname}?${params}`, { scroll: false });
  };
  useEffect(() => {
    const currentAllowancePage =
      Number(searchParams.get('allowance-page')) || 1;
    if (currentAllowancePage !== allowancePage) {
      setAllowancePage(currentAllowancePage);
    }
    const currentDeductionPage =
      Number(searchParams.get('deduction-page')) || 1;
    if (currentDeductionPage !== deductionPage) {
      setDeductionPage(currentDeductionPage);
    }
  }, [searchParams]);
  // useEffect(() => {
  //   setAllowanceRowSelection({});
  // }, []);
  return (
    <main className="container px-8 py-12">
      <h2 className="mx-auto mb-4 max-w-6xl text-2xl font-bold">
        Tunjangan & Potongan
      </h2>
      <div className="container mx-auto rounded-lg mb-10 min-h-[480px]  min-w-[840px] max-w-6xl border-2 bg-white py-4 shadow-xl flex flex-col">
        <h2 className="px-4 max-w-6xl text-lg font-bold">Tunjangan</h2>
        {isLoadingAllowance || !allowances ? (
          <div className="p-4 mx-auto my-16">
            <h3 className="font-light text-2xl">Mengambil Data...</h3>
          </div>
        ) : (
          <div className="px-4">
            <div className="flex justify-end mx-2 items-center">
              <CreateAllowanceDialog refetchAllowance={refetchAllowances} />
              <EditAllowanceDialog
                id={allowanceId}
                openState={openEditAllowance}
                setOpenState={setOpenEditAllowance}
                refetchAllowances={refetchAllowances}
              />
              <DeleteAllowanceDialog
                id={allowanceId}
                openState={openDeleteAllowance}
                setOpenState={setOpenDeleteAllowance}
                refetchAllowances={refetchAllowances}
              />
            </div>
            <AllowanceTable
              allowances={allowances.data}
              rowSelection={allowanceRowSelection}
              setRowSelection={setAllowanceRowSelection}
              enableRowSelection={true}
              allowanceId={allowanceId}
              openState={openEditAllowance}
              setOpenState={setOpenEditAllowance}
              setAllowanceId={setAllowanceId}
              openDeleteDialog={openDeleteAllowance}
              setOpenDeleteDialog={setOpenDeleteAllowance}
            />
          </div>
        )}
        <div className="container items-center mb-4 flex justify-center">
          <Pagination
            total={allowances?.meta?.total || 0}
            take={allowances?.meta?.take || 0}
            onChangePage={handleChangeAllowancePaginate}
          />
        </div>
      </div>
      <div className="container mx-auto rounded-lg mb-10 min-h-[480px]  min-w-[840px] max-w-6xl border-2 bg-white py-4 shadow-xl flex flex-col">
        <h2 className="px-4 max-w-6xl text-lg font-bold">Potongan</h2>
        {isLoadingDeductions || !deductions ? (
          <div className="p-4 mx-auto my-16">
            <h3 className="font-light text-2xl">Mengambil Data...</h3>
          </div>
        ) : (
          <div className="px-4">
            <div className="flex justify-end mx-2 items-center">
              <CreateDeductionDialog refetch={refetchDeductions} />
              <EditDeductionDialog
                id={deductionId}
                openState={openEditDeduction}
                refetchDeductions={refetchDeductions}
                setOpenState={setOpenEditDeduction}
              />
              <DeleteDeductionDialog
                id={deductionId}
                openState={openDeleteDeduction}
                setOpenState={setOpenDeleteDeduction}
                refetchDeductions={refetchDeductions}
              />
            </div>
            <DeductionTable
              deductions={deductions.data}
              rowSelection={deductionRowSelection}
              setRowSelection={setDeductionRowSelection}
              enableRowSelection={true}
              deductionId={deductionId}
              openState={openEditDeduction}
              setDeductionId={setDeductionId}
              setOpenState={setOpenEditDeduction}
              openDeleteDeduction={openDeleteDeduction}
              setOpenDeleteDeduction={setOpenDeleteDeduction}
            />
          </div>
        )}
        <div className="container items-center mb-4 flex justify-center">
          <Pagination
            total={deductions?.meta?.total || 0}
            take={deductions?.meta?.take || 0}
            onChangePage={handleChangeDeductionPaginate}
          />
        </div>
      </div>
    </main>
  );
};

export default Tunjangan;
