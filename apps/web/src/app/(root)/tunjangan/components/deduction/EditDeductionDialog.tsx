'use client';
import useGetDeduction from '@/hooks/api/deduction/useGetDeduction';
import useUpdateDeduction from '@/hooks/api/deduction/useUpdateDeduction';
import React, { Dispatch, FC, SetStateAction } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
import { Formik } from 'formik';
import { getChangedValues } from '@/utils/getChangedValues';
import CreateAlloDeducForm from '../CreateAlloDeducForm';

interface EditDeductionDialogProps {
  refetchDeductions: () => void;
  id: number | undefined;
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
}
const EditDeductionDialog: FC<EditDeductionDialogProps> = ({
  id,
  openState,
  refetchDeductions,
  setOpenState,
}) => {
  const { data, isLoading, refetch } = useGetDeduction(id);
  const { mutateAsync, isPending, isError } = useUpdateDeduction(id);

  const initialValues = {
    name: data?.name || '',
    amount: data?.amount || 0,
    description: data?.description || '',
  };
  return (
    <div>
      {!data || isLoading ? (
        <></>
      ) : (
        <Dialog open={openState} onOpenChange={setOpenState}>
          <DialogTrigger></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Data Tunjangan</DialogTitle>
              <DialogDescription>Tambah data baru tunjangan.</DialogDescription>
            </DialogHeader>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                const payload = getChangedValues(values, initialValues);

                await mutateAsync(payload);
                if (!isError) {
                  setOpenState(false);
                  refetch();
                  refetchDeductions();
                }
              }}
              enableReinitialize={true}
            >
              <CreateAlloDeducForm formType="potongan" isPending={isPending} />
            </Formik>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EditDeductionDialog;
