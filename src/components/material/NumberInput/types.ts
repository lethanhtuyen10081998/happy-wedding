import { TextFieldProps } from '@mui/material';
import { RefCallBack } from 'react-hook-form';
import { IMaskInputProps } from 'react-imask/dist/mixin';

export type Props = TextFieldProps &
  IMaskInputProps & {
    counter?: number;
    ref?: React.RefObject<HTMLDivElement> | null | RefCallBack;
  } & { sizeField?: 'small' | 'medium' };
