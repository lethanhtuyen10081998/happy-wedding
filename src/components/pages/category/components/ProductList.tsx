'use client';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import { Box, Button, Card, CardContent, Chip, IconButton, Paper, Skeleton, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useFilterObjectContext, usePage } from 'src/context/filterContext/hooksContext';
import { useAPIFilterContext } from 'src/context/filterContext/provider';
import useList from 'src/services/admin/manage/product/getList';

import type { FilterProps } from './Filter';

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
          border: '2px dashed #e0e0e0',
          borderRadius: 2,
          bgcolor: '#fafafa',
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
            bgcolor: '#f5f5f5',
            mb: 2,
          }}
        >
          <LocalOfferIcon sx={{ fontSize: 40, color: '#999' }} />
        </Box>
        <Typography variant='h5' sx={{ fontWeight: 600, color: '#1a1a1a', mb: 1 }}>
          Không tìm thấy sản phẩm
        </Typography>
        <Typography variant='body1' sx={{ color: '#666' }}>
          Vui lòng thử điều chỉnh bộ lọc của bạn hoặc tìm kiếm từ khóa khác
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2.5,
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Box>
          <Typography
            variant='h4'
            sx={{
              fontSize: '1.875rem',
              fontWeight: 600,
              color: '#1a1a1a',
              mb: 1,
            }}
          >
            Tất cả sản phẩm
          </Typography>
          <Typography variant='body1' sx={{ color: '#666' }}>
            Hiển thị{' '}
            <Box component='span' sx={{ fontWeight: 600, color: '#1a1a1a' }}>
              {data.length}
            </Box>{' '}
            trong tổng số{' '}
            <Box component='span' sx={{ fontWeight: 600, color: '#1a1a1a' }}>
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
          <Link key={service.id} href={`/product/${service.slug}`} style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                overflow: 'hidden',
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#d4a574',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  '& .product-image': {
                    transform: 'scale(1.1)',
                  },
                  '& .quick-view': {
                    opacity: 1,
                  },
                },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  bgcolor: '#f5f5f5',
                }}
              >
                {service.imagesList?.[0] ? (
                  <Image
                    src={service.imagesList[0] || '/placeholder.svg'}
                    alt={service.name}
                    fill
                    className='product-image'
                    style={{
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                    }}
                  >
                    <LocalOfferIcon sx={{ fontSize: 64, color: '#ccc' }} />
                  </Box>
                )}

                {service.originalPrice && Number(service.originalPrice) > Number(service.price) && (
                  <Chip
                    label={`-${Math.round((1 - Number(service.price) / Number(service.originalPrice)) * 100)}%`}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      bgcolor: '#f44336',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      height: 28,
                    }}
                  />
                )}

                <Box
                  className='quick-view'
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0,0,0,0.4)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <Button
                    variant='contained'
                    size='small'
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      bgcolor: '#fff',
                      color: '#1a1a1a',
                      fontWeight: 500,
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: '#f5f5f5',
                      },
                    }}
                  >
                    Xem nhanh
                  </Button>
                </Box>
              </Box>

              <CardContent sx={{ p: 2.5 }}>
                {service.tags && service.tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}>
                    {service.tags.slice(0, 2).map((tag, idx) => (
                      <Chip
                        key={idx}
                        label={tag}
                        size='small'
                        sx={{
                          height: 22,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          bgcolor: '#f5f5f5',
                          color: '#666',
                        }}
                      />
                    ))}
                  </Box>
                )}

                <Typography
                  variant='h6'
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.4,
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#d4a574',
                    },
                  }}
                >
                  {service.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 16, color: '#ffc107' }} />
                  ))}
                  <Typography variant='caption' sx={{ ml: 0.5, color: '#999' }}>
                    (4.8)
                  </Typography>
                </Box>

                {service.description && (
                  <Typography
                    variant='body2'
                    sx={{
                      color: '#666',
                      mb: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: 1.6,
                      fontSize: '0.875rem',
                    }}
                  >
                    {service.description}
                  </Typography>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant='h5'
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#1a1a1a',
                    }}
                  >
                    {(service.price as number).toLocaleString('vi-VN')}₫
                  </Typography>
                  {service.originalPrice && Number(service.originalPrice) > Number(service.price) && (
                    <Typography
                      variant='body2'
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#999',
                        textDecoration: 'line-through',
                      }}
                    >
                      {service.originalPrice.toLocaleString('vi-VN')}₫
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Link>
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
                    bgcolor: page === pageNum ? '#d4a574' : 'transparent',
                    color: page === pageNum ? '#fff' : '#1a1a1a',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: page === pageNum ? '#c49563' : '#f5f5f5',
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
