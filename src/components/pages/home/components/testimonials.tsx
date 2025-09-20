import { Star } from '@mui/icons-material';
import { Avatar, Box, Card, Container, Grid, Rating, Typography } from '@mui/material';
import SmoothScroll from 'src/components/SmoothScroll';

export default function TestimonialsComponent() {
  const testimonials = [
    {
      name: 'Bùi Thị Thúy',
      avatar: '/avatar-1.png',
      rating: 5,
      comment: 'Dịch vụ tuyệt vời, nhân viên nhiệt tình. váy cưới đẹp, chất lượng cao, nhiều lựa chọn.',
      position: 'Cô dâu',
    },
    {
      name: 'Hoàng Trung Kiên',
      avatar: '/avatar-2.png',
      rating: 5,
      comment: 'Giá cả hợp lý, áo vest nam có nhiều màu sắc chọn lựa, mẫu mã đẹp. Hỗ trợ nhiệt tình.',
      position: 'Chú rể',
    },
    {
      name: 'Lê Minh Châu',
      avatar: '/avatar-3.png',
      rating: 4,
      comment: 'Váy đi bàn đẹp, giá thuê rể hơn so với thị trường, nhưng chất lượng không kém.',
      position: 'Cô dâu',
    },
  ];

  return (
    <>
      <SmoothScroll>
        <Container maxWidth='lg' sx={{ py: 10 }}>
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
              TRẢI NGHIỆM KHÁCH HÀNG
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
              Khách Hàng Nói Gì
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
              Sự hài lòng của khách hàng là thước đo thành công của chúng tôi
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: '16px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', mb: 3 }}>
                    <Avatar
                      src={testimonial.avatar}
                      sx={{
                        width: 70,
                        height: 70,
                        mr: 2,
                        border: '3px solid white',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                      }}
                    />
                    <Box>
                      <Typography variant='h6' sx={{ fontWeight: 700, mb: 0.5 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant='body2' sx={{ color: '#666', mb: 1 }}>
                        {testimonial.position}
                      </Typography>
                      <Rating value={testimonial.rating} size='small' readOnly sx={{ color: '#ff385c' }} icon={<Star fontSize='inherit' />} />
                    </Box>
                  </Box>
                  <Typography
                    variant='body1'
                    sx={{
                      fontStyle: 'italic',
                      color: '#444',
                      lineHeight: 1.7,
                      flexGrow: 1,
                      position: 'relative',
                      pl: 2,
                    }}
                  >
                    {testimonial.comment}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SmoothScroll>
      <SmoothScroll>
        <Box
          sx={{
            py: 8,
            backgroundColor: '#f8f9fa',
            borderRadius: { md: '30px' },
            mx: { md: 4 },
            my: 4,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Container maxWidth='md'>
            <Grid container spacing={4} alignItems='center'>
              <Grid item xs={12} md={8}>
                <Typography
                  variant='h3'
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Liên hệ ngay để nhận ưu đãi
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    mb: 4,
                    color: '#666',
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                  }}
                >
                  Nhận thông tin về các gói dịch vụ mới và ưu đãi đặc biệt từ Happy wedding - Studio
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </SmoothScroll>
    </>
  );
}
