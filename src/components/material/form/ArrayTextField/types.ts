import { TextFieldProps } from '@mui/material';
import { RefCallBack } from 'react-hook-form';

export type Props = Omit<TextFieldProps, 'label'> & {
  counter?: number;
  ref?: React.RefObject<HTMLDivElement> | null | RefCallBack;
  label?: React.ReactNode | string;
  name: string;
};
