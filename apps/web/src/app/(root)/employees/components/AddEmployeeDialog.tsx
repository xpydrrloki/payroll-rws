import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { FC } from 'react';

interface AddEmployeeDialogProps {}

const AddEmployeeDialog: FC<AddEmployeeDialogProps> = () => {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex h-10 items-center justify-center whitespace-nowrap bg-main-grey rounded-md px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 my-2">
        <Plus />
        Tambah Data
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Data Karyawan</DialogTitle>
          <DialogDescription>
            Tambah data baru karyawan.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
