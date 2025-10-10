import { Box, IconButton, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { Icon } from 'src/components/icons';
import { AlertAction } from 'src/components/material/Alert/alertDialog/types';
import { DetailDataContextProvider } from 'src/context/detailContext/provider';
import { useAPIRefsContext } from 'src/context/refsContext/provider';
import alertUtil from 'src/helpers/alertUtil';
import useDeleteCategory from 'src/services/admin/settings/categories/delete';
import { Category } from 'src/types/admin/categories';

import ButtonUpdateCategory from '../ButtonUpdate';

const ButtonDelete = ({ id }: { id: string }) => {
  const { mutate: deleteCategory } = useDeleteCategory();
  const { onExcuteRef } = useAPIRefsContext();

  const handleDelete = async () => {
    const alert = await alertUtil.show({
      title: 'Xóa Danh Mục',
      description: 'Bạn có chắc chắn muốn xóa danh mục này không?',
    });

    if (alert.action !== AlertAction.CONFIRM) {
      return;
    }
    await deleteCategory({ id });
    onExcuteRef('getListCategories');
  };

  return (
    <IconButton onClick={handleDelete}>
      <Icon name='delete' />
    </IconButton>
  );
};

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
      accessorKey: 'slug',
      header: 'Slug',
      Cell: ({ row }) => {
        return <Typography>{row.original.slug}</Typography>;
      },
    },
    {
      accessorKey: 'isMenu',
      header: 'Là menu',
      Cell: ({ row }) => {
        return <Typography>{row.original.isMenu ? 'Có' : 'Không'}</Typography>;
      },
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
            <ButtonDelete id={row.original.id} />
          </Box>
        );
      },
    },
  ];

  return { columns };
};

export default useColumns;
