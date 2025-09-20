import { Box } from '@mui/material';

import Spinner from '.';
import { Props } from './types';

const SpinnerCenter = (props: Props) => {
  return (
    <Box display='flex' justifyContent='center' py={1}>
      <Spinner {...props} />
    </Box>
  );
};

export default SpinnerCenter;
