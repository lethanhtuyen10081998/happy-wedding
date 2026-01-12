'use client';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, Button, Card, CardContent, Chip, Divider, Rating, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDetailDataContext } from 'src/context/detailContext/hooksContext';
import { formatMoney } from 'src/libs/utils';
import { Product } from 'src/types/product';

function Infomation({ price, originalPrice, name }: { price: number; originalPrice: number; name: string }) {
  const [quantity, setQuantity] = useState(1);
  const productData = useDetailDataContext<Product>();

  const rating = productData.rating || 4.5;
  const reviewCount = productData.reviewCount || 128;
  const soldCount = productData.soldCount || 523;
  const inStock = productData.inStock !== undefined ? productData.inStock : true;
  const stockCount = productData.stockCount || 50;
  const highlights = productData.highlights || ['Chất lượng cao, uy tín', 'Giao hàng nhanh chóng', 'Đổi trả trong 7 ngày', 'Bảo hành chính hãng'];

  const discountPercent = originalPrice && originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(Number(stockCount), prev + delta)));
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ p: 3 }}>
        {/* Product Name */}
        <Typography
          variant='h4'
          sx={{
            fontWeight: 700,
            mb: 2,
            color: 'text.primary',
            lineHeight: 1.3,
          }}
        >
          {name}
        </Typography>

        {/* Rating & Reviews */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Rating value={Number(rating)} readOnly size='small' precision={0.5} />
            <Typography variant='body2' sx={{ ml: 0.5, fontWeight: 600 }}>
              {rating}
            </Typography>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {reviewCount} đánh giá
          </Typography>
          <Divider orientation='vertical' flexItem />
        </Box>

        {/* Price Section */}
        <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
            <Typography
              variant='h3'
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '2rem',
              }}
            >
              {formatMoney(price)}
            </Typography>
            {originalPrice && originalPrice > price && (
              <>
                <Typography
                  variant='h6'
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'line-through',
                    fontWeight: 500,
                  }}
                >
                  {formatMoney(originalPrice)}
                </Typography>
                <Chip
                  label={`-${discountPercent}%`}
                  sx={{
                    bgcolor: 'error.main',
                    color: 'common.white',
                    fontWeight: 700,
                    height: 28,
                  }}
                />
              </>
            )}
          </Box>
          <Typography variant='caption' sx={{ color: 'text.secondary' }}>
            Giá đã bao gồm VAT
          </Typography>
        </Box>

        {/* Stock Status */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              Tình trạng:
            </Typography>
            {inStock ? (
              <Chip
                icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                label={`Còn hàng (${stockCount} sản phẩm)`}
                sx={{
                  bgcolor: 'success.light',
                  color: 'success.dark',
                  fontWeight: 600,
                  height: 28,
                }}
              />
            ) : (
              <Chip
                label='Hết hàng'
                sx={{
                  bgcolor: 'error.light',
                  color: 'error.dark',
                  fontWeight: 600,
                  height: 28,
                }}
              />
            )}
          </Box>
        </Box>

        {/* Action Buttons */}
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Button
            variant='contained'
            fullWidth
            size='large'
            startIcon={<PhoneIcon />}
            sx={{
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Liên hệ: 0377 002 994
          </Button>
          <Button
            variant='outlined'
            fullWidth
            size='large'
            sx={{
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Zalo: 0377 002 994
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Features */}
        <Box>
          <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 2 }}>
            Ưu điểm nổi bật:
          </Typography>
          <Stack spacing={1.5}>
            {highlights.map((feature, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <VerifiedIcon sx={{ fontSize: 20, color: 'success.main' }} />
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {feature}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Infomation;
