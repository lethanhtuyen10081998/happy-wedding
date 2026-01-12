'use client';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Button, CardContent, Divider, Rating, Typography } from '@mui/material';
import { useState } from 'react';
import { useDetailDataContext } from 'src/context/detailContext/hooksContext';
import { formatMoney } from 'src/libs/utils';
import { Product } from 'src/types/product';

function Infomation({ price, originalPrice, name }: { price: number; originalPrice: number; name: string }) {
  const [quantity, setQuantity] = useState(1);
  const productData = useDetailDataContext<Product>();

  const rating = productData.rating || 4.5;
  const reviewCount = productData.reviewCount || 0;
  const soldCount = productData.soldCount || 5;
  const inStock = productData.inStock !== undefined ? productData.inStock : true;
  const stockCount = productData.stockCount || 50;

  const discountPercent = originalPrice && originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(Number(stockCount), prev + delta)));
  };

  return (
    <CardContent>
      {/* Product Name - Shopee Style */}
      <Typography
        variant='h4'
        sx={{
          fontWeight: 500,
          mb: 2,
          color: 'rgba(0,0,0,0.87)',
          lineHeight: 1.4,
          fontSize: '1.5rem',
        }}
      >
        {name}
      </Typography>

      {/* Rating & Reviews - Shopee Style */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, pb: 2, borderBottom: '1px solid rgba(0,0,0,0.09)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Rating
            value={Number(rating)}
            readOnly
            size='small'
            precision={0.5}
            sx={{
              '& .MuiRating-iconFilled': {
                color: 'warning.main',
              },
              '& .MuiRating-iconEmpty': {
                color: '#d5d5d5',
              },
            }}
          />
          <Typography variant='body2' sx={{ ml: 0.5, fontWeight: 500, color: 'rgba(0,0,0,0.87)' }}>
            {rating}
          </Typography>
        </Box>
        <Divider orientation='vertical' flexItem sx={{ height: 16, bgcolor: 'rgba(0,0,0,0.12)' }} />
        <Typography variant='body2' sx={{ color: 'rgba(0,0,0,0.54)', fontWeight: 400 }}>
          {reviewCount} đánh giá
        </Typography>
        <Divider orientation='vertical' flexItem sx={{ height: 16, bgcolor: 'rgba(0,0,0,0.12)' }} />
        <Typography variant='body2' sx={{ color: 'rgba(0,0,0,0.54)', fontWeight: 400 }}>
          Đã bán {soldCount}
        </Typography>
      </Box>

      {/* Price, Stock Status & Buttons - Compact */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5, flexWrap: 'wrap' }}>
          <Typography
            variant='h5'
            sx={{
              fontWeight: 500,
              color: 'primary.main',
              fontSize: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            {formatMoney(price)}
          </Typography>
          {originalPrice && originalPrice > price && (
            <>
              <Typography
                variant='body2'
                sx={{
                  color: 'grey.500',
                  textDecoration: 'line-through',
                  fontWeight: 400,
                  fontSize: '0.875rem',
                }}
              >
                {formatMoney(originalPrice)}
              </Typography>
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  px: 1,
                  py: 0.25,
                  borderRadius: '3px',
                }}
              >
                -{discountPercent}%
              </Box>
            </>
          )}
          {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: inStock ? 'success.main' : 'primary.main',
              }}
            />
            <Typography variant='caption' sx={{ color: inStock ? 'success.main' : 'primary.main', fontWeight: 500 }}>
              {inStock ? `Còn hàng (${stockCount})` : 'Hết hàng'}
            </Typography>
          </Box> */}
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant='contained' size='medium' startIcon={<PhoneIcon />} sx={{ flex: 1 }}>
            Liên hệ: 0377 002 994
          </Button>
          <Button variant='outlined' size='medium' sx={{ flex: 1 }}>
            Zalo: 0377 002 994
          </Button>
        </Box>
      </Box>
    </CardContent>
  );
}

export default Infomation;
