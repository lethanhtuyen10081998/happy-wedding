import { Camera, DirectionsCar, Flight, Hotel } from '@mui/icons-material';
import { Box, Container, Grid, Typography } from '@mui/material';
import SmoothScroll from 'src/components/SmoothScroll';

export default function ServiceComponent() {
  const services = [
    {
      icon: <Flight sx={{ fontSize: 40, color: '#fff' }} />,
      title: 'Đặt vé máy bay',
      description: 'Tìm kiếm và đặt vé máy bay giá tốt nhất từ mọi hãng bay',
    },
    {
      icon: <Hotel sx={{ fontSize: 40, color: '#fff' }} />,
      title: 'Đặt khách sạn',
      description: 'Hệ thống khách sạn đa dạng từ bình dân đến cao cấp',
    },
    {
      icon: <DirectionsCar sx={{ fontSize: 40, color: '#fff' }} />,
      title: 'Làm VISA',
      description: 'Dịch vụ làm visa cho bạn, nhanh chóng, tiện lợi',
    },
    {
      icon: <Camera sx={{ fontSize: 40, color: '#fff' }} />,
      title: 'Tour trọn gói',
      description: 'Các gói tour du lịch được thiết kế tỉ mỉ, chuyên nghiệp',
    },
  ];

  return (
    <SmoothScroll>
      <Box
        sx={{
          py: 10,
          background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)',
          }}
        />

        <Container maxWidth='lg'>
          <Box sx={{ textAlign: 'center', mb: 8, position: 'relative', zIndex: 2 }}>
            <Typography
              variant='overline'
              sx={{
                color: (theme) => theme.palette.primary.main,
                fontWeight: 600,
                letterSpacing: 1.5,
                fontSize: '0.9rem',
              }}
            >
              DỊCH VỤ CHUYÊN NGHIỆP
            </Typography>
            <Typography
              variant='h2'
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.75rem' },
                fontFamily: "'Playfair Display', serif",
                color: 'white',
              }}
            >
              Chúng Tôi Cung Cấp
            </Typography>
            <Typography
              variant='body1'
              sx={{
                opacity: 0.9,
                maxWidth: 650,
                mx: 'auto',
                fontSize: '1.1rem',
                lineHeight: 1.7,
              }}
            >
              Anhfly Travel mang đến cho bạn trải nghiệm du lịch trọn vẹn với các dịch vụ đẳng cấp và chuyên nghiệp
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      background: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      mb: 3,
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #ff385c, #ff9a8d)',
                      boxShadow: '0 10px 20px rgba(255, 56, 92, 0.3)',
                      mx: 'auto',
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography color='white' variant='h5' sx={{ mb: 2, fontWeight: 700 }}>
                    {service.title}
                  </Typography>
                  <Typography variant='body2' sx={{ opacity: 0.9, lineHeight: 1.7 }}>
                    {service.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </SmoothScroll>
  );
}
