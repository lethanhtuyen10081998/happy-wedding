'use client';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Button, Card, CardContent, Chip, Divider, Rating, Stack, Typography } from '@mui/material';
import { formatMoney } from 'src/libs/utils';

function Infomation({ price, originalPrice, name }: { price: number; originalPrice: number; name: string }) {
  const rating = 4.5;

  const inStock = true;
  const stockCount = 50;
  const discountPercent = originalPrice && originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;

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

        {/* Price Section */}
        <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2, mb: 3 }} position={'relative'}>
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
            <Box>
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
                      height: 20,
                      position: 'absolute',
                      top: 5,
                      right: 10,
                    }}
                  />
                </>
              )}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Rating value={rating} readOnly size='small' precision={0.5} />
                <Typography variant='body2' sx={{ ml: 0.5, fontWeight: 600 }}>
                  {rating}
                </Typography>
              </Box>
            </Box>

            <Typography variant='caption' sx={{ color: 'text.secondary' }}>
              Giá đã bao gồm VAT
            </Typography>
          </Box>
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
            Liên hệ: 0977 432 412
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
            Zalo: 0977 432 412
          </Button>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Shipping Info */}
        <Box sx={{ bgcolor: 'info.light', p: 2, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <LocalShippingIcon sx={{ color: 'info.main', mt: 0.5 }} />
            <Box>
              <Typography variant='subtitle2' sx={{ fontWeight: 600, mb: 0.5 }}>
                Giao hàng nhanh
              </Typography>
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                Miễn phí vận chuyển cho đơn hàng trên 500.000₫. Giao hàng trong 24h tại TP.HCM
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Guarantee */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant='body2' sx={{ color: 'text.secondary', textAlign: 'center', fontStyle: 'italic' }}>
            *Cam kết cung cấp dịch vụ chất lượng, uy tín. Chất lượng cao, giá cả hợp lý.*
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Infomation;
