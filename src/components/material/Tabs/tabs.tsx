import { AppBar, Box, Tabs as MaterialTabs, Tab } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { initTabItem, TabItem, TabProps } from './types';

function a11yProps(index: any) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const Tabs = (tabProps: TabProps) => {
  const { tabs, children, onChange, classTabs } = tabProps;
  const { t } = useTranslation();

  const [value, setValue] = React.useState<TabItem>(initTabItem);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const tabSelected = tabs.find((_, index) => index === newValue) || initTabItem;
    setValue(tabSelected);
    onChange(tabSelected);
  };

  const renderTabs = () =>
    tabs.map((tab) => <Tab key={tab.value} label={t(tab.label)} {...a11yProps(tab.index)} />);

  return (
    <Box
      className={clsx(classTabs)}
      sx={{
        root: {
          borderRadius: 6,
          backgroundColor: (theme) => theme.palette.common.white,
        },
      }}
    >
      <AppBar position='static' component='div'>
        <MaterialTabs
          value={value.index}
          onChange={handleChange}
          aria-label='tabs'
          variant='scrollable'
          scrollButtons='auto'
          sx={{
            root: {
              margin: '8px 6px',
              minHeight: 42,
              '& .MuiTab-root': {
                position: 'relative',
                paddingRight: (theme) => theme.spacing(3),
                paddingLeft: (theme) => theme.spacing(3),
                marginLeft: (theme) => theme.spacing(0.5),
                marginRight: (theme) => theme.spacing(0.5),
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
          }}
        >
          {renderTabs()}
        </MaterialTabs>
      </AppBar>

      <Box p={3}>{children}</Box>
    </Box>
  );
};

export default Tabs;
