import { KeyboardArrowUp } from '@mui/icons-material';
import { Fab, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useMemo } from 'react';
import { Icon } from 'src/components/icons';
import NextLink from 'src/components/material/NextLink';
import { Routes } from 'src/constants/route';
import { CartContextProvider } from 'src/context/cartContext/provider';
import { ProfileContextProvider } from 'src/context/profileContext/provider';

import Bottom from './bottom';
import Menu from './menu';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const chilrenComponent = useMemo(() => {
    return children;
  }, [children]);

  return (
    <ProfileContextProvider>
      <CartContextProvider>
        <Box position='relative'>
          <Box width={1}>
            <Menu />
          </Box>

          <Box>{chilrenComponent}</Box>

          <Box position='fixed' bottom={82} right={24}>
            <NextLink href={Routes.AI_AGENT}>
              <IconButton size='large' sx={{ backgroundColor: 'secondary.main', color: 'white' }}>
                <Icon name='ai' />
              </IconButton>
            </NextLink>
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
    </ProfileContextProvider>
  );
};

export default MainLayout;
