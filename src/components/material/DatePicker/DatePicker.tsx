import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DATE_FORMAT_FIELD } from 'src/constants/constants';

import FormHelperText from '../FormHelperText';
import { Props } from './types';
export * from './types';

const DatePickerComponent = <TDate extends Date>({ value, helperText, error, onChange, ...props }: Props<TDate>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} localeText={{}}>
      <DatePicker<TDate> onChange={onChange} value={value} sx={{ width: '100%' }} format={DATE_FORMAT_FIELD} {...props} />
      {error && helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
