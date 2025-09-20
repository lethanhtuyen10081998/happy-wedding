import { Props as DatePickerProps } from 'src/components/material/DatePicker/types';

export type Props<TDate> = DatePickerProps<TDate> & {
  name: string;
};
