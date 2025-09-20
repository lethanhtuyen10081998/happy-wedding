import { createStyles, makeStyles } from '@mui/material';

export default makeStyles(() =>
  createStyles({
    backdrop: {
      zIndex: 1000,
      color: 'white',
      textAlign: 'center',
    },
    message: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
  }),
);
