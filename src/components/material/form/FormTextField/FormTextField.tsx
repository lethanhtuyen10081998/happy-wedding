import { Controller } from 'react-hook-form';
import TextField from 'src/components/material/TextField';

import { Props } from './types';

const FormTextField = (props: Props) => {
  const { name, helperText, onChange: onChangeProps = () => {}, ...others } = props;

  return (
    <Controller
      name={name}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { invalid, error } }) => {
        return (
          <TextField
            {...others}
            inputRef={ref}
            error={invalid || others.error}
            helperText={invalid ? error?.message || '' : helperText}
            value={value || ''}
            onChange={(e) => {
              onChange(e);
              onChangeProps(e);
            }}
            onBlur={onBlur}
          />
        );
      }}
    />
  );
};

export default FormTextField;
