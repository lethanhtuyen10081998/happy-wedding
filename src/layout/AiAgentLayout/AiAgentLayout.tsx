import { Box } from '@mui/material';
import React from 'react';

const AiAgentLayout = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <Box sx={{ position: 'relative' }} width='100%' height='100%'>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  </Box>
);

export default AiAgentLayout;
