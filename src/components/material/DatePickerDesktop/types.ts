import { SxProps } from '@mui/material';
import { DateValidationError } from '@mui/x-date-pickers';
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types';
import { MobileDatePickerProps } from '@mui/x-date-pickers/MobileDatePicker';
import { Noop } from 'react-hook-form';

export type Props<TDate> = Omit<
  MobileDatePickerProps<TDate>,
  'renderInput' | 'onChange' | 'value'
> & {
  onChange?(value: TDate | null, context: PickerChangeHandlerContext<DateValidationError>): void;
  value?: TDate | null;
  error?: boolean;
  helperText?: string;
  onBlur?: Noop;
  required?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  sx?: SxProps;
};
