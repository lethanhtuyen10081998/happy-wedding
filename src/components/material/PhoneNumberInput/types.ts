import { TextFieldProps } from '@mui/material';
import { RefCallBack } from 'react-hook-form';

export type Props = TextFieldProps & {
  counter?: number;
  ref?: React.RefObject<HTMLDivElement> | null | RefCallBack;
};
