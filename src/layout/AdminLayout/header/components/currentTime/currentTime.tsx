import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

const CurrentTime = () => {
  const [dt, setDt] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const secTimer = setInterval(() => {
      setDt(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Box
      sx={{
        fontWeight: 'bold',
      }}
    >
      {dt.toString()}
    </Box>
  );
};

export default CurrentTime;
