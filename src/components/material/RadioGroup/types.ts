import {
  FormControlLabelProps,
  FormControlProps,
  InputLabelProps,
  RadioGroupProps,
} from '@mui/material';
import React from 'react';

export type Props<E> = RadioGroupProps & {
  controlProps?: Partial<FormControlProps>;
  radioControlProps?: Partial<FormControlProps>;
  labelProps?: Partial<InputLabelProps>;
  options: E[] | (() => Promise<E[]>);
  getItemLabel?: (e: E) => React.ReactNode;
  getItemValue?: (e: E) => string | number;
  itemProps?: (e: E) => Partial<FormControlLabelProps>;
  label?: string;
  error?: boolean;
  helperText?: React.ReactNode;
};
