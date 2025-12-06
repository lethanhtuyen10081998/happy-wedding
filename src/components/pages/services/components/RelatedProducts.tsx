'use client';

import { Box, Typography } from '@mui/material';
import useList from 'src/services/admin/manage/product/getList';

import ProductCard from '../../category/components/ProductList/components/ProductCard';

export default function RelatedProducts({ currentProductId }: { currentProductId?: string }) {
  const { data: products } = useList({ limit: 100, page: 1 });
  const relatedProducts = products.filter((product) => product.id !== currentProductId && product.categoryId === currentProductId);

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

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
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} service={product} />
        ))}
      </Box>
    </Box>
  );
}
