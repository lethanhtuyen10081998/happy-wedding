import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const Page404 = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <Typography sx={{ m: 'auto' }}>404| Page</Typography>
    </Box>
  );
};

export default Page404;
