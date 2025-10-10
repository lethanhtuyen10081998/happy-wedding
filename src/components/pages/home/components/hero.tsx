import { Box, Container, Grid, Typography } from '@mui/material';
import Button from 'src/components/material/Button';
import SmoothScroll from 'src/components/SmoothScroll';
import variables from 'src/themes/variables';

export default function HeroComponent() {
  return (
    <Box
      sx={{
        height: { xs: '50vh', md: `calc(80vh - ${variables.paddingPage})` },
        backgroundImage: 'url(https://images.pexels.com/photos/33937926/pexels-photo-33937926.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Container maxWidth='lg'>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={12} md={8}>
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
                  Happy wedding - Studio
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
                  Trải nghiệm những dịch vụ cưới đáng nhớ với dịch vụ cao cấp và trọn gói từ Happy wedding - Studio
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button
                    variant='contained'
                    size='large'
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    Khám phá ngay
                  </Button>
                  {/* <Button
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
                  </Button> */}
                </Box>
              </Box>
            </SmoothScroll>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
