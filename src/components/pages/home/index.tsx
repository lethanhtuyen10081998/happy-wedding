import { ArrowForward, Camera, DirectionsCar, Flight, Hotel, LocationOn, PlayArrow, Star } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, CardMedia, Chip, Container, Grid, InputAdornment, Rating, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Icon } from 'src/components/icons';
import Button from 'src/components/material/Button';
import DatePicker from 'src/components/material/DatePicker';
import TextField from 'src/components/material/TextField';
import SmoothScroll from 'src/components/SmoothScroll';
import variables from 'src/themes/variables';

export default function TravelHomePage() {
  const [searchData, setSearchData] = useState({
    destination: '',
    checkin: '',
    checkout: '',
    guests: 2,
  });
  const [tabValue, setTabValue] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleTabChange = (_event: any, newValue: any) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Box
        sx={{
          height: { xs: '100vh', md: `calc(100vh - ${variables.paddingPage})` },
          backgroundImage: 'url(https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={12} md={7}>
              <SmoothScroll>
                <Box sx={{ color: 'white', textAlign: { xs: 'center', md: 'left' } }}>
                  <Typography
                    variant='h1'
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                      lineHeight: 1.1,
                      fontFamily: "'Playfair Display', serif",
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      color: 'white',
                    }}
                  >
                    Khám Phá Vẻ Đẹp Việt Nam
                  </Typography>
                  <Typography
                    variant='h5'
                    sx={{
                      mb: 4,
                      opacity: 0.9,
                      fontSize: { xs: '1.1rem', md: '1.3rem' },
                      fontWeight: 300,
                      lineHeight: 1.6,
                      maxWidth: '600px',
                      mx: { xs: 'auto', md: 0 },
                      color: 'white',
                    }}
                  >
                    Trải nghiệm những chuyến du lịch đáng nhớ với dịch vụ cao cấp và trọn gói từ Wanderlust
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <Button
                      variant='contained'
                      size='large'
                      sx={{
                        fontWeight: 600,
                        boxShadow: '0 10px 20px rgba(255, 56, 92, 0.35)',
                      }}
                    >
                      Khám phá ngay
                    </Button>
                    <Button
                      variant='outlined'
                      size='large'
                      startIcon={<PlayArrow />}
                      sx={{
                        color: 'white',
                        fontSize: '1rem',
                        px: 3,
                        py: 1.5,
                        borderRadius: '30px',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' },
                      }}
                    >
                      Xem video
                    </Button>
                  </Box>
                </Box>
              </SmoothScroll>
            </Grid>
          </Grid>
        </Container>
        {/* Search Box */}
        <Container
          maxWidth='lg'
          sx={{
            position: 'absolute',
            bottom: { xs: '-120px', md: '-70px' },
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <SmoothScroll>
            <Card
              sx={{
                borderRadius: '16px',
                overflow: 'visible',
                boxShadow: '0 15px 50px rgba(0,0,0,0.12)',
              }}
            >
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant='fullWidth'
                  sx={{
                    mb: 3,
                  }}
                >
                  <Tab label='Tour du lịch' />
                  <Tab label='Khách sạn' />
                  <Tab label='Vé máy bay' />
                </Tabs>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      placeholder='Bạn muốn đi đâu?'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Icon name='location' />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2.5}>
                    <DatePicker fullWidth placeholder='Ngày khởi hành' label='Ngày khởi hành' />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2.5}>
                    <DatePicker fullWidth placeholder='Ngày về' label='Ngày về' />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button
                      fullWidth
                      variant='contained'
                      size='large'
                      endIcon={<ArrowForward />}
                      sx={{
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    >
                      Tìm kiếm
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </SmoothScroll>
        </Container>
      </Box>

      {/* Popular Destinations */}
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

      {/* Services Section */}
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
      {/* Testimonials */}
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
    </Box>
  );
}
