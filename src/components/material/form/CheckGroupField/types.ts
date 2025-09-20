import { Props as CheckGroupProps } from 'src/components/material/CheckGroup/types';

export type Props<E> = Omit<CheckGroupProps<E>, 'value'> & {
  name: string;
};
