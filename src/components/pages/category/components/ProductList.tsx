import { Box, Grid, Typography } from '@mui/material';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import { WeddingServiceCard } from 'src/components/pages/home/components/popular/components/cardPopular';
import { useFilterObjectContext } from 'src/context/filterContext/hooksContext';
import useList from 'src/services/admin/manage/product/getList';

import { FilterProps } from './Filter';

export default function ProductList() {
  const { category, name, fromPrice, toPrice } = useFilterObjectContext<FilterProps>();
  const { data, isFetching, total } = useList(
    {
      limit: 10,
      page: 1,
      categoryId: category?.id,
      name: name,
      price: fromPrice,
      toPrice: toPrice,
    },
    !!category?.id,
  );

  if (isFetching) {
    return <SpinnerCenter />;
  }

  return (
    <>
      <Typography variant='h6' sx={{ mb: 3 }}>
        Tìm thấy {total} sản phẩm
      </Typography>
      <Grid container spacing={3}>
        {data.map((service, index) => (
          <Grid item xs={12} md={4} key={index}>
            <WeddingServiceCard
              title={service.name}
              features={service.tags || []}
              image={service.imagesList?.[0] || ''}
              description={service.description || ''}
              price={service.price as number}
              originalPrice={service.originalPrice as number}
            />
          </Grid>
        ))}
      </Grid>

      {data.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant='h6'>Không tìm thấy sản phẩm nào phù hợp với bộ lọc</Typography>
        </Box>
      )}
    </>
  );
}
