import { Box } from '@mui/material';
import { Routes } from 'src/constants/route';

import { Icon } from '../icons';
import NextLink from '../material/NextLink';

const ViewMore = () => {
  return (
    <Box display='flex' gap={1}>
      <Icon name='view-all' />
      <NextLink href={Routes.PRODUCTS}>Xem tất cả</NextLink>
    </Box>
  );
};

export default ViewMore;
