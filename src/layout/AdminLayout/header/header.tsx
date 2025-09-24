import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box, Grid, IconButton, Toolbar } from '@mui/material';
import LanguageSwitcher from 'src/components/ui/LanguageSwitcher';
import { SPACING } from 'src/constants/grid';
import { useCollapsible } from 'src/context/layoutContext/hooksContext';
import { useAPILayoutContext } from 'src/context/layoutContext/provider';

import Breadcrum from './components/Breadcrum';
import CurrentTime from './components/currentTime';
import ProfileMenu from './components/profileMenu';
import { HeaderProps } from './types';

function Header(_props: HeaderProps) {
  const { onSetCollapsible } = useAPILayoutContext();
  const collapsible = useCollapsible();
  const renderMenuButton = () => {
    const icon = (
      <IconButton
        sx={{
          backgroundColor: (theme) => theme.palette.common.white,
          color: (theme) => theme.palette.common.black,
        }}
        aria-label='Expaned Menu'
        onClick={() => onSetCollapsible(!collapsible)}
      >
        <MenuOpenIcon
          sx={{
            transition: (theme) => theme.transitions.create(['transform']),
          }}
        />
      </IconButton>
    );

    return icon;
  };

  return (
    <Toolbar
      sx={{
        position: 'relative',
        padding: 1,
      }}
    >
      <Grid container alignItems='center'>
        <Grid item xs>
          <Box display='flex' alignItems='center'>
            {renderMenuButton()}

            <Breadcrum />
          </Box>
        </Grid>
        <Grid item>
          <Box display='flex' alignItems='center' gap={SPACING}>
            <Box display='flex' alignItems='center'>
              <CurrentTime />
            </Box>
            <LanguageSwitcher />
            <ProfileMenu />
          </Box>
        </Grid>
      </Grid>
    </Toolbar>
  );
}

export default Header;
