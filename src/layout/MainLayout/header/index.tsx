import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Icon } from 'src/components/icons';
import Button from 'src/components/material/Button';
import NextLink from 'src/components/material/NextLink';
import LanguageSwitcher from 'src/components/ui/LanguageSwitcher';
import { SPACING } from 'src/constants/grid';
import { Routes } from 'src/constants/route';
import { useProfileContext } from 'src/context/profileContext/hooksContext';
import useLogout from 'src/services/auth/logout';

const Header = () => {
  const { t } = useTranslation('authentication');
  const { profile } = useProfileContext();
  const { mutation } = useLogout();
  const router = useRouter();

  return (
    <Box display='flex' height={40} alignItems='center'>
      <Box display='flex' alignItems='center' gap={SPACING} ml='auto'>
        <Box display='flex' alignItems='center' gap={1}>
          <Icon name='support' />
          <Typography fontWeight='bold'>{t('common:support')}</Typography>
        </Box>

        <Stack direction='row' divider={<Divider orientation='horizontal' flexItem />} spacing={1} alignItems='center'>
          <NextLink href={Routes.PROFILE}>
            <Box display='flex' alignItems='center' gap={1}>
              <Avatar
                sx={{
                  height: 32,
                  width: 32,
                  background: (theme) => theme.palette.secondary.main,
                }}
              >
                {profile?.fullName?.charAt(0)}
              </Avatar>

              {profile?.fullName && (
                <Typography fontWeight='700'>
                  {t('common:hello', {
                    name: profile?.fullName,
                  })}
                </Typography>
              )}
            </Box>
          </NextLink>

          <Box display='flex' gap={2} alignItems='center'>
            {profile?.fullName && (
              <Box display='flex' gap={0} alignItems='center'>
                <Button variant='outlined' onClick={() => mutation()}>
                  {t('common:logout')}
                </Button>
              </Box>
            )}

            {!profile?.fullName && (
              <Box display='flex' gap={0} alignItems='center'>
                <Button onClick={() => router.push(Routes.SIGN_IN)}>{t('common:signIn')}</Button>
              </Box>
            )}
          </Box>
        </Stack>

        <Box>
          <LanguageSwitcher />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
