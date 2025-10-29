'use client';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button, Card, CardContent, Chip, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from 'src/types/product';

export default function ProductCard({ service }: { service: Product }) {
  return (
    <Link key={service.id} href={`/san-pham/${service.slug}?productId=${service.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid primary.light',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
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
              bgcolor: 'rgba(0,0,0,0.4)', // TODO: change to theme color
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

        <CardContent sx={{ px: 1, position: 'relative', height: 1 }}>
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
              height: 40,
              '&:hover': {
                color: 'primary.main',
              },
              textTransform: 'capitalize',
            }}
          >
            {service.name.toLowerCase()}
          </Typography>

          <Typography
            variant='caption'
            sx={{
              color: 'grey.500',
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.6,
              fontSize: '0.875rem',
              height: 40,
            }}
            dangerouslySetInnerHTML={{
              __html: service.description ? service.description.replace(/<[^>]*>/g, '').toLowerCase() : 'Chưa có mô tả',
            }}
          />

          {service.tags && service.tags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}>
              {(service.tags.slice(0, 2) || ['Chưa có tag']).map((tag, idx) => (
                <Chip
                  key={idx}
                  label={tag ? tag.slice(0, 20) + '...' : 'Chưa có tag'}
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
              variant='h6'
              sx={{
                fontWeight: 700,
                color: (theme) => theme.palette.primary.main,
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
                  color: 'grey.500',
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
  );
}
