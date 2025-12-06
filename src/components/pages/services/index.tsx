'use client';

import { Box, Card, Chip, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import Container from 'src/components/material/Container';
import RatioBox from 'src/components/ui/RatioBox';
import { useDetailDataContext } from 'src/context/detailContext/hooksContext';
import variables from 'src/themes/variables';
import { Product } from 'src/types/product';

import Gallery from './components/gallery';
import Infomation from './components/infomation';
import ProductReviews from './components/ProductReviews';
import ProductSpecs from './components/ProductSpecs';
import RelatedProducts from './components/RelatedProducts';

function WeddingServiceDetail() {
  const { id, name, price, originalPrice, imagesList, videoUrl, tags, description, reviewCount } = useDetailDataContext<Product>();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', pt: { xs: 12, md: 14 }, pb: 6 }}>
      <Container maxWidth='lg' sx={{ py: 3 }}>
        <Box display={'flex'} flexDirection={'column'} gap={3}>
          {/* Main Product Info */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={7} lg={8}>
              <Gallery gallery={imagesList || []} title={name} />
            </Grid>

            <Grid item xs={12} md={5} lg={4}>
              <Infomation price={price as number} originalPrice={originalPrice as number} name={name} />
            </Grid>
          </Grid>

          {/* Product Details Tabs */}
          <Card sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    minHeight: 64,
                  },
                  '& .Mui-selected': {
                    color: 'primary.main',
                  },
                }}
              >
                <Tab label='Mô tả sản phẩm' />
                <Tab label='Thông số kỹ thuật' />
                <Tab label={`Đánh giá (${reviewCount || 128})`} />
              </Tabs>
            </Box>

            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <Box>
                  <Typography variant='h6' sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                    Mô tả chi tiết
                  </Typography>
                  <Box
                    sx={{
                      '& p': { mb: 2, lineHeight: 1.8 },
                      '& img': { maxWidth: '100%', height: 'auto', borderRadius: 2, my: 2 },
                    }}
                    dangerouslySetInnerHTML={{ __html: description || 'Chưa có mô tả' }}
                  />

                  {/* Tags */}
                  {tags && tags.length > 0 && (
                    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'grey.200', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag || 'Chưa có ưu đãi'}
                            sx={{
                              bgcolor: 'primary.light',
                              color: 'common.white',
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Video */}
                  {videoUrl && (
                    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'grey.200' }}>
                      <Typography variant='subtitle1' sx={{ fontWeight: 600, mb: 2 }}>
                        Video sản phẩm:
                      </Typography>
                      <Box sx={{ position: 'relative', borderRadius: variables.borderRadius, overflow: 'hidden' }}>
                        <RatioBox ratio='16:9'>
                          <iframe
                            src={videoUrl}
                            style={{
                              width: '100%',
                              height: '100%',
                              border: 'none',
                              borderRadius: variables.borderRadius,
                            }}
                            allowFullScreen
                          />
                        </RatioBox>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}

              {tabValue === 1 && <ProductSpecs />}

              {tabValue === 2 && <ProductReviews />}
            </Box>
          </Card>

          {/* Related Products */}
          <RelatedProducts currentProductId={id} />
        </Box>
      </Container>
    </Box>
  );
}

export default WeddingServiceDetail;
