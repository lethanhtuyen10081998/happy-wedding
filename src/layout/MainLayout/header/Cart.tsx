import { Badge, Box, Typography } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { Icon } from 'src/components/icons';

const Cart = () => {
  const { t } = useTranslation('authentication');

  return (
    <Box display='flex' alignItems='center' gap={0.5}>
      <Badge badgeContent={5} color='secondary'>
        <Icon name='cart' />
      </Badge>

      <Typography fontWeight='bold' color='secondary'>
        {t('common:cart')}
      </Typography>
    </Box>
  );
};

export default Cart;
