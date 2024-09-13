import DatePicker from '@/components/DatePicker';
import FormInput from '@/components/FormInput';
import SelectInput from '@/components/SelectInput';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useCreateEmployee from '@/hooks/api/employee/useCreateEmployee';
import useGetJobs from '@/hooks/api/jobs/useGetJobs';
import { useAuthStore } from '@/store/useAuthStore';
import { Employee, EmployeeType } from '@/types/employee.type';
import { PaginationMeta } from '@/types/pagination.type';
import { Role } from '@/types/user.type';
import { QueryObserverResult } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { Loader2, Plus } from 'lucide-react';
import { FC, useState } from 'react';

interface AddEmployeeDialogProps {
  refetchEmployees: () => Promise<QueryObserverResult>;
}

const AddEmployeeDialog: FC<AddEmployeeDialogProps> = ({
  refetchEmployees,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { role } = useAuthStore((state) => state.user);
  const employeeType = ['KARYAWAN_TETAP', 'KARYAWAN_LEPAS'];
  const { data: jobs, isLoading } = useGetJobs();
  console.log('ini jobs', jobs);

  const [date, setDate] = useState<Date | undefined>();
  const { mutateAsync, isPending } = useCreateEmployee();
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    values,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      address: '',
      jobTitleId: 0,
      departmentId: 0,
      hiringDate: new Date(),
      employeeType: '',
    },
    onSubmit: async (values) => {
      const payload = {
        ...values,
        employeeType:
          EmployeeType[values.employeeType as keyof typeof EmployeeType],
      };

      await mutateAsync(payload);
      await refetchEmployees();
      resetForm();
      setOpen(false);
    },
  });
  // console.log(jobs[0]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={` h-10 items-center justify-center whitespace-nowrap bg-main-grey rounded-md px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 my-2 ${(role as Role) == 'ADMIN' ? 'hidden' : 'inline-flex'}`}
      >
        <Plus />
        Tambah Data
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Data Karyawan</DialogTitle>
          <DialogDescription>Tambah data baru karyawan.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {isLoading || !jobs ? (
            <div>Loading</div>
          ) : (
            <div>
              <FormInput
                name="name"
                label="Nama Karyawan"
                error={errors.name}
                isError={!!touched.name && !!errors.name}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Nama karyawan"
                type="text"
                value={values.name}
              />
              <FormInput
                name="address"
                label="Alamat (opsional)"
                error={errors.address}
                isError={!!touched.address && !!errors.address}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Jl. Segitiga 123"
                type="text"
                value={values.address}
              />
              <FormInput
                name="phoneNumber"
                label="Nomor Telepon (opsional)"
                error={errors.phoneNumber}
                isError={!!touched.phoneNumber && !!errors.phoneNumber}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="081234567890"
                type="text"
                value={values.phoneNumber}
              />
              <div className="flex w-full justify-between gap-x-4">
                <DatePicker
                  date={date}
                  setDate={setDate}
                  name="hiringDate"
                  label="Mulai Kerja"
                  isError={!!touched.hiringDate && !!errors.hiringDate}
                />
                <SelectInput
                  field={{
                    name: 'employeeType',
                    onBlur: handleBlur,
                    onChange: handleChange,
                    value: values.employeeType,
                  }}
                  form={{ touched, errors, setFieldValue, values }}
                  label="Tipe Karyawan"
                  options={employeeType}
                  placeholder="Tipe karyawan"
                  isError={!!touched.employeeType && !!errors.employeeType}
                />
              </div>
             
              <div className="flex justify-between gap-x-6 w-full">
                <div className="my-3 flex w-full flex-col space-y-1.5 h-fit z-30">
                  <Label
                    htmlFor={'departmentId'}
                    className={
                      !!touched.departmentId && !!errors.departmentId
                        ? 'text-red-600'
                        : ''
                    }
                  >
                    {'Departement'}
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setFieldValue('departmentId', value)
                    }
                    required={true}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={'Pilih Departemen'} />
                    </SelectTrigger>
                    <SelectContent
                      className={`${!!touched.departmentId && !!errors.departmentId ? 'border-red-600' : 'bg-white'} h-fit mb-10`}
                    >
                      {jobs?.map((job, idx) => (
                        <SelectItem key={idx} value={String(job.id)}>
                          {job.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!!touched.departmentId && !!errors.departmentId ? (
                    <div className="text-xs text-red-500">
                      {String(errors['departmentId'])}
                    </div>
                  ) : null}
                </div>
                <div
                  className={`my-3  w-full flex-col space-y-1.5 h-fit z-30 ${values.departmentId == 0 ? 'hidden' : 'flex'} transition-all duration-200`}
                >
                  <Label
                    htmlFor={'jobTitleId'}
                    className={
                      !!touched.jobTitleId && !!errors.jobTitleId
                        ? 'text-red-600'
                        : ''
                    }
                  >
                    {'Jabatan'}
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setFieldValue('jobTitleId', value)
                    }
                    required={true}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={'Pilih Jabatan'} />
                    </SelectTrigger>
                    <SelectContent
                      className={`${!!touched.jobTitleId && !!errors.jobTitleId ? 'border-red-600' : 'bg-white'} h-fit mb-10`}
                    >
                      {jobs[
                        values.departmentId == 0 ? 0 : values.departmentId - 1
                      ].JobTitle.map((title, idx) => (
                        <SelectItem key={idx} value={String(title.id)}>
                          {title.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!!touched.jobTitleId && !!errors.jobTitleId ? (
                    <div className="text-xs text-red-500">
                      {String(errors['jobTitleId'])}
                    </div>
                  ) : null}
                </div>
              </div>

              <Button
                type="submit"
                className=" mt-6 w-full text-white z-0"
                disabled={isPending}
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? 'Processing' : 'Submit'}
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeDialog;
