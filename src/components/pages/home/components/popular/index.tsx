'use client';
import { Box, Grid, Typography } from '@mui/material';
import Container from 'src/components/material/Container';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import SmoothScroll from 'src/components/SmoothScroll';
import useList from 'src/services/admin/manage/product/getList';

import { WeddingServiceCard } from './components/cardPopular';

function WeddingServicesShowcase() {
  const { data, isFetching } = useList({
    limit: 1000,
    page: 1,
    isShowHomePage: true,
    orderByField: 'price',
    orderDirection: 'asc',
  });

  if (isFetching) {
    return <SpinnerCenter />;
  }

  return (
    <SmoothScroll>
      <Box
        sx={{
          backgroundColor: '#fdf2f8',
          paddingTop: '48px',
          paddingBottom: '48px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <Container maxWidth='lg'>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Typography variant='h1'>Dịch vụ cưới trọn gói</Typography>
            <Typography variant='body1'>
              Biến giấc mơ đám cưới của bạn thành hiện thực với các gói dịch vụ chuyên nghiệp, từ chụp ảnh cưới đến thuê váy cưới cao cấp.
            </Typography>
          </div>

          <Grid container spacing={3}>
            {data.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <WeddingServiceCard
                  title={service.name}
                  description={service.description}
                  price={service.price as number}
                  originalPrice={service.originalPrice as number}
                  features={service.tags || []}
                  image={service.imagesList?.[0] || ''}
                  slug={service.slug}
                  id={service.id}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </SmoothScroll>
  );
}

export default WeddingServicesShowcase;
