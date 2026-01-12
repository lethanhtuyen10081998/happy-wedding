'use client';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, IconButton } from '@mui/material';
import { useState } from 'react';
import PagePadding from 'src/components/PagePadding';
import Container from 'src/components/material/Container';

import Filter from './components/Filter';
import ProductList from './components/ProductList';

export default function CategoryDetail() {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleFilterToggle = () => {
    setMobileFilterOpen(!mobileFilterOpen);
  };

  return (
    <PagePadding>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Container sx={{ py: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 2,
            }}
          >
            {/* Desktop Filter Sidebar */}
            <Box
              sx={{
                display: { xs: 'none', lg: 'block' },
                width: '240px',
                flexShrink: 0,
                position: 'sticky',
                top: 124,
                alignSelf: 'flex-start',
                maxHeight: 'calc(100vh - 32px)',
                overflowY: 'auto',
              }}
            >
              <Filter />
            </Box>

            {/* Mobile Filter Drawer */}
            <Drawer
              anchor='right'
              open={mobileFilterOpen}
              onClose={handleFilterToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', lg: 'none' },
                '& .MuiDrawer-paper': {
                  width: { xs: '85%', sm: 320 },
                  boxSizing: 'border-box',
                  p: 2,
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  pb: 2,
                  borderBottom: '1px solid rgba(0,0,0,0.09)',
                }}
              >
                <Box sx={{ fontWeight: 500, fontSize: '1rem', color: 'rgba(0,0,0,0.87)' }}>Bộ lọc tìm kiếm</Box>
                <IconButton onClick={handleFilterToggle} sx={{ color: 'rgba(0,0,0,0.54)' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Filter />
            </Drawer>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <ProductList onFilterToggle={handleFilterToggle} />
            </Box>
          </Box>
        </Container>
      </Box>
    </PagePadding>
  );
}
