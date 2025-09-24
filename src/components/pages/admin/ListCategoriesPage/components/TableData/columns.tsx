import { Box, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { DetailDataContextProvider } from 'src/context/detailContext/provider';
import { Category } from 'src/types/admin/categories';

import ButtonUpdateCategory from '../ButtonUpdate';

const useColumns = () => {
  const columns: MRT_ColumnDef<Category>[] = [
    {
      accessorKey: 'name',
      header: 'Tên Danh Mục',
      Cell: ({ row }) => {
        return <Typography>{row.original.name}</Typography>;
      },
      maxSize: 100,
      size: 100,
    },
    {
      accessorKey: 'id',
      header: 'Hành động',
      maxSize: 100,
      size: 100,
      Cell: ({ row }) => {
        return (
          <Box display='flex' gap={2} position='relative'>
            <DetailDataContextProvider data={row.original}>
              <ButtonUpdateCategory data={row.original} />
            </DetailDataContextProvider>
          </Box>
        );
      },
    },
  ];

  return { columns };
};

export default useColumns;
