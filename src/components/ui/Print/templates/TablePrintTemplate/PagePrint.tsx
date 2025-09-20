import { Box, Table, TableBody, TableHead } from '@mui/material';

import { BorderedTableCell as TableCell, BorderedTableRow as TableRow } from '../../components';

export interface Column {
  label: string;
  field: string;
  width?: number;
  colSpan?: number;
  rowSpan?: number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any) => string;
}

export type Props<T> = {
  data: T[];
  page: number;
  arr: T[][];
  columns: Column[][];
  columnFieldMapping: Column[];
  children?: React.ReactNode;
  isLastPage?: boolean;
  height?: number;
  headerHeight?: number;
};

export default function PagePrint<T>(props: Props<T>) {
  const {
    data,
    page,
    columns,
    columnFieldMapping,
    children,
    isLastPage,
    height = 8,
    headerHeight = 1,
  } = props;

  return (
    <Box key={page} bgcolor='white' height={isLastPage ? height : `${height + headerHeight}in`}>
      <Box pt={page === 0 ? '0' : '1in'}>
        <Table size='small' style={{ borderCollapse: 'collapse' }}>
          <TableHead>
            {columns.map((columnChild, index) => {
              return (
                <TableRow key={index}>
                  {columnChild.map((col, index) => (
                    <TableCell
                      key={index}
                      width={col.width}
                      rowSpan={col.rowSpan}
                      colSpan={col.colSpan}
                      align={col.align || 'left'}
                      style={{
                        maxWidth: col.width,
                      }}
                    >
                      <Box style={{ textAlign: col.align || 'left' }}>{col.label}</Box>
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableHead>
          <TableBody>
            {data.map((row: any, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{page + 1 * (rowIndex + 1)}</TableCell>
                {columnFieldMapping
                  .filter((item) => item.field !== 'index')
                  .map((col, colIndex) => (
                    <TableCell key={colIndex}>
                      {col.render ? col.render(row?.[col.field]) : row?.[col.field] || ''}
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isLastPage && children}
      </Box>
    </Box>
  );
}
