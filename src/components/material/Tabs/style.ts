import { createStyles, makeStyles } from '@mui/material';

export default makeStyles(() =>
  createStyles({
    root: {
      borderRadius: 6,
      // boxShadow: theme.variables.boxShadownDefault,
      // backgroundColor: theme.palette.common.white,
      backgroundColor: 'common.white',
    },
    appBar: {
      width: 'auto',
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 3,
      transform: 'translateY(-50%)',
      marginTop: 59,
      marginBottom: -29,
      background: `linear-gradient(227.14deg, primary.main 0%, primary.light 100%)`,
    },
    appBarCustomer: {
      // background: theme.colors.tabCustomerColor,
    },
    tabs: {
      margin: '8px 6px',
      minHeight: 42,
      '& .MuiTab-root': {
        position: 'relative',
        // paddingRight: theme.spacing(3),
        // paddingLeft: theme.spacing(3),
        // marginLeft: theme.spacing(0.5),
        // marginRight: theme.spacing(0.5),
        minWidth: 95,
        minHeight: 42,
        textTransform: 'uppercase',
        zIndex: 5,
      },
      '& .MuiTabs-indicator': {
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.2)',
        height: '100%',
      },
    },
  }),
);
