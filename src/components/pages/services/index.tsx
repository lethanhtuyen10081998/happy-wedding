import { Box, Card, CardContent, colors, Divider, Grid, Typography } from '@mui/material';
import { Icon } from 'src/components/icons';
import Container from 'src/components/material/Container';
import RatioBox from 'src/components/ui/RatioBox';
import { SPACING } from 'src/constants/grid';
import { useDetailDataContext } from 'src/context/detailContext/hooksContext';
import variables from 'src/themes/variables';
import { Product } from 'src/types/product';

import Gallery from './components/gallery';
import Infomation from './components/infomation';

function WeddingServiceDetail() {
  const { name, price, originalPrice, imagesList, videoUrl, tags, description } = useDetailDataContext<Product>();

  return (
    <Container maxWidth='lg' sx={{ mt: 16 }}>
      <Box display={'flex'} flexDirection={'column'} gap={SPACING}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} display='flex' flexDirection='column' gap={SPACING}>
            <Gallery gallery={imagesList} title={name} />
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: SPACING }}>
              <Infomation price={price as number} originalPrice={originalPrice as number} name={name} />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 0 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <Typography variant='h3' sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                Mô tả dịch vụ
              </Typography>

              <Box dangerouslySetInnerHTML={{ __html: description }} />
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: SPACING }} mt={7}>
              <Box component='ul' sx={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: SPACING }}>
                {tags?.map((item, index) => (
                  <Box
                    component='li'
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: SPACING,
                    }}
                  >
                    <Icon name='heart' sx={{ width: '20px', height: '20px', color: colors.pink[500] }} />

                    <Typography sx={{ color: 'text.secondary' }}>{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider />

        {videoUrl && (
          <Card
            style={{
              overflow: 'hidden',
            }}
          >
            <CardContent>
              <Box sx={{ position: 'relative', borderRadius: variables.borderRadius }}>
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
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
}

export default WeddingServiceDetail;
