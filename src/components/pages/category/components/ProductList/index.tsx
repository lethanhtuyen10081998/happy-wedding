'use client';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Box, Button, Card, CardContent, IconButton, Paper, Skeleton, Typography } from '@mui/material';
import { SPACING } from 'src/constants/grid';
import { useFilterObjectContext, usePage } from 'src/context/filterContext/hooksContext';
import { useAPIFilterContext } from 'src/context/filterContext/provider';
import useList from 'src/services/admin/manage/product/getList';

import type { FilterProps } from '../Filter';
import ProductCard from './components/ProductCard';

export default function ProductList() {
  const { name, category, sortOrder, fromPrice, toPrice } = useFilterObjectContext<FilterProps>();
  const page = usePage();
  const { onUpdatePage } = useAPIFilterContext();

  const { data, isFetching, total } = useList({
    limit: 12,
    page: page,
    categoryId: category?.id,
    name: name,
    orderByField: 'price',
    orderDirection: sortOrder,
    price: fromPrice,
    toPrice: toPrice,
  });

  if (isFetching) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Skeleton variant='rectangular' width={200} height={32} />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <Card key={i} sx={{ overflow: 'hidden' }}>
              <Skeleton variant='rectangular' sx={{ aspectRatio: '3/4' }} />
              <CardContent>
                <Skeleton variant='text' width='75%' height={24} sx={{ mb: 1 }} />
                <Skeleton variant='text' width='100%' height={20} />
                <Skeleton variant='text' width='66%' height={20} sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    );
  }

  if (total === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 500,
          border: '2px dashed grey.300',
          borderRadius: 2,
          bgcolor: 'grey.50',
          p: 6,
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            bgcolor: 'grey.100',
            mb: 2,
          }}
        >
          <LocalOfferIcon sx={{ fontSize: 40, color: 'grey.500' }} />
        </Box>
        <Typography variant='h5' sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
          Không tìm thấy sản phẩm
        </Typography>
        <Typography variant='body1' sx={{ color: 'text.secondary' }}>
          Vui lòng thử điều chỉnh bộ lọc của bạn hoặc tìm kiếm từ khóa khác
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: SPACING }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid grey.300',
        }}
      >
        <Box>
          <Typography variant='body1'>
            Hiển thị{' '}
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              {data.length}
            </Box>{' '}
            trong tổng số{' '}
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              {total}
            </Box>{' '}
            sản phẩm
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {data.map((service) => (
          <ProductCard key={service.id} service={service} />
        ))}
      </Box>

      {total > 12 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              border: '1px solid #e0e0e0',
              borderRadius: 1.5,
            }}
          >
            <IconButton
              size='small'
              onClick={() => onUpdatePage(page - 1)}
              disabled={page === 1}
              sx={{
                width: 36,
                height: 36,
                '&:disabled': {
                  opacity: 0.5,
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>

            {[...Array(Math.min(5, Math.ceil(total / 12)))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? 'contained' : 'text'}
                  size='small'
                  onClick={() => onUpdatePage(pageNum)}
                  sx={{
                    minWidth: 36,
                    width: 36,
                    height: 36,
                    p: 0,
                    bgcolor: page === pageNum ? 'primary.main' : 'transparent',
                    color: page === pageNum ? 'common.white' : 'text.primary',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: page === pageNum ? 'primary.dark' : 'transparent',
                    },
                  }}
                >
                  {pageNum}
                </Button>
              );
            })}

            <IconButton
              size='small'
              onClick={() => onUpdatePage(page + 1)}
              disabled={page >= Math.ceil(total / 12)}
              sx={{
                width: 36,
                height: 36,
                '&:disabled': {
                  opacity: 0.5,
                },
              }}
            >
              <ChevronRightIcon />
            </IconButton>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
