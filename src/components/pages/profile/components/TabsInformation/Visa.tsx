import { MoreVert } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Chip, Grid, IconButton, Typography } from '@mui/material';
import { Icon } from 'src/components/icons';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import { DATE_FORMAT_VIEW, DATE_TIME_FORMAT_VIEW } from 'src/constants/constants';
import { useProfileContext } from 'src/context/profileContext/hooksContext';
import { downloadFileByLink } from 'src/helpers/file';
import { formatDateUTCtoLocalTimeView } from 'src/libs/date';
import { formatMoney } from 'src/libs/utils';
import useListVisaOfUser from 'src/services/users/getListVisaOfUser';
import { RegistrationStatusLabel } from 'src/types/registrationTour';
import { getColorRegistration } from 'src/types/user';
import { VisaStatusLabel } from 'src/types/visa/type';

const Visa = () => {
  const { profile } = useProfileContext();
  const { data, isLoading } = useListVisaOfUser({
    customerId: profile?.customerId!,
    deptNo: 'VS',
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
    <Card key={trip.tourId} sx={{ mt: 2, borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
      <Grid container>
        <Grid item xs={12} md={12}>
          <CardContent sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box display='flex' alignItems='center' gap={1}>
                <Typography variant='h5' fontWeight='bold' gutterBottom mt='2px'>
                  {trip.routeName}
                </Typography>

                <Chip
                  label={
                    <Typography variant='body2' fontWeight='bold' color={getColorRegistration(trip.status)}>
                      {RegistrationStatusLabel[trip.status] || 'Không xác định'}
                    </Typography>
                  }
                  size='small'
                />
              </Box>
              <IconButton size='small'>
                <MoreVert />
              </IconButton>
            </Box>

            <Box display='flex' flexDirection='column' gap={1} mb={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon name='calendar' sx={{ color: 'text.secondary' }} />
                <Typography variant='body2' color='text.secondary'>
                  Ngày dăng ký: {formatDateUTCtoLocalTimeView(trip.createdTime, DATE_TIME_FORMAT_VIEW)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Icon name='calendar' sx={{ color: 'text.secondary' }} />
                <Typography variant='body2' color='text.secondary'>
                  Ngày nhận hồ sơ: {formatDateUTCtoLocalTimeView(trip.departureDate, DATE_FORMAT_VIEW)} - Ngày cần visa:{' '}
                  {formatDateUTCtoLocalTimeView(trip.returnDate, DATE_FORMAT_VIEW)}
                </Typography>
              </Box>

              <Box display='flex' alignItems='center' gap={1}>
                <Icon name='location' sx={{ color: 'text.secondary' }} />
                <Typography variant='body2' fontWeight='bold' color='text.secondary'>
                  {trip.destinationName}
                </Typography>
              </Box>
              <Box display='flex' alignItems='center' gap={1}>
                <Icon name='money' sx={{ color: 'text.secondary' }} />
                <Typography variant='body2' fontWeight='bold' color='success.main'>
                  {formatMoney(trip.adultPrice)}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <Chip
                  label={VisaStatusLabel[trip.visaStatus] || 'Không xác định'}
                  size='small'
                  sx={{ border: '1px solid', borderColor: 'secondary.light', color: 'secondary.main', backgroundColor: 'common.white' }}
                />
              </Box>
            </Box>

            {trip?.fileVisa && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={(e) => {
                    e.preventDefault();
                    downloadFileByLink(trip.fileVisa, trip.routeName);
                  }}
                >
                  Tải visa
                </Button>
              </Box>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  ));
};

export default Visa;
