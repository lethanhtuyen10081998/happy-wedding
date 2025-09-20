import { SliderProps } from '@mui/material';
import React from 'react';

export type Props = SliderProps & {
  error?: boolean;
  helperText?: string | React.ReactNode;
};
