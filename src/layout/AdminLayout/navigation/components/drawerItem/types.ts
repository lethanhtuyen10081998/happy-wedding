import { ReactNode } from 'react';

export type DrawerItemProps = {
  title: string;
  icon: ReactNode;
  showDivider?: boolean;
  route?: string;
  module?: string;
  subItems: Array<{
    title: string;
    icon?: ReactNode;
    route: string;
    module?: string;
  }>;
  isMenu?: boolean;
};
