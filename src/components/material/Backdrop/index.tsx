import { Box, Backdrop as MuiBackdrop, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { SPACING } from 'src/constants/grid';
import { RootState } from 'src/redux/types';

import { Props } from './types';

const Backdrop = (props: Props) => {
  const spinnerReducer = useSelector((state: RootState) => state.spinnerReducer);

  if (!props.show && !spinnerReducer.show && spinnerReducer.showCount === 0) {
    return null;
  }

  return (
    <MuiBackdrop sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }} open>
      <Box display='grid' justifyContent='center' gap={SPACING}>
        <Box className='loader' m='auto' />
        <Box>
          <Typography sx={{ color: 'white' }}>{spinnerReducer.message}</Typography>
        </Box>
      </Box>
    </MuiBackdrop>
  );
};

export default Backdrop;
