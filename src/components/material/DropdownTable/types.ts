import { DialogProps } from '@mui/material/Dialog';
import { MRT_ColumnDef, MRT_RowData } from 'material-react-table';

export type PropsDropdownTable<E extends MRT_RowData> = {
  columns: MRT_ColumnDef<E>[];
  data: E[];
  onChange?: (value: any) => void;
  value?: E;
  getItemLabel?: (e: E) => React.ReactNode;
  getItemValue?: (e: E) => string | number | E;
  label?: string;
  dialogProps?: Omit<DialogProps, 'open' | 'onClose'>;
  rightContent?: React.ReactNode;
};
