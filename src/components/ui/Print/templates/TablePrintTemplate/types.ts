import { MRT_ColumnDef, MRT_RowData } from 'material-react-table';

export type Props<T extends MRT_RowData> = {
  columns: MRT_ColumnDef<T>;
  data: T[];
};
