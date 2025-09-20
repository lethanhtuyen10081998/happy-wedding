import { Controller } from 'react-hook-form';
import AutoComplete from 'src/components/material/AutoComplete';

import { Props } from './types';

const AutoCompleteField = <E extends unknown = string | number>(props: Props<E>) => {
  const { name, helperText, onChange: onChangeProps = () => {}, ...others } = props;

  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => {
        return (
          <AutoComplete
            {...others}
            error={invalid}
            helperText={invalid ? error?.message || '' : helperText}
            value={value}
            onChange={(_e, newVal) => {
              onChangeProps(_e, newVal);

              onChange(newVal);
            }}
            onBlur={onBlur}
          />
        );
      }}
    />
  );
};

export default AutoCompleteField;
