'use client';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Formik } from 'formik';
import useCreateAllowance from '@/hooks/api/allowance/useCreateAllowance';
import CreateAlloDeducForm from './CreateAlloDeducForm';

interface CreateAllowanceDialogProps {
  refetchAllowance: () => void;
}

const CreateAllowanceDialog: FC<CreateAllowanceDialogProps> = ({
  refetchAllowance,
}) => {
    const [open, setOpen] = useState<boolean>(false)
  const initialValues = {
    name: '',
    amount: 0,
    description: '',
  };
//   const refetchAllowance  = ()=>{};
  const { mutateAsync, isPending, isError } = useCreateAllowance();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={` h-10 items-center justify-center whitespace-nowrap bg-main-grey rounded-md px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 my-2 flex gap-x-2`}
      >
        <Plus />
        Tambah Data
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Data Tunjangan</DialogTitle>
          <DialogDescription>Tambah data baru tunjangan.</DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            console.log(values);
            
            await mutateAsync(values);
            if (!isError) {
              setOpen(false);
              refetchAllowance()
            }
          }}
          enableReinitialize={true}
        >
          <CreateAlloDeducForm
            formType="tunjangan"
            isPending={isPending}
          />
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAllowanceDialog;
