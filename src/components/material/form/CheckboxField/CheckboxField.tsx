import { Controller } from 'react-hook-form';
import Checkbox from 'src/components/material/Checkbox';

import { Props } from './types';

const CheckboxField = (props: Props) => {
  const { name, helperText, onChange: onChangeProps = () => {}, ...others } = props;

  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <Checkbox
          {...others}
          checked={value}
          error={invalid}
          helperText={invalid ? error?.message || '' : helperText}
          onChange={(e, checked) => {
            onChange(e, checked);
            onChangeProps(e, checked);
          }}
          onBlur={onBlur}
        />
      )}
    />
  );
};

export default CheckboxField;
