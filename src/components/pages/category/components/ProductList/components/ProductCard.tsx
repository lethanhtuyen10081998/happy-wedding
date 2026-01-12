'use client';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Box, Card, CardContent, IconButton, Rating, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from 'src/types/product';

export default function ProductCard({ service }: { service: Product }) {
  // Get data from product
  const rating = service.rating || 4.5;
  const reviewCount = service.reviewCount || 0;
  const inStock = service.inStock !== undefined ? service.inStock : true;
  const isNew = false; // Can be added to Product type later
  const discountPercent =
    service.originalPrice && Number(service.originalPrice) > Number(service.price)
      ? Math.round((1 - Number(service.price) / Number(service.originalPrice)) * 100)
      : 0;

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'visible',
        border: '1px solid',
        borderColor: 'rgba(0,0,0,0.09)',
        borderRadius: '8px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: 'common.white',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderColor: 'primary.main',
          '& .product-image': {
            transform: 'scale(1.05)',
          },
          '& .quick-view': {
            opacity: 1,
            visibility: 'visible',
          },
          '& .wishlist-btn': {
            opacity: 1,
            visibility: 'visible',
          },
        },
      }}
    >
      <Link href={`/san-pham/${service.slug}?productId=${service.id}`} style={{ textDecoration: 'none', display: 'block' }}>
        <Box
          sx={{
            position: 'relative',
            aspectRatio: { xs: '1/1', sm: '4/3' },
            overflow: 'hidden',
            bgcolor: 'grey.50',
            borderRadius: { xs: '6px 6px 0 0', sm: '8px 8px 0 0' },
          }}
        >
          {service.imagesList?.[0] ? (
            <Image
              src={service.imagesList[0] || '/placeholder.svg'}
              alt={service.name}
              fill
              className='product-image'
              style={{
                objectFit: 'contain',
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: '#f8f9fa',
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
              <LocalOfferIcon sx={{ fontSize: 64, color: 'grey.400' }} />
            </Box>
          )}

          {/* Badges - Shopee Style */}
          <Box sx={{ position: 'absolute', top: { xs: 4, sm: 6, md: 8 }, left: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {discountPercent > 0 && (
              <Box
                sx={{
                  position: 'relative',
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: { xs: '0.625rem', sm: '0.6875rem', md: '0.75rem' },
                  px: { xs: 1, sm: 1.25, md: 1.5 },
                  py: { xs: 0.25, sm: 0.375, md: 0.5 },
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    borderTop: { xs: '3px solid', sm: '3px solid', md: '4px solid' },
                    borderTopColor: 'primary.main',
                    borderLeft: { xs: '3px solid', sm: '3px solid', md: '4px solid' },
                    borderLeftColor: 'transparent',
                    filter: 'brightness(0.85)',
                  },
                }}
              >
                -{discountPercent}%
              </Box>
            )}
            {isNew && (
              <Box
                sx={{
                  position: 'relative',
                  bgcolor: 'success.main',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  px: 1.5,
                  py: 0.5,
                  borderTopRightRadius: '3px',
                  borderBottomRightRadius: '3px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    borderTop: '4px solid',
                    borderTopColor: 'success.main',
                    borderLeft: '4px solid transparent',
                    filter: 'brightness(0.85)',
                  },
                }}
              >
                MỚI
              </Box>
            )}
          </Box>

          {/* Wishlist Button - Shopee Style */}
          <IconButton
            className='wishlist-btn'
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'common.white',
              width: 36,
              height: 36,
              opacity: 0,
              visibility: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              borderRadius: '50%',
              backdropFilter: 'blur(4px)',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'common.white',
                transform: 'scale(1.15)',
                boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}66`,
              },
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <FavoriteBorderIcon fontSize='small' />
          </IconButton>

          {/* <Box
            className='quick-view'
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0,0,0,0.5)',
              opacity: 0,
              visibility: 'hidden',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(2px)',
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Button
              variant='contained'
              size='medium'
              startIcon={<ShoppingCartIcon />}
              sx={{
                bgcolor: 'common.white',
                color: 'text.primary',
                fontWeight: 600,
                textTransform: 'none',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Xem nhanh
            </Button>
          </Box> */}
          {/* Stock Badge */}
          {!inStock && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'rgba(0,0,0,0.7)',
                color: 'common.white',
                textAlign: 'center',
                py: 1,
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              Hết hàng
            </Box>
          )}
        </Box>

        <CardContent sx={{ p: { xs: 1, sm: 1.5, md: 2 } }}>
          {/* Product Name - Shopee Style */}
          <Typography
            sx={{
              fontWeight: 400,
              color: 'rgba(0,0,0,0.87)',
              mb: { xs: 0.5, sm: 1 },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.3,
              fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
              minHeight: { xs: 32, sm: 36, md: 40 },
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {service.name}
          </Typography>

          {/* Rating - Shopee Style */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: { xs: 0.75, sm: 1, md: 1.5 } }}>
            <Rating
              value={Number(rating)}
              readOnly
              size='small'
              sx={{
                '& .MuiRating-iconFilled': {
                  color: 'warning.main',
                },
                '& .MuiRating-iconEmpty': {
                  color: 'grey.400',
                },
                fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
              }}
            />
            <Typography variant='caption' sx={{ color: '#767676', fontSize: { xs: '0.625rem', sm: '0.6875rem', md: '0.75rem' }, ml: 0.5 }}>
              ({reviewCount})
            </Typography>
          </Box>

          {/* Price - Shopee Style */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, mt: 'auto', flexWrap: 'wrap' }}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                lineHeight: 1.2,
              }}
            >
              {Number(service.price).toLocaleString('vi-VN')}₫
            </Typography>

            {service.originalPrice && Number(service.originalPrice) > Number(service.price) && (
              <Typography
                variant='body2'
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
                  fontWeight: 400,
                  color: 'grey.500',
                  textDecoration: 'line-through',
                  lineHeight: 1.2,
                }}
              >
                {Number(service.originalPrice).toLocaleString('vi-VN')}₫
              </Typography>
            )}
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
}
