'use client';

import { Flight } from '@mui/icons-material';
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import { Images } from 'src/constants/images';
import { ProfileContextProvider } from 'src/context/profileContext/provider';

function PublicLayout({ children }: { children: React.ReactNode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `url(${Images.SIGN_IN_BG})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={0} sx={{ minHeight: '80vh' }}>
          {/* Left Side - Welcome Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              padding: 4,
              borderRadius: { xs: '16px 16px 0 0', md: '16px 0 0 16px' },
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url('/placeholder.svg?height=600&width=600')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.2,
                zIndex: 0,
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <Flight sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant='h3' component='h1' gutterBottom sx={{ fontWeight: 'bold' }}>
                Chào mừng trở lại!
              </Typography>
              {/* <Typography variant='h6' sx={{ mb: 3, opacity: 0.9 }}>
                Tiếp tục hành trình của bạn với chúng tôi
              </Typography>
              <Typography variant='body1' sx={{ opacity: 0.8, maxWidth: 400 }}>
                Khám phá điểm đến tuyệt vời, đặt những trải nghiệm tuyệt vời, và tạo những kỷ niệm mãi mãi.
              </Typography> */}

              {/* Floating Elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '20%',
                  right: '10%',
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                  },
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '30%',
                  left: '15%',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  animation: 'float 4s ease-in-out infinite reverse',
                }}
              />
            </Box>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundColor: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: { xs: '16px 16px 16px 16px', md: '0 16px 16px 0' },
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ width: '100%', maxWidth: 400, padding: 4 }}>
              {/* Logo */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    margin: '0 auto',
                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                    mb: 2,
                  }}
                >
                  <Flight sx={{ fontSize: 30 }} />
                </Avatar>
                <Typography variant='h4' component='h2' sx={{ fontWeight: 'bold', color: '#333' }}>
                  Đăng nhập
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                  Nhập thông tin để truy cập tài khoản
                </Typography>
              </Box>

              {/* Social Login */}
              {/* <Box sx={{ mb: 3 }}>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant='outlined'
                      sx={{
                        py: 1.5,
                        borderColor: '#e0e0e0',
                        color: '#666',
                        '&:hover': {
                          borderColor: '#4285f4',
                          backgroundColor: 'rgba(66, 133, 244, 0.04)',
                        },
                      }}
                    >
                      <Google sx={{ fontSize: 20 }} />
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant='outlined'
                      sx={{
                        py: 1.5,
                        borderColor: '#e0e0e0',
                        color: '#666',
                        '&:hover': {
                          borderColor: '#1877f2',
                          backgroundColor: 'rgba(24, 119, 242, 0.04)',
                        },
                      }}
                    >
                      <Facebook sx={{ fontSize: 20 }} />
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant='outlined'
                      sx={{
                        py: 1.5,
                        borderColor: '#e0e0e0',
                        color: '#666',
                        '&:hover': {
                          borderColor: '#1da1f2',
                          backgroundColor: 'rgba(29, 161, 242, 0.04)',
                        },
                      }}
                    >
                      <Twitter sx={{ fontSize: 20 }} />
                    </Button>
                  </Grid>
                </Grid>
              </Box> */}
              {/* 
              <Divider sx={{ mb: 3 }}>
                <Typography variant='body2' color='text.secondary'>
                  Hoặc tiếp tục với email
                </Typography>
              </Divider> */}

              {children}

              {/* <Box sx={{ textAlign: 'center', mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant='body2' color='text.secondary'>
                  {'Không có tài khoản? '}
                  <Link
                    href='#'
                    sx={{
                      color: '#4ECDC4',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Đăng ký tại đây
                  </Link>
                </Typography>

                <NextLink href={Routes.HOME}>
                  <Button variant='contained' color='primary' startIcon={<Icon name='home' />}>
                    Trang chủ
                  </Button>
                </NextLink>
              </Box> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const PublicLayoutWrapper = (props: any) => {
  return (
    <ProfileContextProvider>
      <PublicLayout {...props} />
    </ProfileContextProvider>
  );
};

export default PublicLayoutWrapper;
