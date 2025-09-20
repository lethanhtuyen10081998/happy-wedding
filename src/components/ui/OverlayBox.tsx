import { Box } from '@mui/material';

import Spinner from '../material/Spinner';

const OverlayBox = ({ show }: { show: boolean }) => {
  if (!show) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <Box width={1} height={1} display='flex'>
        <Spinner
          sx={{
            margin: 'auto',
          }}
        />
      </Box>
    </Box>
  );
};

export default OverlayBox;
