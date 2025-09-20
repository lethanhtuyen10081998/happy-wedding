'use client';
import { Facebook, Instagram, LocationOn, Phone, Pinterest, Send, Twitter, YouTube } from '@mui/icons-material';
import { Box, Button, Container, Divider, Grid, IconButton, Link, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

const TravelFooter = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        bgcolor: '#1A2C38',
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 8,
      }}
    >
      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#4FC3F7',
              }}
            >
              HAPPY WEDDING
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              Happy Wedding là một trang web cho phép bạn tìm kiếm các dịch vụ và địa điểm cho đám cưới của bạn.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <IconButton size='small' sx={{ color: '#4FC3F7' }}>
                <Facebook />
              </IconButton>
              <IconButton size='small' sx={{ color: '#4FC3F7' }}>
                <Twitter />
              </IconButton>
              <IconButton size='small' sx={{ color: '#4FC3F7' }}>
                <Instagram />
              </IconButton>
              <IconButton size='small' sx={{ color: '#4FC3F7' }}>
                <YouTube />
              </IconButton>
              <IconButton size='small' sx={{ color: '#4FC3F7' }}>
                <Pinterest />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#4FC3F7',
              }}
            >
              LIÊN KẾT NHANH
            </Typography>
            <Link
              href='#'
              underline='hover'
              sx={{
                display: 'block',
                mb: 1.5,
                color: 'white',
                '&:hover': { color: '#4FC3F7' },
              }}
            >
              Trang chủ
            </Link>
            <Link
              href='#'
              underline='hover'
              sx={{
                display: 'block',
                mb: 1.5,
                color: 'white',
                '&:hover': { color: '#4FC3F7' },
              }}
            >
              Dịch vụ
            </Link>
            <Link
              href='#'
              underline='hover'
              sx={{
                display: 'block',
                mb: 1.5,
                color: 'white',
                '&:hover': { color: '#4FC3F7' },
              }}
            >
              Điểm đến
            </Link>
            <Link
              href='#'
              underline='hover'
              sx={{
                display: 'block',
                mb: 1.5,
                color: 'white',
                '&:hover': { color: '#4FC3F7' },
              }}
            >
              Khách sạn
            </Link>
            <Link
              href='#'
              underline='hover'
              sx={{
                display: 'block',
                mb: 1.5,
                color: 'white',
                '&:hover': { color: '#4FC3F7' },
              }}
            >
              Khuyến mãi
            </Link>
            <Link
              href='#'
              underline='hover'
              sx={{
                display: 'block',
                mb: 1.5,
                color: 'white',
                '&:hover': { color: '#4FC3F7' },
              }}
            >
              Về chúng tôi
            </Link>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#4FC3F7',
              }}
            >
              LIÊN HỆ
            </Typography>
            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
              <LocationOn sx={{ mr: 1, color: '#4FC3F7' }} />
              <Typography variant='body2'>123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</Typography>
            </Box>
            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
              <Phone sx={{ mr: 1, color: '#4FC3F7' }} />
              <Typography variant='body2'>+84 0977 432 789</Typography>
            </Box>
            {/* <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
              <Email sx={{ mr: 1, color: '#4FC3F7' }} />
              <Typography variant='body2'>info@travelexplorer.com</Typography>
            </Box> */}
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#4FC3F7',
              }}
            >
              ĐĂNG KÝ NHẬN TIN
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              Đăng ký để nhận thông tin về các ưu đãi và điểm đến mới nhất.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 1,
              }}
            >
              <TextField placeholder='Email của bạn' variant='outlined' size='small' fullWidth />
              <Button variant='contained' endIcon={<Send />}>
                Gửi
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: (theme) => theme.palette.divider }} />

        {/* Bottom Footer */}
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={12} md={6}>
            <Typography variant='body2' sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              © {new Date().getFullYear()} Happy wedding - Studio. Tất cả các quyền được bảo lưu.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: { xs: 'center', md: 'flex-end' },
              }}
            >
              <Link href='#' underline='hover' sx={{ color: 'white', fontSize: '0.875rem' }}>
                Điều khoản sử dụng
              </Link>
              <Link href='#' underline='hover' sx={{ color: 'white', fontSize: '0.875rem' }}>
                Chính sách bảo mật
              </Link>
              <Link href='#' underline='hover' sx={{ color: 'white', fontSize: '0.875rem' }}>
                Cookie
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TravelFooter;
