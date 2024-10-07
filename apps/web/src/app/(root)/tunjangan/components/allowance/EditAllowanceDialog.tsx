'use client';
import useGetAllowance from '@/hooks/api/allowance/useGetAllowance';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Formik } from 'formik';
import useEditAllowance from '@/hooks/api/allowance/useEditAllowance';
import CreateAlloDeducForm from '../CreateAlloDeducForm';
import { getChangedValues } from '@/utils/getChangedValues';

interface EditAllowanceDialogProps {
  refetchAllowances: () => void;
  id: number | undefined;
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
}

const EditAllowanceDialog: FC<EditAllowanceDialogProps> = ({ id,refetchAllowances,openState,setOpenState }) => {
  const { data, isLoading , refetch} = useGetAllowance(id);
  const { mutateAsync, isPending, isError } = useEditAllowance(id);

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
          <DialogTrigger
          >
           
          </DialogTrigger>
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
                  refetchAllowances()
                }
              }}
              enableReinitialize={true}
            >
              <CreateAlloDeducForm formType="tunjangan" isPending={isPending} />
            </Formik>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EditAllowanceDialog;
