import { Controller } from 'react-hook-form';

import PhoneNumberInput from '../../PhoneNumberInput';
import { Props } from './types';

const PhoneNumberField = (props: Props) => {
  const { name, helperText, ...others } = props;

  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => {
        return (
          <PhoneNumberInput
            {...others}
            ref={ref}
            error={invalid || others.error}
            helperText={invalid ? error?.message || '' : helperText}
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
          />
        );
      }}
    />
  );
};

export default PhoneNumberField;
