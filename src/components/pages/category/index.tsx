import { Container, Grid } from '@mui/material';
import PagePadding from 'src/components/PagePadding';

import Filter from './components/Filter';
import ProductList from './components/ProductList';

export default function CategoryDetail() {
  return (
    <PagePadding>
      <Container maxWidth='xl' sx={{ paddingY: 2, position: 'relative' }}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <Filter />
          </Grid>

          <Grid item xs={12} md={12}>
            <ProductList />
          </Grid>
        </Grid>
      </Container>
    </PagePadding>
  );
}
