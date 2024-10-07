'use client';
import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import useDeleteAllowance from '@/hooks/api/allowance/useDeleteAllowance';
import { Loader2 } from 'lucide-react';

interface DeleteAllowanceDialogProps {
  refetchAllowances: () => void;
  id: number | undefined;
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
}

const DeleteAllowanceDialog: FC<DeleteAllowanceDialogProps> = ({
  id,
  openState,
  refetchAllowances,
  setOpenState,
}) => {
  const { mutateAsync, isError, isPending } = useDeleteAllowance();
  const handleOnDelete = async () => {
    await mutateAsync(id);
    refetchAllowances();
  };
  return (
    <AlertDialog open={openState} onOpenChange={setOpenState}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus data?</AlertDialogTitle>
          <AlertDialogDescription>Apakah Anda yakin?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => handleOnDelete()}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? 'Processing' : 'Ya'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAllowanceDialog;
