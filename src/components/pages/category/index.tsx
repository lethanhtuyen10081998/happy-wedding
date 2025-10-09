'use client';

import { Container, Grid } from '@mui/material';
import PagePadding from 'src/components/PagePadding';

import Filter from './components/Filter';
import ProductList from './components/ProductList';

export default function CategoryDetail() {
  return (
    <PagePadding>
      <Container maxWidth='xl' sx={{ paddingY: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Filter />
          </Grid>

          <Grid item xs={12} md={9}>
            <ProductList />
          </Grid>
        </Grid>
      </Container>
    </PagePadding>
  );
}
