import TabContext from '@mui/lab/TabContext';
import { Box, Tabs, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import React from 'react';
import variables from 'src/themes/variables';

import TabPanel from './components/tabPanel';
import { Props } from './types';

const tabHeight = '42px';
const tabDetailHeight = '36px';

const tabHeightSmall = '40px';
const tabHeightSmallIndicator = '34px';
const tabDetailHeightSmall = '30px';

const ScrollableTabs = (props: Props) => {
  const { tabs, activeTab = 0, onChangeTab = () => {}, tabProps, paddingContent = 2, rightContent, size, backgroundColor = 'primary.main' } = props;
  const [value, setValue] = React.useState(activeTab);

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
    onChangeTab(tabs[newValue].value);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: 1,
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            width: 1,
            borderTopLeftRadius: variables.borderRadius,
            borderTopRightRadius: variables.borderRadius,
            py: '1px',
            backgroundColor,
            display: 'flex',
            height: size === 'small' ? tabHeightSmall : tabHeight,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              margin: '2px 2px',
              minHeight: size === 'small' ? tabDetailHeightSmall : tabDetailHeight,
              '& .MuiTab-root': {
                paddingRight: (theme) => theme.spacing(1),
                paddingLeft: (theme) => theme.spacing(1),
                marginLeft: (theme) => theme.spacing(0.5),
                marginRight: (theme) => theme.spacing(0.5),
                height: size === 'small' ? tabDetailHeightSmall : tabDetailHeight,
                '& .Mui-selected': {
                  background: 'white',
                },
              },
              '& .MuiTabs-indicator': {
                background: 'white',
                height: size === 'small' ? tabHeightSmallIndicator : tabDetailHeight,
                borderRadius: variables.borderRadius,
                opacity: 0.4,
              },
            }}
          >
            {tabs.map((item, index) => (
              <Tab
                sx={{
                  border: 'none',
                  backgroundColor,
                  color: 'white',
                  height: size === 'small' ? tabDetailHeightSmall : tabDetailHeight,
                  minHeight: size === 'small' ? tabDetailHeightSmall : tabDetailHeight,
                  borderTopLeftRadius: variables.borderRadius,
                  borderTopRightRadius: variables.borderRadius,
                  px: 0,
                }}
                key={item.label}
                label={
                  <Typography textTransform='none' sx={{ color: 'white', textTransform: 'uppercase' }}>
                    {item.label}
                  </Typography>
                }
                id={`scrollable-auto-tab-${index}`}
                aria-controls={`scrollable-auto-tabpanel-${index}`}
              />
            ))}
          </Tabs>

          {rightContent && (
            <Box ml='auto' px={2}>
              {rightContent}
            </Box>
          )}
        </Box>

        {tabs.map((tab, index) => (
          <TabPanel
            key={tab.value}
            value={index}
            index={index}
            props={{
              ...tabProps,
              sx: {
                width: 1,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              },
            }}
          >
            <Box sx={{ padding: paddingContent }}>{tab.component}</Box>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default ScrollableTabs;
