'use client';
import { Box, Card, CardContent, Chip, colors, Divider, Grid, Typography } from '@mui/material';
import { Camera, Clock, MapPin, Video } from 'lucide-react';
import { Icon } from 'src/components/icons';
import Container from 'src/components/material/Container';
import RatioBox from 'src/components/ui/RatioBox';

import Gallery from './components/gallery';
import Infomation from './components/infomation';

const sampleData = {
  title: 'Gói chụp ảnh cưới Premium',
  description: 'Gói chụp ảnh cưới cao cấp với đội ngũ photographer chuyên nghiệp, trang thiết bị hiện đại và dịch vụ tận tâm',
  price: '15.000.000đ',
  originalPrice: '20.000.000đ',
  features: [
    'Chụp ảnh cưới ngoại cảnh tại 3 địa điểm',
    'Album ảnh cao cấp 50 trang',
    '300+ ảnh đã chỉnh sửa chuyên nghiệp',
    'Video highlight 3-5 phút',
    'Makeup và trang phục hỗ trợ',
  ],
  gallery: [
    'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg',
    'https://images.pexels.com/photos/1603884/pexels-photo-1603884.jpeg',
    'https://images.pexels.com/photos/169211/pexels-photo-169211.jpeg',
    'https://images.pexels.com/photos/372225/pexels-photo-372225.jpeg',
    'https://images.pexels.com/photos/2788488/pexels-photo-2788488.jpeg',
  ],
  videoUrl: 'https://www.youtube.com/embed/i0yxWxk_e20',
  packageDetails: {
    duration: '8-10 giờ',
    location: 'TP.HCM và các tỉnh lân cận',
    photographer: 'Master Photographer',
    equipment: ['Canon EOS R5', 'Sony A7R IV', 'Drone 4K', 'Studio Lighting', 'Professional Lens Kit'],
    includes: [
      'Tư vấn concept và lên kế hoạch chụp chi tiết',
      'Makeup artist chuyên nghiệp trong 8 tiếng',
      '3 bộ trang phục cưới cao cấp (cô dâu)',
      '2 bộ vest nam (chú rể)',
      'Chụp ảnh tại 3 địa điểm khác nhau',
      '300+ ảnh RAW đã chỉnh sửa chuyên nghiệp',
      'Album ảnh cưới cao cấp 50 trang',
      'Video highlight cưới 3-5 phút',
      'USB chứa toàn bộ ảnh gốc',
      'Dịch vụ hỗ trợ 24/7 trong ngày chụp',
    ],
  },
  testimonials: [
    {
      name: 'Chị Minh Anh',
      rating: 5,
      comment: 'Dịch vụ tuyệt vời! Ảnh cưới đẹp không thể tả được. Team photographer rất chuyên nghiệp và tận tâm.',
      image: '/avatar-1.png',
    },
    {
      name: 'Anh Tuấn Kiệt',
      rating: 5,
      comment: 'Giá cả hợp lý, chất lượng vượt mong đợi. Album ảnh cưới được làm rất cẩn thận và đẹp mắt.',
      image: '/avatar-2.png',
    },
    {
      name: 'Cô Thanh Hương',
      rating: 4,
      comment: 'Makeup artist rất khéo tay, trang phục đa dạng và đẹp. Sẽ giới thiệu cho bạn bè.',
      image: '/elegant-woman-portrait.png',
    },
  ],
};

function WeddingServiceDetail() {
  const { title, price, originalPrice, gallery, videoUrl, packageDetails } = sampleData;

  return (
    <Container maxWidth='lg' sx={{ mt: 16 }}>
      <Box display={'flex'} flexDirection={'column'} gap={2}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8} display='flex' flexDirection='column' gap={2}>
            <Gallery gallery={gallery} title={title} />
          </Grid>

          <Grid item xs={12} md={4}>
            <Infomation price={price} originalPrice={originalPrice} />
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
                      {packageDetails.duration}
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
                      {packageDetails.location}
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
                      {packageDetails.photographer}
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
                {packageDetails.equipment.map((item, index) => (
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
                {packageDetails.includes.map((item, index) => (
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
