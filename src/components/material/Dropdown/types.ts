import { InputLabelProps, SelectProps } from '@mui/material';
import React from 'react';

export type Props<E> = SelectProps & {
  controlProps?: any;
  labelProps?: InputLabelProps;
  itemProps?: any;
  options: E[] | (() => Promise<E[]>);
  getItemLabel?: (e: E) => React.ReactNode;
  getItemValue?: (e: E) => string | number | E;
  error?: boolean;
  helperText?: React.ReactNode;
  onChange?: (value: any) => void;
};
