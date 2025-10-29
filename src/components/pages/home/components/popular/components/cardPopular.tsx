import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Badge, Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Heart, Sparkles } from 'lucide-react';
import Image from 'next/image';
import NextLink from 'next/link';
import type React from 'react';
import Button from 'src/components/material/Button';
import { Routes } from 'src/constants/route';
import { formatMoney } from 'src/libs/utils';
import variables from 'src/themes/variables';

interface WeddingServiceCardProps {
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  image: string;
  isPopular?: boolean;
  icon?: React.ReactNode;
  slug: string;
  id: string;
}

export function WeddingServiceCard({
  title,
  price,
  originalPrice,
  features,
  image,
  isPopular = false,
  slug,
  id,
  description,
}: WeddingServiceCardProps) {
  return (
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
      {isPopular && (
        <Box sx={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
          <Badge sx={{ backgroundColor: 'primary.main', fontWeight: 'bold', borderRadius: variables.borderRadius, padding: '4px 8px' }}>
            <Sparkles style={{ width: '12px', height: '12px', marginRight: '4px', color: 'white', marginTop: '3px' }} />
            <Typography variant='caption' sx={{ color: 'white' }}>
              Phổ biến
            </Typography>
          </Badge>
        </Box>
      )}

      <Box sx={{ position: 'relative', height: '192px', overflow: 'hidden', borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
        {image ? (
          <Image
            src={image || '/placeholder.svg'}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            width={384}
            height={192}
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

        <div style={{ position: 'absolute', bottom: '8px', left: '8px', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Badge sx={{ backgroundColor: 'primary.main', fontWeight: 'bold', borderRadius: variables.borderRadius, padding: '4px 8px' }}>
              <Typography variant='caption' sx={{ fontWeight: '500', color: 'white' }}>
                Giảm giá {(((originalPrice - price) * 100) / originalPrice).toFixed(0)}%
              </Typography>
            </Badge>
          </div>
        </div>
      </Box>

      <CardContent style={{ padding: '12px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Typography
            sx={{
              marginBottom: '8px',
              textWrap: 'balance',
              fontWeight: 600,
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'primary.main',
              },
              textTransform: 'capitalize',
            }}
          >
            {title}
          </Typography>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {formatMoney(price)}
            </Typography>
            {originalPrice && (
              <Typography variant='subtitle2' sx={{ fontWeight: 'bold', color: 'text.secondary', textDecoration: 'line-through' }}>
                {formatMoney(originalPrice)}
              </Typography>
            )}
          </div>
        </div>

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
            __html: description ? description.replace(/<[^>]*>/g, '').toLowerCase() : 'Chưa có mô tả',
          }}
        />

        <Box>
          <Box component='ul' sx={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {features
              .filter(Boolean)
              .slice(0, 4)
              .map((feature, index) => (
                <Box
                  component='li'
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '14px',
                    marginBottom: '8px',
                  }}
                >
                  <Heart
                    style={{
                      width: '16px',
                      height: '16px',
                      color: '#f48fb1',
                      marginTop: '2px',
                      flexShrink: 0,
                    }}
                  />
                  <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                    {feature}
                  </Typography>
                </Box>
              ))}

            {features.length - 4 > 0 && (
              <Box
                component='li'
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '14px',
                  marginBottom: '8px',
                }}
              >
                <Heart
                  style={{
                    width: '16px',
                    height: '16px',
                    color: '#f48fb1',
                    marginTop: '2px',
                    flexShrink: 0,
                  }}
                />
                <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                  + {features.length - 3} ưu đãi khác
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>

      <CardActions style={{ padding: '24px', paddingTop: 0, height: 80 }}>
        <Box style={{ padding: '24px', paddingTop: 0, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <Box style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <Button variant='contained'>Đặt ngay</Button>
            <NextLink href={`${Routes.SERVICES.replace(':id', slug)}?productId=${id}`}>
              <Button variant='outlined'>Tìm hiểu thêm</Button>
            </NextLink>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
}
