import { FormControl } from '@mui/material';
import * as React from 'react';
import { IMaskInput } from 'react-imask';

import TextField from '../TextField';
import { Props } from './types';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask='0000 000 000'
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

const PhoneNumberInput = (props: Props) => {
  return (
    <FormControl sx={{ mt: '0px' }} fullWidth>
      <TextField
        {...props}
        InputProps={{
          inputComponent: TextMaskCustom as any,
          ...props.InputProps,
        }}
      />
    </FormControl>
  );
};
export default PhoneNumberInput;
