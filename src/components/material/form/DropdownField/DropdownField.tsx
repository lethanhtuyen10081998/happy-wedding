import { Controller } from 'react-hook-form';
import Dropdown from 'src/components/material/Dropdown';

import { Props } from './types';

const DropdownField = <E extends unknown = string | number>(props: Props<E>) => {
  const { name, helperText, onChange: onChangeProps = () => {}, ...others } = props;

  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => {
        return (
          <Dropdown
            {...others}
            inputRef={ref}
            error={invalid}
            helperText={invalid ? error?.message || '' : helperText}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              onChangeProps(e.target.value as any);
            }}
            onBlur={onBlur}
          />
        );
      }}
    />
  );
};

export default DropdownField;
