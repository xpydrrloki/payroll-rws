'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import useDeleteDeduction from '@/hooks/api/deduction/useDeleteDeduction';
import { Loader2 } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

interface DeleteDeductionDialogProps {
  refetchDeductions: () => void;
  id: number | undefined;
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
}

const DeleteDeductionDialog: FC<DeleteDeductionDialogProps> = ({
  id,
  openState,
  refetchDeductions,
  setOpenState,
}) => {
  const { mutateAsync, isError, isPending } = useDeleteDeduction();
  const handleOnDelete = async () => {
    await mutateAsync(id);
    refetchDeductions();
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

export default DeleteDeductionDialog;
