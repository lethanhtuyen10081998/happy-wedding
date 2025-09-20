import { Controller } from 'react-hook-form';
import RadioGroup from 'src/components/material/RadioGroup';

import { Props } from './types';

const RadioGroupField = <E extends unknown = string | number>(props: Props<E>) => {
  const { name, helperText, onChange: onChangeProps, ...others } = props;

  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <RadioGroup
          {...others}
          value={value}
          error={invalid}
          helperText={invalid ? error?.message || '' : helperText}
          onChange={(e, val) => {
            onChange(e);
            onChangeProps?.(e, val);
          }}
          onBlur={onBlur}
        />
      )}
    />
  );
};

export default RadioGroupField;
