import Box from '@mui/material/Box';
import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
  ratio?: number;
}

const AspectRatioBox: FC<Props> = ({ children, ratio = 1 }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          '& > *': { height: '100%', width: '100%' },
        }}
      >
        {children}
      </Box>
      <Box style={{ paddingBottom: (1 / ratio) * 100 + '%' }} />
    </Box>
  );
};

export default AspectRatioBox;
