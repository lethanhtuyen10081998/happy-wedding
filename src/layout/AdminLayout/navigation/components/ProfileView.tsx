import { Avatar, Box, Typography } from '@mui/material';
import { Icon } from 'src/components/icons';
import { useCollapsible } from 'src/context/layoutContext/hooksContext';
import { useProfileContext } from 'src/context/profileContext/hooksContext';

function ProfileView() {
  const { profile } = useProfileContext();
  const collapsible = useCollapsible();

  if (!profile) {
    return null;
  }

  return (
    <Box py={1}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        gap={!collapsible ? 2 : 0}
        sx={{
          overflow: 'hidden',
        }}
      >
        <Avatar alt='Administrator' sx={{ background: (theme) => theme.palette.secondary.light }}>
          <Icon name='user-interface' />
        </Avatar>

        {!collapsible && (
          <Box>
            <Typography color='primary' fontWeight='bold' fontSize={12}>
              {profile?.fullName}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProfileView;
