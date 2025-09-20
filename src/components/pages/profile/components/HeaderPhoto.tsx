import { PhotoCamera, Settings } from '@mui/icons-material';
import { Avatar, Box, CardMedia, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Images } from 'src/constants/images';

const HeaderPhoto = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 200, md: 300 },
        borderRadius: 2,
        mb: { xs: 8, md: 10 },
        boxShadow: 3,
      }}
    >
      <CardMedia
        component='img'
        image={Images.PROFILE_BG}
        alt='Cover Photo'
        sx={{
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <IconButton
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          bgcolor: 'common.white',
        }}
      >
        <PhotoCamera />
      </IconButton>

      {/* Action Buttons for Desktop */}
      {!isMobile && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 50,
            display: 'flex',
            gap: 1,
          }}
        >
          <IconButton sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'common.white' } }}>
            <Settings />
          </IconButton>
        </Box>
      )}

      <Avatar
        src={Images.PROFILE_BG}
        sx={{
          position: 'absolute',
          bottom: { xs: -60, md: -70 },
          left: { xs: '50%', md: 32 },
          transform: { xs: 'translateX(-50%)', md: 'none' },
          width: { xs: 120, md: 150 },
          height: { xs: 120, md: 150 },
          border: '5px solid white',
          boxShadow: 2,
        }}
      />
    </Box>
  );
};

export default HeaderPhoto;
