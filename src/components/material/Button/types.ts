import { ButtonProps } from '@mui/material';

export type Props = ButtonProps & {
  label?: string;
  loading?: boolean;
};
