import { Box } from '@mui/material';
import { useProfileContext } from 'src/context/profileContext/hooksContext';

function ProfileView() {
  const { profile } = useProfileContext();

  if (!profile) {
    return null;
  }

  return (
    <Box py={1}>
      profile
      {/* <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        gap={!collapsible ? 2 : 0}
        sx={{
          overflow: 'hidden',
        }}
      >
        <Avatar alt='Administrator' src={profile?.profile.avatar} sx={{ background: (theme) => theme.palette.secondary.light }}>
          <Icon name='user-interface' />
        </Avatar>

        {!collapsible && (
          <Box>
            <Typography color='primary' fontWeight='bold' fontSize={12}>
              {profile?.profile.fullName}
            </Typography>
            <Typography fontSize={10}>{profile.profile.roleInfo?.roleName}</Typography>
          </Box>
        )}
      </Box> */}
    </Box>
  );
}

export default ProfileView;
