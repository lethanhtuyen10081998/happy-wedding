import { Box, Container } from '@mui/material';
import PagePadding from 'src/components/PagePadding';

import Filter from './components/Filter';
import ProductList from './components/ProductList';

export default function CategoryDetail() {
  return (
    <PagePadding>
      <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa' }}>
        <Container maxWidth='lg' sx={{ py: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 4,
            }}
          >
            <Box
              sx={{
                width: { xs: '100%', lg: '280px' },
                flexShrink: 0,
              }}
            >
              <Box sx={{ position: 'sticky', top: 16 }}>
                <Filter />
              </Box>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <ProductList />
            </Box>
          </Box>
        </Container>
      </Box>
    </PagePadding>
  );
}
