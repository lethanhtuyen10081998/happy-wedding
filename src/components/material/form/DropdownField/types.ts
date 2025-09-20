import { Props as DropdownProps } from 'src/components/material/Dropdown';

export type Props<E> = DropdownProps<E> & {
  name: string;
};
