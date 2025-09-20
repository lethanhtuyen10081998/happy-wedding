import {
  AutocompleteProps,
  ChipProps,
  FormControlProps,
  InputLabelProps,
  InputProps,
} from '@mui/material';
import React from 'react';

export type Props<E> = Omit<
  AutocompleteProps<E, boolean | undefined, boolean | undefined, ChipProps<any, any>>,
  'renderInput'
> & {
  controlProps?: Partial<FormControlProps>;
  labelProps?: InputLabelProps;
  itemProps?: any;
  options: E[];
  getItemLabel?: (e: E) => React.ReactNode;
  getItemValue?: (e: E) => string | number | E;
  error?: boolean;
  helperText?: React.ReactNode;
  label?: React.ReactNode;
  required?: boolean;
  InputProps?: InputProps;
  onChange?(e: any, value: E | NonNullable<string | E> | (string | E)[] | null): void;
};
