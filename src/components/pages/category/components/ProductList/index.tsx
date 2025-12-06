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
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          {[...Array(8)].map((_, i) => (
            <Card key={i} sx={{ overflow: 'hidden', borderRadius: 2 }}>
              <Skeleton variant='rectangular' sx={{ aspectRatio: '4/3' }} />
              <CardContent sx={{ p: 2.5 }}>
                <Skeleton variant='text' width='75%' height={24} sx={{ mb: 1 }} />
                <Skeleton variant='text' width='50%' height={20} sx={{ mb: 1 }} />
                <Skeleton variant='text' width='100%' height={20} />
                <Skeleton variant='text' width='60%' height={28} sx={{ mt: 1.5 }} />
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
          pb: 2,
          mb: 3,
          borderBottom: '2px solid',
          borderColor: 'grey.200',
        }}
      >
        <Typography variant='body1' sx={{ fontWeight: 500, color: 'text.secondary' }}>
          Hiển thị{' '}
          <Box component='span' sx={{ fontWeight: 700, color: 'primary.main' }}>
            {data.length}
          </Box>{' '}
          trong tổng số{' '}
          <Box component='span' sx={{ fontWeight: 700, color: 'primary.main' }}>
            {total}
          </Box>{' '}
          sản phẩm
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          },
          gap: { xs: 2, sm: 2.5, md: 3 },
        }}
      >
        {data.map((service) => (
          <ProductCard key={service.id} service={service} />
        ))}
      </Box>

      {total > 12 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 5, pb: 2 }}>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              p: 0.5,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              bgcolor: 'common.white',
            }}
          >
            <IconButton
              size='small'
              onClick={() => onUpdatePage(page - 1)}
              disabled={page === 1}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1.5,
                '&:disabled': {
                  opacity: 0.4,
                },
                '&:hover:not(:disabled)': {
                  bgcolor: 'primary.light',
                  color: 'common.white',
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
                    minWidth: 40,
                    width: 40,
                    height: 40,
                    p: 0,
                    borderRadius: 1.5,
                    bgcolor: page === pageNum ? 'primary.main' : 'transparent',
                    color: page === pageNum ? 'common.white' : 'text.primary',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    '&:hover': {
                      bgcolor: page === pageNum ? 'primary.dark' : 'grey.100',
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
                width: 40,
                height: 40,
                borderRadius: 1.5,
                '&:disabled': {
                  opacity: 0.4,
                },
                '&:hover:not(:disabled)': {
                  bgcolor: 'primary.light',
                  color: 'common.white',
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
