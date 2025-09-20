import { CalendarMonth, MoreVert } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Chip, Grid, IconButton, Typography } from '@mui/material';
import { Icon } from 'src/components/icons';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import { DATE_FORMAT_VIEW } from 'src/constants/constants';
import { useProfileContext } from 'src/context/profileContext/hooksContext';
import { formatDateUTCtoLocalTimeView } from 'src/libs/date';
import { formatMoney } from 'src/libs/utils';
import useListTourOfUser from 'src/services/users/getListTourOfUser';

const pastTrips = [
  {
    id: 1,
    destination: 'Tokyo, Nhật Bản',
    image:
      'https://images.pexels.com/photos/31252467/pexels-photo-31252467/free-photo-of-c-nh-d-ng-ph-s-ng-d-ng-trung-tam-tokyo-nh-t-b-n.jpeg?auto=compress&cs=tinysrgb&w=800',
    startDate: '15/03/2023',
    endDate: '25/03/2023',
    duration: '10 ngày',
    description:
      'Chuyến du lịch tuyệt vời khám phá Tokyo, Kyoto và Osaka. Trải nghiệm văn hóa, ẩm thực và tham quan các địa điểm nổi tiếng như đền Meiji, chùa Kinkaku-ji và lâu đài Osaka.',
    highlights: ['Núi Phú Sĩ', 'Chùa Senso-ji', 'Khu phố Akihabara', 'Vườn Shinjuku Gyoen'],
    accommodation: 'APA Hotel Shinjuku Kabukicho Tower',
    transportation: 'Japan Rail Pass',
    expenses: '35,000,000 VND',
    rating: 5,
    photos: ['/placeholder.svg?height=200&width=200', '/placeholder.svg?height=200&width=200', '/placeholder.svg?height=200&width=200'],
  },
  {
    id: 2,
    destination: 'Paris, Pháp',
    image: 'https://images.pexels.com/photos/10012629/pexels-photo-10012629.jpeg?auto=compress&cs=tinysrgb&w=800',
    startDate: '10/06/2022',
    endDate: '20/06/2022',
    duration: '11 ngày',
    description:
      'Chuyến du lịch lãng mạn tại kinh đô ánh sáng Paris. Tham quan tháp Eiffel, bảo tàng Louvre, nhà thờ Notre-Dame và dạo bộ dọc sông Seine.',
    highlights: ['Tháp Eiffel', 'Bảo tàng Louvre', 'Khải Hoàn Môn', 'Nhà thờ Sacré-Cœur'],
    accommodation: 'Hôtel Mercure Paris Centre Tour Eiffel',
    transportation: 'Paris Visite travel pass',
    expenses: '40,000,000 VND',
    rating: 4,
    photos: ['/placeholder.svg?height=200&width=200', '/placeholder.svg?height=200&width=200', '/placeholder.svg?height=200&width=200'],
  },
  {
    id: 3,
    destination: 'Bali, Indonesia',
    image: 'https://images.pexels.com/photos/1544351/pexels-photo-1544351.jpeg?auto=compress&cs=tinysrgb&w=800',
    startDate: '05/12/2021',
    endDate: '15/12/2021',
    duration: '10 ngày',
    description:
      'Kỳ nghỉ thư giãn tại thiên đường nhiệt đới Bali. Tắm biển, khám phá đền Uluwatu, ruộng bậc thang Tegallalang và thưởng thức ẩm thực địa phương.',
    highlights: ['Đền Tanah Lot', 'Ruộng bậc thang Tegallalang', 'Ubud Monkey Forest', 'Bãi biển Kuta'],
    accommodation: 'The Kayon Resort Ubud',
    transportation: 'Xe máy thuê & Grab',
    expenses: '25,000,000 VND',
    rating: 5,
    photos: ['/placeholder.svg?height=200&width=200', '/placeholder.svg?height=200&width=200', '/placeholder.svg?height=200&width=200'],
  },
];

const Tour = () => {
  const { profile } = useProfileContext();
  const { data, isLoading } = useListTourOfUser({
    customerId: profile?.customerId!,
    deptNo: 'ND',
    limit: 10,
    page: 1,
  });

  if (isLoading) {
    return <SpinnerCenter />;
  }

  if (data?.data.total === 0) {
    return (
      <Typography variant='body1' textAlign='center' mt={2}>
        Không có dữ liệu
      </Typography>
    );
  }

  return data?.data.rows.map((trip) => (
    <Card key={trip.tourId} sx={{ mb: 2, mt: 2, overflow: 'hidden', boxShadow: 2 }}>
      <Grid container>
        <Grid item xs={12} md={4}>
          <CardMedia
            component='img'
            // eslint-disable-next-line max-len
            image='https://images.pexels.com/photos/31252467/pexels-photo-31252467/free-photo-of-c-nh-d-ng-ph-s-ng-d-ng-trung-tam-tokyo-nh-t-b-n.jpeg?auto=compress&cs=tinysrgb&w=800'
            alt={trip.destinationName}
            sx={{
              height: { xs: 200, md: 300 },
              minHeight: { md: 250 },
            }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typography variant='h5' fontWeight='bold' gutterBottom>
                {trip.destinationName}
              </Typography>
              <IconButton size='small'>
                <MoreVert />
              </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CalendarMonth fontSize='small' color='action' sx={{ mr: 1 }} />
              <Typography variant='body2' color='text.secondary'>
                {formatDateUTCtoLocalTimeView(trip.departureDate, DATE_FORMAT_VIEW)} -{' '}
                {formatDateUTCtoLocalTimeView(trip.returnDate, DATE_FORMAT_VIEW)} (5 Ngày)
              </Typography>
            </Box>

            <Typography variant='body2' paragraph>
              {trip.routeName}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant='subtitle2' fontWeight='bold' gutterBottom>
                Điểm nổi bật:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {pastTrips[0].highlights.map((highlight, index) => (
                  <Chip key={index} label={highlight} size='small' sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }} />
                ))}
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon name='money' sx={{ color: 'success.main' }} />
                  <Typography variant='body2' noWrap color='success.main' fontWeight='bold'>
                    {formatMoney(trip.adultPrice)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {pastTrips.map((trip) => (
                  <Box
                    key={trip.id}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Box component='img' src={trip.image} alt={trip.destination} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                ))}

                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer',
                  }}
                >
                  <Typography variant='body2'>+12</Typography>
                </Box>
              </Box>
              <Button variant='outlined' size='small'>
                Xem chi tiết
              </Button>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  ));
};

export default Tour;
