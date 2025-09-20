import { Box, FormControlLabel, Checkbox as MaterialCheckbox } from '@mui/material';

import FormHelperText from '../FormHelperText';
import { Props } from './types';

export default function Checkbox(props: Props) {
  const { label, checked, onChange, onBlur, error, helperText, controlProps, ...others } = props;

  const { sx, ...rest } = controlProps || {};

  return (
    <Box>
      <FormControlLabel
        control={
          <MaterialCheckbox
            onChange={onChange}
            checked={checked}
            onBlur={onBlur}
            {...others}
            color='primary'
          />
        }
        label={label ? label : ''}
      />
      <FormHelperText sx={{ mt: 1 }} error={error}>
        {helperText}
      </FormHelperText>
    </Box>
  );
}
