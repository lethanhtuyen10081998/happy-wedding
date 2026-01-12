'use client';

import { Box, Card, Chip, Grid, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import Container from 'src/components/material/Container';
import RatioBox from 'src/components/ui/RatioBox';
import { SPACING } from 'src/constants/grid';
import { useDetailDataContext } from 'src/context/detailContext/hooksContext';
import variables from 'src/themes/variables';
import { Product } from 'src/types/product';

import Gallery from './components/gallery';
import Infomation from './components/infomation';
import ProductReviews from './components/ProductReviews';
import ProductSpecs from './components/ProductSpecs';
import RelatedProducts from './components/RelatedProducts';
import SEOPreview from './components/SEOPreview';

function WeddingServiceDetail() {
  const { id, name, price, originalPrice, imagesList, videoUrl, tags, description, reviewCount = 0 } = useDetailDataContext<Product>();
  const [tabValue, setTabValue] = useState(0);
  const [seoPreviewOpen, setSeoPreviewOpen] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Strip HTML from description for SEO preview
  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').substring(0, 160);
  };

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const currentUrl = `${siteUrl}/san-pham/${id}`;
  const imageUrl = imagesList?.[0] || '';
  const seoDescription = stripHtml(description || '');

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', pt: { xs: 12, md: 14 }, pb: 6 }}>
      <Container maxWidth='lg' sx={{ py: 3 }}>
        <Box display={'flex'} flexDirection={'column'} gap={3}>
          {/* Main Product Info - Content First, Image Smaller */}
          <Card sx={{ borderRadius: '4px', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.13)', bgcolor: 'white', p: 2 }}>
            <Grid container spacing={SPACING}>
              {/* Hình ảnh ở bên trái */}
              <Grid item xs={12} md={4} lg={5} order={{ xs: 1, md: 1 }}>
                <Gallery gallery={imagesList || []} title={name} />
              </Grid>

              {/* Content ở bên phải, chiếm nhiều không gian hơn */}
              <Grid item xs={12} md={8} lg={7} order={{ xs: 2, md: 2 }}>
                <Box>
                  <Infomation price={price as number} originalPrice={originalPrice as number} name={name} />

                  <Box>
                    <Box sx={{ borderBottom: '1px solid rgba(0,0,0,0.09)' }}>
                      <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        sx={{
                          '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '0.875rem',
                            minHeight: 48,
                            color: 'rgba(0,0,0,0.54)',
                            '&.Mui-selected': {
                              color: 'primary.main',
                              fontWeight: 500,
                            },
                          },
                          '& .MuiTabs-indicator': {
                            backgroundColor: 'primary.main',
                            height: 2,
                          },
                        }}
                      >
                        <Tab label='Mô tả sản phẩm' />
                        <Tab label='Thông số kỹ thuật' />
                        <Tab label={`Đánh giá (${reviewCount || 0})`} />
                      </Tabs>
                    </Box>

                    <Box sx={{ p: 2, bgcolor: 'white' }}>
                      {tabValue === 0 && (
                        <Box>
                          <Box
                            sx={{
                              '& p': { mb: 1.5, lineHeight: 1.6, color: 'rgba(0,0,0,0.87)', fontSize: '0.875rem' },
                              '& img': { maxWidth: '100%', height: 'auto', borderRadius: '4px', my: 1.5 },
                            }}
                            dangerouslySetInnerHTML={{ __html: description || 'Chưa có mô tả' }}
                          />

                          {/* Tags */}
                          {tags && tags.length > 0 && (
                            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.09)', display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {tags.map((tag, index) => (
                                  <Chip
                                    key={index}
                                    label={tag || 'Chưa có ưu đãi'}
                                    sx={{
                                      bgcolor: 'primary.main',
                                      color: 'white',
                                      fontWeight: 500,
                                      fontSize: '0.75rem',
                                      height: 24,
                                      borderRadius: '4px',
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}

                          {/* Video */}
                          {videoUrl && (
                            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.09)' }}>
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
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Card>

          {/* Related Products */}
          <RelatedProducts currentProductId={id} />
        </Box>
      </Container>

      {/* SEO Preview Dialog */}
      <SEOPreview
        open={seoPreviewOpen}
        onClose={() => setSeoPreviewOpen(false)}
        title={name}
        description={seoDescription}
        imageUrl={imageUrl}
        url={currentUrl}
        siteName='Happy Wedding'
      />
    </Box>
  );
}

export default WeddingServiceDetail;
