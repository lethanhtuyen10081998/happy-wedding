'use client';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhoneIcon from '@mui/icons-material/Phone';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, Button, Card, CardContent, Chip, Divider, IconButton, Rating, Stack, TextField, Typography } from '@mui/material';
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
    setQuantity((prev) => Math.max(1, Math.min(stockCount, prev + delta)));
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
            <Rating value={rating} readOnly size='small' precision={0.5} />
            <Typography variant='body2' sx={{ ml: 0.5, fontWeight: 600 }}>
              {rating}
            </Typography>
          </Box>
          <Divider orientation='vertical' flexItem />
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            {reviewCount} đánh giá
          </Typography>
          <Divider orientation='vertical' flexItem />
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Đã bán {soldCount}
          </Typography>
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

        {/* Quantity Selector */}
        <Box sx={{ mb: 3 }}>
          <Typography variant='body2' sx={{ fontWeight: 600, mb: 1.5 }}>
            Số lượng:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
              <IconButton size='small' onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} sx={{ borderRadius: 0 }}>
                -
              </IconButton>
              <TextField
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  setQuantity(Math.max(1, Math.min(stockCount, val)));
                }}
                inputProps={{
                  style: { textAlign: 'center', width: 60, padding: '8px 4px' },
                }}
                variant='standard'
                sx={{ '& .MuiInput-underline:before': { display: 'none' } }}
              />
              <IconButton size='small' onClick={() => handleQuantityChange(1)} disabled={quantity >= stockCount} sx={{ borderRadius: 0 }}>
                +
              </IconButton>
            </Box>
            <Typography variant='caption' sx={{ color: 'text.secondary' }}>
              (Tối đa {stockCount} sản phẩm)
            </Typography>
          </Box>
        </Box>

        {/* Action Icons */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <IconButton
            sx={{
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'error.main',
                color: 'common.white',
                borderColor: 'error.main',
              },
            }}
          >
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton
            sx={{
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'common.white',
                borderColor: 'primary.main',
              },
            }}
          >
            <ShareIcon />
          </IconButton>
        </Box>

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

        <Divider sx={{ my: 3 }} />

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
