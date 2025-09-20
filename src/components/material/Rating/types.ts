import { RatingProps } from '@mui/material';
import React from 'react';

export type Props = RatingProps & {
  error?: boolean;
  helperText?: string | React.ReactNode;
};
