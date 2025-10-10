import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { Icon } from 'src/components/icons';
import { PADDING } from 'src/constants/grid';
import { Routes } from 'src/constants/route';
import { DataContextProvider } from 'src/context/dataContext/provider';
import { FilterContextProvider } from 'src/context/filterContext/provider';
import { useCollapsible } from 'src/context/layoutContext/hooksContext';
import { LayoutContextProvider } from 'src/context/layoutContext/provider';
import { PermissionContextProvider } from 'src/context/permissionContext/provider';
import { useProfileContext } from 'src/context/profileContext/hooksContext';
import { ProfileContextProvider } from 'src/context/profileContext/provider';

import PublicLayout from '../PublicLayout/PublicLayout';
import Header from './header/header';
import { DrawerItemProps } from './navigation/components/drawerItem/types';
import Navigation from './navigation/navigation';

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

function ResponsiveDrawer(props: Props) {
  const collapsible = useCollapsible();
  const drawerWidth = collapsible ? 70 : 220;
  const { profile } = useProfileContext();
  console.log({ profile });

  let drawerItems: DrawerItemProps[] = [
    {
      icon: <Icon name='home' />,
      route: Routes.ADMIN_DASHBOARD,
      title: 'Dashboard',
      subItems: [
        {
          icon: <Icon name='list' />,
          route: Routes.ADMIN_DASHBOARD,
          title: 'Trang chủ',
        },
      ],
      isMenu: true,
    },
    {
      icon: <Icon name='home' />,
      route: Routes.ADMIN_MANAGE,
      title: 'Quản lý',
      subItems: [
        {
          icon: <Icon name='list' />,
          route: Routes.ADMIN_MANAGE_PRODUCTS,
          title: 'Sản phẩm',
        },
      ],
      isMenu: true,
    },
    {
      icon: <Icon name='home' />,
      route: Routes.ADMIN_SETTINGS,
      title: 'Cài đặt',
      subItems: [
        {
          icon: <Icon name='list' />,
          route: Routes.ADMIN_SETTINGS_CATEGORIES,
          title: 'Danh mục',
        },
      ],
      isMenu: true,
    },
  ];

  const { children } = props;

  if (!profile) {
    return <PublicLayout>{children}</PublicLayout>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        position='fixed'
        sx={{
          left: 0,
          width: { sm: `calc(100% - ${drawerWidth + 12}px)` },
          transition: 'width 0.3s ease-in-out, margin-left 0.3s ease-in-out',
          transform: 'translate3d(0, 0, 0)',
          ml: { sm: `${drawerWidth + 6}px` },
          background: '#eaeff1',
          zIndex: 1000,
        }}
      >
        <Box
          mt={1}
          sx={{
            backgroundColor: (theme) => theme.palette.common.white,
          }}
          component={Paper}
        >
          <Header />
        </Box>
      </Box>

      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label='mailbox folders'>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              pb: '48px',
            },
          }}
          open
        >
          <Navigation drawerItems={drawerItems} />
        </Drawer>
      </Box>
      <Box
        component='main'
        padding={PADDING}
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          background: '#eaeff1',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Box pt='10px' minHeight='calc(100vh - 60px)'>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

const AdminLayout = (props: Props) => {
  return (
    <PermissionContextProvider>
      <FilterContextProvider>
        <DataContextProvider>
          <ProfileContextProvider>
            <LayoutContextProvider>
              <ResponsiveDrawer {...props} />
            </LayoutContextProvider>
          </ProfileContextProvider>
        </DataContextProvider>
      </FilterContextProvider>
    </PermissionContextProvider>
  );
};

export default AdminLayout;
