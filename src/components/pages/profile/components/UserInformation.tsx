import { CalendarMonth, Facebook, Instagram, Language, LinkedIn, LocationOn, Twitter } from '@mui/icons-material';
import { Box, Button, Chip, Divider, IconButton, Typography } from '@mui/material';
import { useProfileContext } from 'src/context/profileContext/hooksContext';
import { formatDateUTCtoLocalTimeView } from 'src/libs/date';
const UserInformation = () => {
  const friends = [
    { id: 1, name: 'Nguyễn Văn A', avatar: '/placeholder.svg?height=50&width=50', mutualFriends: 12 },
    { id: 2, name: 'Trần Thị B', avatar: '/placeholder.svg?height=50&width=50', mutualFriends: 8 },
    { id: 3, name: 'Lê Văn C', avatar: '/placeholder.svg?height=50&width=50', mutualFriends: 5 },
    { id: 4, name: 'Phạm Thị D', avatar: '/placeholder.svg?height=50&width=50', mutualFriends: 3 },
    { id: 5, name: 'Hoàng Văn E', avatar: '/placeholder.svg?height=50&width=50', mutualFriends: 7 },
    { id: 6, name: 'Đỗ Thị F', avatar: '/placeholder.svg?height=50&width=50', mutualFriends: 2 },
  ];

  const { profile } = useProfileContext();

  return (
    <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 4 }}>
      <Typography variant='h4' fontWeight='bold' gutterBottom>
        {profile?.fullName}
      </Typography>
      <Typography variant='body1' color='text.secondary' gutterBottom>
        Travel Blogger | Photographer | Food Lover
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' },
          mt: 1,
          mb: 2,
        }}
      >
        {profile?.address && (
          <>
            <LocationOn fontSize='small' color='action' />
            <Typography variant='body2' color='text.secondary' sx={{ ml: 0.5, mr: 2 }}>
              {profile?.address}
            </Typography>
          </>
        )}

        {profile?.createdTime && (
          <>
            <CalendarMonth fontSize='small' color='action' />
            <Typography variant='body2' color='text.secondary' sx={{ ml: 0.5 }}>
              Tham gia từ {formatDateUTCtoLocalTimeView(profile?.createdTime, 'dd-MM-yyyy')}
            </Typography>
          </>
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'space-between' },
          mb: 3,
        }}
      >
        <Box sx={{ textAlign: 'center', px: 2 }}>
          <Typography variant='h6' fontWeight='bold'>
            254
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Số tour đã đi
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', px: 2 }}>
          <Typography variant='h6' fontWeight='bold'>
            0
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Điểm
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', px: 2 }}>
          <Typography variant='h6' fontWeight='bold'>
            348
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Xếp hạng
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant='body1' paragraph>
        Xin chào! Tôi là {profile?.fullName}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'flex-start' },
          mt: 2,
          mb: 3,
        }}
      >
        <IconButton color='primary'>
          <Language />
        </IconButton>
        <IconButton sx={{ color: '#E1306C' }}>
          <Instagram />
        </IconButton>
        <IconButton sx={{ color: '#1DA1F2' }}>
          <Twitter />
        </IconButton>
        <IconButton sx={{ color: '#4267B2' }}>
          <Facebook />
        </IconButton>
        <IconButton sx={{ color: '#0077B5' }}>
          <LinkedIn />
        </IconButton>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant='h6' gutterBottom>
        Sở thích
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        <Chip label='Du lịch' color='primary' variant='outlined' />
        <Chip label='Nhiếp ảnh' color='primary' variant='outlined' />
        <Chip label='Ẩm thực' color='primary' variant='outlined' />
        <Chip label='Đọc sách' color='primary' variant='outlined' />
        <Chip label='Yoga' color='primary' variant='outlined' />
        <Chip label='Cà phê' color='primary' variant='outlined' />
      </Box>

      {/* <Typography variant='h6' gutterBottom>
        Người từng chung hành trình ({friends.length})
      </Typography>
      <Grid container spacing={1}>
        {friends.map((friend) => (
          <Grid item xs={4} key={friend.id}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Avatar src={friend.avatar} sx={{ width: 60, height: 60, mx: 'auto', mb: 1 }} />
              <Typography variant='body2' noWrap>
                {friend.name}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {friend.mutualFriends} bạn chung
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid> */}
      <Button variant='text' fullWidth sx={{ mt: 1 }}>
        Xem tất cả bạn bè
      </Button>
    </Box>
  );
};

export default UserInformation;
