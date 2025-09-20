import { Controller } from 'react-hook-form';

import NumberInput from '../../NumberInput';
import { Props } from './types';

const NumberField = (props: Props) => {
  const { name, helperText, ...others } = props;

  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => {
        return (
          <NumberInput
            {...others}
            ref={ref}
            error={invalid || others.error}
            helperText={invalid ? error?.message || '' : helperText}
            value={value || ''}
            onChange={(e) => {
              onChange(e);
              others.onChange?.(e);
            }}
            onBlur={onBlur}
          />
        );
      }}
    />
  );
};

export default NumberField;
