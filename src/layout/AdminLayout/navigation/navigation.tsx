import { Box, Divider, List, Typography } from '@mui/material';
import NextLink from 'src/components/material/NextLink';

import DrawerItem from './components/drawerItem/drawerItem';
import ProfileView from './components/ProfileView';
import { LayoutProps } from './types';

function Navigation(props: LayoutProps) {
  const { drawerItems } = props;

  return (
    <>
      <Box py={2.5} display='flex' alignItems='center' justifyContent='center'>
        <NextLink href='/'>
          <Box>
            <Typography variant='h6'>Happy Wedding</Typography>
          </Box>
        </NextLink>
      </Box>
      <Box px={1}>
        <Divider />
      </Box>

      <NextLink href='/profile'>
        <ProfileView />
      </NextLink>

      <Box px={1}>
        <Divider />
      </Box>

      <Box px={1}>
        <List>
          {drawerItems.map((item) => (
            <DrawerItem key={item.title} {...item} />
          ))}
        </List>
      </Box>
    </>
  );
}

export default Navigation;
