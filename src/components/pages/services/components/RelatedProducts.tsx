'use client';

import { Box, Card, CardContent, Chip, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from 'src/types/product';

export default function RelatedProducts({ currentProductId }: { currentProductId?: string }) {
  // Hardcoded related products - will be from database later
  const relatedProducts: (Product & { rating: number; reviewCount: number })[] = [
    {
      id: '1',
      name: 'Gói dịch vụ cưới hỏi trọn gói cao cấp',
      price: 50000000,
      originalPrice: 60000000,
      quantity: 10,
      unit: 'gói',
      imagesList: ['/placeholder.svg'],
      slug: 'goi-dich-vu-cuoi-hoi-tron-goi',
      rating: 4.8,
      reviewCount: 45,
    },
    {
      id: '2',
      name: 'Trang trí tiệc cưới theo phong cách hiện đại',
      price: 15000000,
      originalPrice: 18000000,
      quantity: 15,
      unit: 'gói',
      imagesList: ['/placeholder.svg'],
      slug: 'trang-tri-tiec-cuoi',
      rating: 4.6,
      reviewCount: 32,
    },
    {
      id: '3',
      name: 'Dịch vụ chụp ảnh cưới chuyên nghiệp',
      price: 12000000,
      originalPrice: 15000000,
      quantity: 8,
      unit: 'gói',
      imagesList: ['/placeholder.svg'],
      slug: 'chup-anh-cuoi',
      rating: 4.9,
      reviewCount: 67,
    },
    {
      id: '4',
      name: 'Gói dịch vụ MC và âm thanh ánh sáng',
      price: 8000000,
      originalPrice: 10000000,
      quantity: 12,
      unit: 'gói',
      imagesList: ['/placeholder.svg'],
      slug: 'mc-am-thanh-anh-sang',
      rating: 4.7,
      reviewCount: 28,
    },
  ].filter((p) => p.id !== currentProductId);

  return (
    <Box>
      <Typography variant='h5' sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
        Sản phẩm liên quan
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 2.5,
        }}
      >
        {relatedProducts.map((product) => {
          const discountPercent =
            product.originalPrice && Number(product.originalPrice) > Number(product.price)
              ? Math.round((1 - Number(product.price) / Number(product.originalPrice)) * 100)
              : 0;

          return (
            <Link
              key={product.id}
              href={`/san-pham/${product.slug}?productId=${product.id}`}
              style={{ textDecoration: 'none' }}
            >
              <Card
                sx={{
                  position: 'relative',
                  overflow: 'visible',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    borderColor: 'primary.main',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    bgcolor: 'grey.50',
                    borderRadius: '8px 8px 0 0',
                  }}
                >
                  {product.imagesList?.[0] ? (
                    <Image
                      src={product.imagesList[0] || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      style={{
                        objectFit: 'contain',
                        transition: 'transform 0.5s ease',
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
                        bgcolor: 'grey.100',
                      }}
                    />
                  )}

                  {discountPercent > 0 && (
                    <Chip
                      label={`-${discountPercent}%`}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        bgcolor: 'error.main',
                        color: 'common.white',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        height: 24,
                      }}
                    />
                  )}
                </Box>

                <CardContent sx={{ p: 2 }}>
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
                      fontSize: '0.875rem',
                      minHeight: 40,
                    }}
                  >
                    {product.name}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 'auto' }}>
                    <Typography
                      variant='body2'
                      sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        fontSize: '1rem',
                      }}
                    >
                      {Number(product.price).toLocaleString('vi-VN')}₫
                    </Typography>

                    {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
                      <Typography
                        variant='caption'
                        sx={{
                          color: 'grey.500',
                          textDecoration: 'line-through',
                        }}
                      >
                        {Number(product.originalPrice).toLocaleString('vi-VN')}₫
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}

