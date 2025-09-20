import { Box } from '@mui/material';
import React from 'react';

interface ScrollContentProps {
  children: React.ReactNode;
  maxHeight?: string | number;
  ref?: React.RefObject<HTMLDivElement>;
  height?: string | number;
}

const ScrollContent: React.FC<ScrollContentProps> = ({ children, maxHeight = '400px', ref, height = '400px' }) => {
  return (
    <Box
      ref={ref}
      sx={{
        overflowY: 'auto',
        maxHeight: maxHeight,
        pb: 0,
        height: height,
      }}
    >
      {children}
    </Box>
  );
};

export default ScrollContent;
