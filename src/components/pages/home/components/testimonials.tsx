import { Star } from '@mui/icons-material';
import { Avatar, Box, Card, Container, Grid, Rating, Typography } from '@mui/material';
import Button from 'src/components/material/Button';
import TextField from 'src/components/material/TextField';
import SmoothScroll from 'src/components/SmoothScroll';

export default function TestimonialsComponent() {
  const testimonials = [
    {
      name: 'Nguyễn Văn A',
      avatar: '/placeholder.svg?height=100&width=100',
      rating: 5,
      comment: 'Dịch vụ tuyệt vời, nhân viên nhiệt tình. Chuyến đi Sapa rất đáng nhớ! Tôi sẽ quay lại sử dụng dịch vụ trong tương lai.',
      position: 'Doanh nhân',
    },
    {
      name: 'Trần Thị B',
      avatar: '/placeholder.svg?height=100&width=100',
      rating: 5,
      comment: 'Giá cả hợp lý, tour được tổ chức chuyên nghiệp. Hướng dẫn viên rất am hiểu và nhiệt tình. Sẽ quay lại!',
      position: 'Giáo viên',
    },
    {
      name: 'Lê Minh C',
      avatar: '/placeholder.svg?height=100&width=100',
      rating: 4,
      comment: 'Phú Quốc thật tuyệt vời. Cảm ơn team đã tư vấn tận tình! Khách sạn và dịch vụ đều vượt quá mong đợi của tôi.',
      position: 'Nhiếp ảnh gia',
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
              <Grid item xs={12} md={6}>
                <Typography
                  variant='h3'
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    fontFamily: "'Playfair Display', serif",
                    color: '#222',
                  }}
                >
                  Đăng ký nhận thông tin ưu đãi
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
                  Nhận thông tin về các tour mới và ưu đãi đặc biệt từ Wanderlust
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder='Email của bạn'
                    variant='outlined'
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'white',
                        '& fieldset': { borderColor: '#e0e0e0' },
                        '&:hover fieldset': { borderColor: '#bdbdbd' },
                        '&.Mui-focused fieldset': { borderColor: '#ff385c' },
                      },
                    }}
                  />
                  <Button
                    variant='contained'
                    sx={{
                      borderRadius: '12px',
                      py: 1.5,
                      px: { xs: 2, sm: 4 },
                      backgroundColor: '#ff385c',
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      boxShadow: '0 8px 20px rgba(255, 56, 92, 0.3)',
                      '&:hover': { backgroundColor: '#e8354f', boxShadow: '0 10px 25px rgba(255, 56, 92, 0.4)' },
                    }}
                  >
                    Đăng ký ngay
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </SmoothScroll>
    </>
  );
}
