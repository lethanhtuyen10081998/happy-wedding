import { Box, Grid, Pagination, Typography } from '@mui/material';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import { useFilterObjectContext, usePage } from 'src/context/filterContext/hooksContext';
import { useAPIFilterContext } from 'src/context/filterContext/provider';
import useList from 'src/services/admin/manage/product/getList';

import { WeddingServiceCard } from '../../home/components/popular/components/cardPopular';
import { FilterProps } from './Filter';

export default function ProductList() {
  const { name, category, sortOrder, fromPrice, toPrice } = useFilterObjectContext<FilterProps>();
  const page = usePage();
  const { onUpdatePage } = useAPIFilterContext();

  const { data, isFetching, total } = useList({
    limit: 10,
    page: page,
    categoryId: category?.id,
    name: name,
    orderByField: 'price',
    orderDirection: sortOrder,
    price: fromPrice,
    toPrice: toPrice,
  });

  if (isFetching) {
    return <SpinnerCenter />;
  }

  if (total === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant='h6'>Không tìm thấy sản phẩm nào phù hợp với bộ lọc</Typography>
      </Box>
    );
  }

  console.log(data);

  return (
    <>
      <Typography variant='h6' sx={{ my: 3 }}>
        Tìm thấy {total} sản phẩm
      </Typography>
      <Grid container spacing={3}>
        {data.map((service, index) => (
          <Grid item xs={12} md={4} lg={3} xl={3} key={index}>
            <WeddingServiceCard
              title={service.name}
              features={service.tags || []}
              image={service.imagesList?.[0] || ''}
              description={service.description || ''}
              price={service.price as number}
              originalPrice={service.originalPrice as number}
              slug={service.slug}
              id={service.id}
            />
          </Grid>
        ))}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} width='100%'>
          <Pagination count={Math.ceil(total / 10)} page={page} onChange={(e, value) => onUpdatePage(value)} />
        </Box>
      </Grid>
    </>
  );
}
