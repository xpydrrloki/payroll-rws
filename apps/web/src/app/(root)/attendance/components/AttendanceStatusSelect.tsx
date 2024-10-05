import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { normalizeDateToMidnight } from '@/helper/normalizeDate';
import useUpdateManyAttendanceStatus from '@/hooks/api/attendance/useUpdateManyAttendanceStatus';
import { AttendanceStatus } from '@/types/attendance.type';
import { RowSelectionState } from '@tanstack/react-table';
import { useFormik } from 'formik';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';

interface AttendanceStatusSelectProps {
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  enableUpdate: boolean;
  refetchAtt: () => void;
  selectedDate: Date | undefined;
}
interface UpdateManyAttendanceArgs {
  ids: string[]; // Set `ids` as string array
  status: string;
}

const AttendanceStatusSelect: FC<AttendanceStatusSelectProps> = ({
  rowSelection,
  enableUpdate,
  refetchAtt,
  setRowSelection,
  selectedDate,
}) => {
  const { mutateAsync, isPending } = useUpdateManyAttendanceStatus();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    values,
    touched,
    resetForm,
    setFieldValue,
  } = useFormik<UpdateManyAttendanceArgs>({
    initialValues: {
      ids: [],
      status: '',
    },
    onSubmit: async (values) => {
      await mutateAsync(values);
      resetForm();
      setFieldValue('ids', Object.keys(rowSelection));
      setRowSelection({});
      refetchAtt();
    },
  });
  useEffect(() => {
    setFieldValue('ids', Object.keys(rowSelection));
  }, [rowSelection]);

  const parsedDate = selectedDate
    ? new Date(normalizeDateToMidnight(selectedDate.toDateString()))
    : undefined;

  // Ensure selectedDate is properly compared
  const now = new Date(normalizeDateToMidnight(new Date().toISOString()));

  const isPastDate = parsedDate && parsedDate < now;

  

  return (
    <form
      onSubmit={handleSubmit}
      className={` items-center justify-between  gap-x-2 flex w-72 `}
    >
      <div className="items-center font-medium w-full ">
        <Select onValueChange={(value) => setFieldValue('status', value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status kehadiran" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(AttendanceStatus).map((status) => (
              <SelectItem key={status} value={status as string}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        disabled={(!enableUpdate && isPastDate) || isPending || !values.status} // Disable button while loading
      >
        {isPending ? 'Menyimpan data...' : 'Simpan'}
      </Button>
    </form>
  );
};

export default AttendanceStatusSelect;
