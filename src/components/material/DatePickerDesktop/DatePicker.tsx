import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DATE_TIME_FORMAT_FIELD } from 'src/constants/date';

import FormHelperText from '../FormHelperText';
import { Props } from './types';
export * from './types';

const DatePickerComponent = <TDate extends unknown>(props: Props<TDate>) => {
  const { value, helperText, error, onChange = () => {} } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        onChange={onChange}
        value={value}
        disablePast={error}
        sx={{ width: '100%' }}
        format={DATE_TIME_FORMAT_FIELD}
        slotProps={{
          field: {
            clearable: true,
          },
          textField: {
            variant: 'standard',
          },
        }}
        {...props}
      />

      <FormHelperText error={error}>{helperText}</FormHelperText>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
