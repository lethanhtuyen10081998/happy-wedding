import { Controller } from 'react-hook-form';
import CheckGroup from 'src/components/material/CheckGroup';

import { Props } from './types';

const CheckGroupField = <E extends unknown = string | number>(props: Props<E>) => {
  const { name, helperText, ...others } = props;

  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <CheckGroup
          {...others}
          value={value}
          error={invalid}
          helperText={invalid ? error?.message || '' : helperText}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  );
};

export default CheckGroupField;
