// import PersonIcon from "@mui/icons-material/Person";
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import { Icon } from 'src/components/icons';
import { Routes } from 'src/constants/route';
import useLogout from 'src/services/auth/logout';

export default function LongMenu() {
  const { mutation } = useLogout();
  const router = useRouter();

  const handleClick = () => {
    mutation().then(() => {
      router.push(Routes.ADMIN_SIGN_IN);
    });
  };

  return (
    <Box display='flex' alignItems='center' gap={3}>
      <IconButton
        aria-label='more'
        id='long-button'
        aria-haspopup='true'
        color='inherit'
        onClick={handleClick}
        sx={{ background: (theme) => theme.palette.background.paper }}
      >
        <Icon name='logout' />
      </IconButton>
    </Box>
  );
}
