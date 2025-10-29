'use client';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2.5,
          borderBottom: '1px solid grey.300',
        }}
      >
        <Box>
          <Typography
            variant='h4'
            sx={{
              fontSize: '1.875rem',
              fontWeight: 600,
              color: 'text.primary',
              mb: 1,
            }}
          >
            Tất cả sản phẩm
          </Typography>
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
          <Link key={service.id} href={`/san-pham/${service.slug}?productId=${service.id}`} style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid primary.light',
                transition: 'all 0.3s ease',
                height: '100%',
                '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  aspectRatio: '6/4',
                  overflow: 'hidden',
                  bgcolor: 'grey.100',
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
                      background: 'linear-gradient(135deg, grey.100 0%, grey.300 100%)',
                    }}
                  >
                    <LocalOfferIcon sx={{ fontSize: 64, color: 'grey.500' }} />
                  </Box>
                )}

                {service.originalPrice && Number(service.originalPrice) > Number(service.price) && (
                  <Chip
                    label={`-${Math.round((1 - Number(service.price) / Number(service.originalPrice)) * 100)}%`}
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      bgcolor: 'error.main',
                      color: 'common.white',
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
                    bgcolor: 'rgba(0,0,0,0.4)', // TODO: change to theme color or remove
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <Button
                    variant='contained'
                    size='small'
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      bgcolor: 'common.white',
                      color: 'text.primary',
                      fontWeight: 500,
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: 'grey.100',
                      },
                    }}
                  >
                    Xem nhanh
                  </Button>
                </Box>
              </Box>

              <CardContent sx={{ p: 2.5 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: 1.4,
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: 'primary.main',
                    },
                    textTransform: 'capitalize',
                  }}
                >
                  {service.name.toLowerCase()}
                </Typography>

                {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 16, color: 'warning.main' }} />
                  ))}
                  <Typography variant='caption' sx={{ ml: 0.5, color: 'text.secondary' }}>
                    (4.8)
                  </Typography>
                </Box> */}

                {service.description && (
                  <Typography
                    variant='caption'
                    sx={{
                      color: 'text.secondary',
                      mb: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: 1.6,
                      fontSize: '0.875rem',
                    }}
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                )}

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
                          bgcolor: 'grey.100',
                          color: 'text.secondary',
                        }}
                      />
                    ))}
                  </Box>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant='h5'
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'text.primary',
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
                        color: 'text.secondary',
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
              border: '1px solid grey.300',
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
