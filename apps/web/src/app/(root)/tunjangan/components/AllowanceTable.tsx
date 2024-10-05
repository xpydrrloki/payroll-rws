import { DataTable } from '@/components/ui/data-table';
import { Employee } from '@/types/employee.type';
import { Dispatch, FC, SetStateAction } from 'react';
import { Tunjangan } from '@/types/payroll.type';
import { RowSelection, RowSelectionState } from '@tanstack/react-table';
import { createAllowanceColumns } from './allowanceColumns';

interface AllowanceTableProp {
  allowances: Tunjangan[];
  enableRowSelection?: boolean;
  refetchAtt?: () => void;
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  setAllowanceId: Dispatch<SetStateAction<number | undefined>>;
  allowanceId: number | undefined;
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
}

const AllowanceTable: FC<AllowanceTableProp> = ({
  allowances,
  refetchAtt,
  enableRowSelection = false,
  rowSelection,
  setRowSelection,
  allowanceId,
  setAllowanceId,
  openState,
  setOpenState,
}) => {
  const allowanceColumns = createAllowanceColumns({
    enableRowSelection,
    handleEditAllowanceDialog(allowanceId) {
      setAllowanceId(allowanceId);
      setOpenState(true);
    },
  });
  return (
    <div>
      <DataTable
        columns={allowanceColumns}
        data={allowances}
        getRowId={(row) => String(row.id)}
        enableRowSelection={enableRowSelection}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </div>
  );
};

export default AllowanceTable;
