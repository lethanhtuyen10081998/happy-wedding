import { LocationOn, Star } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, Chip, Container, Grid, Rating, Typography } from '@mui/material';
import Button from 'src/components/material/Button';
import SmoothScroll from 'src/components/SmoothScroll';

export default function HomePage() {
  const destinations = [
    {
      id: 1,
      name: 'Hạ Long Bay',
      image: 'https://images.pexels.com/photos/2387866/pexels-photo-2387866.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '2.500.000đ',
      rating: 4.8,
      description: 'Di sản thiên nhiên thế giới với vẻ đẹp hùng vĩ',
      location: 'Quảng Ninh',
      duration: '3 ngày 2 đêm',
    },
    {
      id: 2,
      name: 'Sapa',
      image: 'https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '1.800.000đ',
      rating: 4.7,
      description: 'Ruộng bậc thang và văn hóa dân tộc độc đáo',
      location: 'Lào Cai',
      duration: '2 ngày 1 đêm',
    },
    {
      id: 3,
      name: 'Phú Quốc',
      image: 'https://images.pexels.com/photos/1275393/pexels-photo-1275393.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '3.200.000đ',
      rating: 4.9,
      description: 'Đảo ngọc với bãi biển cát trắng tuyệt đẹp',
      location: 'Kiên Giang',
      duration: '4 ngày 3 đêm',
    },
    {
      id: 4,
      name: 'Đà Nẵng',
      image: 'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '2.100.000đ',
      rating: 4.6,
      description: 'Thành phố đáng sống với cầu Vàng nổi tiếng',
      location: 'Đà Nẵng',
      duration: '3 ngày 2 đêm',
    },
  ];

  return (
    <Container maxWidth='lg' sx={{ py: { xs: 15, md: 12 }, mt: { xs: 5, md: 0 } }}>
      <SmoothScroll>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant='overline'
            sx={{
              color: '#ff385c',
              fontWeight: 600,
              letterSpacing: 1.5,
              fontSize: '0.9rem',
            }}
          >
            KHÁM PHÁ NGAY
          </Typography>
          <Typography
            variant='h2'
            sx={{
              fontWeight: 700,
              color: '#222',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.75rem' },
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Điểm Đến Nổi Bật
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: '#666',
              maxWidth: 650,
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.7,
            }}
          >
            Khám phá những địa điểm du lịch hấp dẫn nhất Việt Nam với trải nghiệm độc đáo và dịch vụ đẳng cấp
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {destinations.map((dest) => (
            <Grid item xs={12} sm={6} md={3} key={dest.id}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                  },
                  '&:hover .destination-image': {
                    transform: 'scale(1.05)',
                  },
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden', paddingTop: '75%' }}>
                  <CardMedia
                    component='img'
                    image={dest.image}
                    alt={dest.name}
                    className='destination-image'
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.8s ease',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 2,
                    }}
                  >
                    <Chip
                      label={dest.price}
                      sx={{
                        backgroundColor: (theme) => theme.palette.primary.main,
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.light}`,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                      p: 2,
                      color: 'white',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <LocationOn sx={{ fontSize: 16, mr: 0.5, opacity: 0.9 }} />
                      <Typography variant='body2' sx={{ opacity: 0.9, fontWeight: 500 }}>
                        {dest.location}
                      </Typography>
                    </Box>
                    <Typography variant='h6' sx={{ fontWeight: 700, mb: 0.5 }}>
                      {dest.name}
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Rating
                      value={dest.rating}
                      precision={0.1}
                      size='small'
                      readOnly
                      sx={{ color: (theme) => theme.palette.primary.main }}
                      icon={<Star fontSize='inherit' />}
                    />
                    <Typography variant='body2' sx={{ ml: 1, color: '#666', fontWeight: 500 }}>
                      {dest.rating} (120+ đánh giá)
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary' sx={{ mb: 2, flexGrow: 1 }}>
                    {dest.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={dest.duration}
                      size='small'
                      sx={{
                        backgroundColor: '#f0f4f8',
                        fontWeight: 500,
                        fontSize: '0.75rem',
                      }}
                    />
                    <Button
                      variant='text'
                      sx={{
                        color: (theme) => theme.palette.primary.main,
                        fontWeight: 600,
                        '&:hover': { backgroundColor: 'transparent', opacity: 0.8 },
                      }}
                    >
                      Chi tiết
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </SmoothScroll>
    </Container>
  );
}
