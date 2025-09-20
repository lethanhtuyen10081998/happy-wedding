import { Box, colors, Typography } from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef, MRT_RowData, MRT_TableOptions, useMaterialReactTable } from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';
import { useData, useLoading } from 'src/context/dataContext/hooksContext';
import { useLimit } from 'src/context/filterContext/hooksContext';
import { useAPIFilterContext } from 'src/context/filterContext/provider';
import { useDebouncedCallback } from 'src/hooks/useDebounceCallback';

import PagingTable from './PagingTable';

export type PropsTable<T extends MRT_RowData> = MRT_TableOptions<T> & {
  hiddenFooter?: boolean;
  title?: string;
};

export default function ReactMaterialTable<T extends MRT_RowData>(props: PropsTable<T>) {
  const limit = useLimit();
  const { total } = useData();
  const isLoading = useLoading();
  const [columnFilters, setColumnFilters] = useState<any>([]);

  const columns = useMemo<MRT_ColumnDef<T>[]>(() => props.columns, [props.columns]);
  const [sorting, setSorting] = useState<any[]>([]);
  const { onUpdateSort, onSetFilterByColumn } = useAPIFilterContext();

  const debounceFilter = useDebouncedCallback((values: { [key: string]: string }) => {
    onSetFilterByColumn(values);
  }, 1000);

  useEffect(() => {
    const transformColumnFilters = columnFilters.reduce(
      (acc: { [key: string]: string }, current: any) => {
        acc[current.id] = current.value;
        return acc;
      },
      {} as { [key: string]: string },
    );

    debounceFilter(transformColumnFilters);
  }, [columnFilters, debounceFilter]);

  const table = useMaterialReactTable({
    enableRowNumbers: true,
    muiTableContainerProps: { sx: { maxHeight: 'calc(100vh - 205px)' } },
    muiTableBodyRowProps: ({ staticRowIndex }) => {
      return {
        sx: {
          backgroundColor: staticRowIndex % 2 === 0 ? colors.grey[100] : 'white',
          ':hover': {
            backgroundColor: colors.lightBlue[100],
          },
        },
      };
    },
    enableColumnOrdering: false,
    enableGlobalFilter: false,
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      showRowsPerPage: false,
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
    manualPagination: true,
    manualSorting: true,
    enablePagination: false,
    enableStickyHeader: true,
    enableColumnPinning: true,

    onSortingChange: setSorting as any,
    pageCount: Math.round(total / limit) + 1,
    enableColumnActions: false,
    onColumnFiltersChange: setColumnFilters,
    renderBottomToolbar: props.hiddenFooter ? undefined : PagingTable,
    // muiTableHeadCellProps: {
    //   sx: {
    //     backgroundColor: 'primary.main',
    //     color: 'white !important',
    //     fontWeight: 500,
    //     '& .MuiSvgIcon-root': {
    //       color: 'white !important',
    //     },

    //     '& .MuiButtonBase-root .MuiTableSortLabel-root .Mui-active': {
    //       color: 'white !important',
    //     },
    //     textTransform: 'uppercase',
    //     height: 40,
    //     pt: '10px',
    //   },
    // },
    // muiLinearProgressProps: {
    //   sx: {
    //     height: 5,
    //     backgroundColor: 'secondary.main',
    //   },
    // },
    ...props,

    state: {
      sorting,
      density: 'compact',
      showProgressBars: isLoading,
      ...props.state,
    },
    columns,
  });

  useEffect(() => {
    if (sorting?.[0]) {
      onUpdateSort({ by: sorting[0].desc === true ? 'DESC' : 'ASC', field: sorting[0].id });
    }
  }, [onUpdateSort, sorting]);

  return (
    <Box display='grid' gap={1}>
      {props.title && (
        <Box p={2}>
          <Typography variant='h5'>{props.title}</Typography>
        </Box>
      )}
      <MaterialReactTable table={table} />
    </Box>
  );
}
