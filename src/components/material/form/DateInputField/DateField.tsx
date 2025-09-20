import { DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import DatePicker from 'src/components/material/DatePicker';

import { Props } from './types';

const DateInputField = <E extends unknown>(props: Props<E>) => {
  const { name, helperText, ...others } = props;

  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => (
        <DatePicker
          {...others}
          inputRef={ref}
          error={invalid}
          helperText={invalid ? error?.message || '' : helperText}
          value={value}
          onChange={(value: E | null, context: PickerChangeHandlerContext<DateValidationError>) => {
            onChange(value, context);
            props?.onChange && props.onChange(value, context);
          }}
          onBlur={onBlur}
        />
      )}
    />
  );
};

export default DateInputField;
