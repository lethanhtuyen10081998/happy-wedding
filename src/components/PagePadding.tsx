import { Box } from '@mui/material';
import React from 'react';
import variables from 'src/themes/variables';

interface PagePaddingProps {
  children: React.ReactNode;
}

const PagePadding: React.FC<PagePaddingProps> = ({ children }) => {
  return (
    <Box
      sx={{
        paddingTop: { xs: variables.menuHeightMobile, md: variables.paddingPage },
      }}
    >
      {children}
    </Box>
  );
};

export default PagePadding;
