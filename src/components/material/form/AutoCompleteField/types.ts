import { Props as AutocompleteProps } from 'src/components/material/AutoComplete';

export type Props<E> = AutocompleteProps<E> & {
  name: string;
};
