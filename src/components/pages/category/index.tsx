import { Box } from '@mui/material';
import PagePadding from 'src/components/PagePadding';
import Container from 'src/components/material/Container';

import Filter from './components/Filter';
import ProductList from './components/ProductList';

export default function CategoryDetail() {
  return (
    <PagePadding>
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
        <Container sx={{ py: 4 }}>
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
                position: { xs: 'static', lg: 'sticky' },
                top: { lg: 124 },
                alignSelf: { xs: 'stretch', lg: 'flex-start' },
                maxHeight: { lg: 'calc(100vh - 32px)' },
                overflowY: { lg: 'auto' },
              }}
            >
              <Filter />
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
