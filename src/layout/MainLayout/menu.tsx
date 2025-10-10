import MenuIcon from '@mui/icons-material/Menu';
import { ListItemIcon, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { unionBy } from 'lodash';
import { Crown } from 'lucide-react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Icon, IconTypes } from 'src/components/icons';
import Container from 'src/components/material/Container';
import NextLink from 'src/components/material/NextLink';
import { Routes } from 'src/constants/route';
import useListCategory from 'src/services/admin/settings/categories/getList';
import variables from 'src/themes/variables';

const drawerWidth = '100%';
type NavItem = {
  label: string;
  link: string;
  icon: IconTypes;
};
let navItems: NavItem[] = [
  {
    label: 'Trang chủ',
    link: Routes.HOME,
    icon: 'home',
  },
];

export default function DrawerAppBar() {
  const { t } = useTranslation('common');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const router = useRouter();
  const link = router.route;
  const { data } = useListCategory({
    limit: 100,
    page: 1,
  });

  const menuItems = data.filter((item) => item.isMenu);

  navItems = navItems.concat(
    menuItems.map((item) => ({
      label: item.name,
      link: `/dich-vu/${item.slug}`,
      icon: 'home',
    })),
  );

  navItems = unionBy(navItems, 'link');
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleRouterLink = (value: string) => {
    router.push(value);
    handleDrawerToggle();
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        height={60}
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 4,
          background: 'rgba(2,12,24)',
        }}
      >
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            borderRadius: '50%',
            width: 36,
            height: 36,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            ml: 'auto',
            color: 'common.white',
          }}
        >
          <Icon name='close' sx={{ fontSize: 32 }} />
        </IconButton>
      </Box>

      <List sx={{ mx: 6 }}>
        {navItems.map((item) => (
          <ListItem key={item.link} disablePadding onClick={() => handleRouterLink(item.link)}>
            <ListItemButton
              sx={{
                background: link === item.link ? 'white' : 'transparent',
                borderRadius: variables.borderRadius,
              }}
            >
              <ListItemIcon>
                <Icon
                  name={item.icon}
                  sx={{
                    color: link === item.link ? 'black' : 'white',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: link === item.link ? 'black' : 'white',
                }}
                primary={t(item.label)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  React.useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box position='relative'>
      {/* <AppBar
        component='nav'
        sx={{
          boxShadow: 'none',
          height: 40,
          backgroundColor: 'white',
          minHeight: 40,
          display: { xs: 'none', md: 'flex' },
        }}
      >
        <Container>
          <Toolbar
            sx={{
              justifyContent: 'end',
              height: 40,
              minHeight: '40px !important',
            }}
          >
            <Header />
          </Toolbar>
        </Container>
      </AppBar> */}

      <Box
        sx={{
          background: 'transparent',
          position: 'absolute',
          zIndex: 1000,
        }}
      >
        <AppBar
          component='nav'
          sx={{
            color: 'white',
            background: 'primary.main',
            boxShadow: 'none',
          }}
        >
          <Container
            sx={{
              color: 'black',
            }}
          >
            <Toolbar
              sx={{
                color: 'black',
                alignItems: 'center',
                height: scrolled
                  ? { xs: variables.menuHeightMobile, md: variables.menuHeightMobile }
                  : { xs: variables.menuHeightMobile, md: variables.menuHeightDesktop },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <Box
                sx={{
                  display: { md: 'none', xs: 'flex' },
                  width: 1,
                }}
              >
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  edge='start'
                  onClick={handleDrawerToggle}
                  sx={{
                    color: 'common.white',
                  }}
                >
                  <MenuIcon />
                </IconButton>

                <NextLink href='/'>
                  <Box ml='auto' display='flex' alignItems='center' gap={2} color='white'>
                    <Box mt='2px'>
                      <Crown size={24} />
                    </Box>
                    <Typography variant='h4' color='white' fontFamily='Atma'>
                      Happy Wedding
                    </Typography>
                  </Box>
                </NextLink>
              </Box>

              <NextLink href='/'>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, color: 'white', gap: 1 }}>
                  <Box mt='2px'>
                    <Crown size={24} />
                  </Box>
                  <Typography variant='h3' color='white' fontFamily='Atma'>
                    Happy Wedding
                  </Typography>
                </Box>
              </NextLink>

              <Box
                ml='auto'
                sx={{
                  display: { xs: 'none', sm: 'none', md: 'flex' },
                  gap: 5,
                }}
              >
                {navItems.map((item) => {
                  return (
                    <NextLink
                      key={item.link}
                      sx={{
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                      href={item.link}
                    >
                      {t(item.label)}
                    </NextLink>
                  );
                })}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <nav>
          <Drawer
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { sm: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                top: { sm: 0, md: variables.menuHeightDesktop },
                background: 'rgba(2,12,24,.9)',
              },

              '& .MuiBackdrop-root': {
                top: { sm: 0, md: variables.menuHeightDesktop },
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </Box>
  );
}
