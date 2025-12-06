import { Box, Button, Typography } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import Link from 'next/link';
import { Icon } from 'src/components/icons';
import { formatMoney } from 'src/libs/utils';
import useListCategories from 'src/services/admin/settings/categories/getList';
import { Product } from 'src/types/product';

const useColumns = () => {
  const { data: categories } = useListCategories({ limit: 100, page: 1 });

  const columns: MRT_ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: 'Tên Sản Phẩm',
      Cell: ({ row }) => {
        return <Typography>{row.original.name}</Typography>;
      },
      maxSize: 100,
      size: 100,
    },
    {
      accessorKey: 'categoryId',
      header: 'Danh Mục',
      Cell: ({ row }) => {
        return <Typography>{categories.find((category) => category.id === row.original.categoryId)?.name}</Typography>;
      },
    },
    {
      accessorKey: 'price',
      header: 'Giá',
      Cell: ({ row }) => {
        return <Typography>{row.original.price ? formatMoney(Number(row.original.price)) : ''}</Typography>;
      },
    },
    {
      accessorKey: 'originalPrice',
      header: 'Giá Gốc',
      Cell: ({ row }) => {
        return (
          <Typography sx={{ textDecoration: 'line-through' }}>
            {row.original.originalPrice ? formatMoney(Number(row.original.originalPrice)) : ''}
          </Typography>
        );
      },
    },
    {
      accessorKey: 'quantity',
      header: 'Số Lượng',
      Cell: ({ row }) => {
        return <Typography>{row.original.quantity}</Typography>;
      },
    },
    {
      accessorKey: 'unit',
      header: 'Đơn Vị',
      Cell: ({ row }) => {
        return <Typography>{row.original.unit}</Typography>;
      },
    },
    {
      accessorKey: 'isShowHomePage',
      header: 'Hiển thị trang chủ',
      Cell: ({ row }) => {
        return <Typography>{row.original.isShowHomePage ? 'Có' : 'Không'}</Typography>;
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
            <Link href={`/admin/manage/products/${row.original.id}`}>
              <Button>
                <Icon name='edit' />
              </Button>
            </Link>
          </Box>
        );
      },
    },
  ];

  return { columns };
};

export default useColumns;
