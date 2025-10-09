'use client';
import { Box, Grid, Typography } from '@mui/material';
import { Camera, Crown, Sparkles } from 'lucide-react';
import Container from 'src/components/material/Container';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import SmoothScroll from 'src/components/SmoothScroll';
import useList from 'src/services/admin/manage/product/getList';

import { WeddingServiceCard } from './components/cardPopular';

function WeddingServicesShowcase() {
  const services = [
    {
      title: 'Chụp ảnh cưới trọn gói',
      description: 'Gói chụp ảnh cưới hoàn hảo với nhiều concept đa dạng, từ studio đến ngoại cảnh thiên nhiên tuyệt đẹp.',
      price: 15000000,
      originalPrice: 20000000,
      features: [
        '300+ ảnh chỉnh sửa chuyên nghiệp',
        'Album cưới cao cấp 30x40cm',
        'Chụp tại 3 địa điểm khác nhau',
        'Makeup & trang phục hỗ trợ',
        'Video highlight 3-5 phút',
        'Tặng kèm ảnh cưới 60x90cm',
      ],
      image: 'https://images.pexels.com/photos/574011/pexels-photo-574011.jpeg',
      isPopular: true,
      icon: <Camera className='w-5 h-5' />,
    },
    {
      title: 'Thuê váy cưới cao cấp',
      description: 'Bộ sưu tập váy cưới đẳng cấp từ các thương hiệu nổi tiếng, phù hợp với mọi phong cách và vóc dáng.',
      price: 3500000,
      originalPrice: 5000000,
      features: [
        'Váy cưới nhập khẩu cao cấp',
        'Tư vấn phong cách miễn phí',
        'Chỉnh sửa size theo yêu cầu',
        'Phụ kiện đi kèm (voan, găng tay)',
        'Giặt ủi chuyên nghiệp',
        'Bảo hiểm váy trong suốt sự kiện',
      ],
      image: 'https://images.pexels.com/photos/1683989/pexels-photo-1683989.jpeg',
      icon: <Crown className='w-5 h-5' />,
    },
    {
      title: 'Combo 3 váy cưới VIP',
      description: 'Gói combo đặc biệt với 3 bộ váy cưới khác nhau cho các nghi thức: lễ vu quy, lễ cưới và tiệc cưới.',
      price: 8500000,
      originalPrice: 12000000,
      features: [
        '3 váy cưới phong cách khác nhau',
        'Áo dài cưới truyền thống',
        'Váy cưới tây phong cách hiện đại',
        'Váy dạ hội sang trọng',
        'Phụ kiện đầy đủ cho từng bộ',
        'Makeup artist riêng trong ngày cưới',
        'Tư vấn phối đồ chuyên nghiệp',
      ],
      image: 'https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg',
      isPopular: true,
      icon: <Sparkles className='w-5 h-5' />,
    },
  ];

  const { data, isFetching } = useList({
    limit: 10,
    page: 1,
    isShowHomePage: true,
  });

  if (isFetching) {
    return <SpinnerCenter />;
  }

  console.log(data);

  return (
    <SmoothScroll>
      <Box
        sx={{
          backgroundColor: '#fdf2f8',
          paddingTop: '48px',
          paddingBottom: '48px',
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <Container maxWidth='lg'>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Typography variant='h1'>Dịch vụ cưới trọn gói</Typography>
            <Typography variant='body1'>
              Biến giấc mơ đám cưới của bạn thành hiện thực với các gói dịch vụ chuyên nghiệp, từ chụp ảnh cưới đến thuê váy cưới cao cấp.
            </Typography>
          </div>

          <Grid container spacing={3}>
            {data.map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <WeddingServiceCard
                  title={service.name}
                  description={service.description}
                  price={service.price as number}
                  originalPrice={service.originalPrice as number}
                  features={service.tags || []}
                  image={service.imagesList?.[0] || ''}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </SmoothScroll>
  );
}

export default WeddingServicesShowcase;
