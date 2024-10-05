import { DataTable } from '@/components/ui/data-table';
import { Potongan } from '@/types/payroll.type';
import { RowSelectionState } from '@tanstack/react-table';
import { Dispatch, FC, SetStateAction } from 'react';
import { createDeductionsColumns } from './deductionColumns';

interface DeductionTableProp {
  deductions: Potongan[];
  enableRowSelection?: boolean;
  refetchAtt?: () => void;
  rowSelection: RowSelectionState;
  setRowSelection: Dispatch<SetStateAction<RowSelectionState>>;
  setDeductionId: Dispatch<SetStateAction<number | undefined>>;
  deductionId: number | undefined;
  openState: boolean;
  setOpenState: Dispatch<SetStateAction<boolean>>;
}

const DeductionTable: FC<DeductionTableProp> = ({
  deductions,
  refetchAtt,
  enableRowSelection = false,
  rowSelection,
  setRowSelection,
  deductionId,
  openState,
  setDeductionId,
  setOpenState,
}) => {
  const dedcutionsColumns = createDeductionsColumns({
    enableRowSelection,
    handleEditDeductionDialog(allowanceId) {
      setDeductionId(allowanceId);
      setOpenState(true);
    },
  });
  return (
    <div>
      <DataTable
        columns={dedcutionsColumns}
        data={deductions}
        getRowId={(row) => String(row.id)}
        enableRowSelection={enableRowSelection}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </div>
  );
};

export default DeductionTable;
