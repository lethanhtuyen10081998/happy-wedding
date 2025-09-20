import MuiTabPanel from '@mui/lab/TabPanel';
import Box, { BoxProps } from '@mui/material/Box';
import React from 'react';

export interface Props {
  index: number;
  value: string | number;
  children?: React.ReactNode;
  props?: BoxProps;
}

const TabPanel = (props: Props) => {
  const { children, value, index, ...other } = props;
  return (
    <MuiTabPanel
      value={value}
      role='tabpanel'
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      sx={{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        padding: 0,
      }}
    >
      <Box
        {...other.props}
        sx={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          padding: 0,
        }}
      >
        {children}
      </Box>
    </MuiTabPanel>
  );
};

export default TabPanel;
