import { KeyboardArrowUp } from '@mui/icons-material';
import { Fab } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useMemo } from 'react';
import { CartContextProvider } from 'src/context/cartContext/provider';

import Bottom from './bottom';
import Menu from './menu';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const chilrenComponent = useMemo(() => {
    return children;
  }, [children]);

  return (
    <CartContextProvider>
      <Box position='relative'>
        <Box width={1}>
          <Menu />
        </Box>

        <Box>{chilrenComponent}</Box>

        <Box position='fixed' bottom={82} right={24}>
          {/* <NextLink href={Routes.PROFILE}>
              <IconButton size='large' sx={{ backgroundColor: 'secondary.main', color: 'white' }}>
                <Icon name='ai' />
              </IconButton>
            </NextLink> */}
        </Box>

        {/* Scroll to top button */}
        <Fab
          color='primary'
          size='medium'
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            backgroundColor: 'primary.main',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <KeyboardArrowUp />
        </Fab>

        <Bottom />
      </Box>
    </CartContextProvider>
  );
};

export default MainLayout;
