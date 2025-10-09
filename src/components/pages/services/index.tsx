import { Box, Card, CardContent, Chip, colors, Divider, Grid, Typography } from '@mui/material';
import { Camera, Clock, MapPin, Video } from 'lucide-react';
import { Icon } from 'src/components/icons';
import Container from 'src/components/material/Container';
import RatioBox from 'src/components/ui/RatioBox';
import { useDetailDataContext } from 'src/context/detailContext/hooksContext';
import { Product } from 'src/types/product';

import Gallery from './components/gallery';
import Infomation from './components/infomation';

function WeddingServiceDetail() {
  const { name, price, originalPrice, imagesList, videoUrl, tags } = useDetailDataContext<Product>();

  return (
    <Container maxWidth='lg' sx={{ mt: 16 }}>
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} display='flex' flexDirection='column' gap={2}>
            <Gallery gallery={imagesList} title={name} />
          </Grid>

          <Grid item xs={12} md={4}>
            <Infomation price={price.toString()} originalPrice={originalPrice.toString()} />
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <Typography
              variant='h5'
              sx={{
                fontWeight: 'bold',
                marginBottom: '16px',
              }}
            >
              Chi tiết gói dịch vụ
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Clock size={20} />

                  <div>
                    <Typography variant='body2' sx={{ color: 'text.secondary', margin: 0 }}>
                      Thời gian
                    </Typography>
                    <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'text.primary', margin: 0 }}>
                      {tags?.join(', ')}
                    </Typography>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <MapPin size={20} />
                  <div>
                    <Typography variant='body2' sx={{ color: 'text.secondary', margin: 0 }}>
                      Địa điểm
                    </Typography>
                    <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'text.primary', margin: 0 }}>
                      {tags?.join(', ')}
                    </Typography>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <Camera size={20} />
                  <div>
                    <Typography variant='body2' sx={{ color: 'text.secondary', margin: 0 }}>
                      Photographer
                    </Typography>
                    <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'text.primary', margin: 0 }}>
                      {tags?.join(', ')}
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>

            <Divider style={{ margin: '24px 0' }} />

            <Box sx={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Typography
                variant='h5'
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Thiết bị chuyên nghiệp
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {tags?.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    sx={{
                      backgroundColor: 'primary.light',
                      color: 'white',
                      border: '1px solid primary.main',
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Typography variant='h5'>Dịch vụ bao gồm</Typography>

              <Box component='ul' sx={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {tags?.map((item, index) => (
                  <Box
                    component='li'
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <Icon name='heart' sx={{ width: '20px', height: '20px', color: colors.pink[500] }} />

                    <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>

        {videoUrl && (
          <Card
            style={{
              overflow: 'hidden',
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <Video size={24} />
                <Typography variant='h5' sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  Video giới thiệu dịch vụ
                </Typography>
              </Box>

              <Box sx={{ position: 'relative', borderRadius: '12px' }}>
                <RatioBox ratio='16:9'>
                  <iframe
                    src={videoUrl}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      borderRadius: '12px',
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
