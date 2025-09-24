import { ComponentProps } from 'react';

import DrawerItem from './components/drawerItem/drawerItem';

export type DrawerItemData = ComponentProps<typeof DrawerItem>;

export type LayoutProps = {
  drawerItems: DrawerItemData[];
};
