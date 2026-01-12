'use client';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button, Card, CardContent, Chip, IconButton, Rating, Typography } from '@mui/material';
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
        borderColor: 'grey.200',
        borderRadius: 2,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: 'common.white',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
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
            aspectRatio: '4/3',
            overflow: 'hidden',
            bgcolor: 'grey.50',
            borderRadius: '8px 8px 0 0',
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

          {/* Badges */}
          <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {discountPercent > 0 && (
              <Chip
                label={`-${discountPercent}%`}
                sx={{
                  bgcolor: 'error.main',
                  color: 'common.white',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  height: 28,
                  boxShadow: '0 2px 8px rgba(229, 0, 0, 0.3)',
                }}
              />
            )}
            {isNew && (
              <Chip
                label='MỚI'
                sx={{
                  bgcolor: 'success.main',
                  color: 'common.white',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  height: 28,
                  boxShadow: '0 2px 8px rgba(5, 180, 106, 0.3)',
                }}
              />
            )}
          </Box>

          {/* Wishlist Button */}
          <IconButton
            className='wishlist-btn'
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              bgcolor: 'common.white',
              width: 40,
              height: 40,
              opacity: 0,
              visibility: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: 'error.main',
                color: 'common.white',
                transform: 'scale(1.1)',
              },
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <FavoriteBorderIcon fontSize='small' />
          </IconButton>

          {/* Quick View Overlay */}
          <Box
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
          </Box>

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

        <CardContent sx={{ p: 2.5 }}>
          {/* Product Name */}
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
              fontSize: '1rem',
              minHeight: 48,
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            {service.name}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Rating
              value={Number(rating)}
              readOnly
              size='small'
              sx={{
                '& .MuiRating-iconFilled': {
                  color: 'warning.main',
                },
              }}
            />
            <Typography variant='caption' sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
              ({reviewCount})
            </Typography>
          </Box>

          {/* Price */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 'auto' }}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '1.25rem',
              }}
            >
              {Number(service.price).toLocaleString('vi-VN')}₫
            </Typography>

            {service.originalPrice && Number(service.originalPrice) > Number(service.price) && (
              <Typography
                variant='body2'
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'grey.500',
                  textDecoration: 'line-through',
                }}
              >
                {Number(service.originalPrice).toLocaleString('vi-VN')}₫
              </Typography>
            )}
          </Box>

          {/* Stock Status */}
          {inStock && (
            <Typography variant='caption' sx={{ color: 'success.main', fontWeight: 500, display: 'block', mt: 0.5 }}>
              ✓ Còn hàng
            </Typography>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
