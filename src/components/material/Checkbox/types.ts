import { CheckboxProps, FormControlLabelProps, FormControlProps } from '@mui/material';
import React from 'react';

export type Props = CheckboxProps &
  Pick<FormControlLabelProps, 'onChange' | 'onBlur'> & {
    label?: string | React.ReactNode;
    error?: boolean;
    helperText?: React.ReactNode;
    controlProps?: Partial<FormControlProps>;
  };
