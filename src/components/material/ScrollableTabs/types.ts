import { BoxProps } from '@mui/material';
import { ScreenName } from 'src/types/user';

export interface Props {
  tabs: Tab[];
  activeTab?: number;
  onChangeTab?(value?: string | number): void;
  tabProps?: BoxProps;
  paddingContent?: number;
  rightContent?: React.ReactNode;
  size?: 'small';
  backgroundColor?: string;
}

export interface Tab {
  label: string;
  component: React.ReactNode;
  value: string | number;
  screenName?: ScreenName;
}
