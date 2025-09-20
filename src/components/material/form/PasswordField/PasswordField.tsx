import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';

import FormTextField, { Props as TextFieldProps } from '../FormTextField';

const PasswordField = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const InputAdornmentPwd = (
    <InputAdornment position='end'>
      <IconButton
        onClick={handleClickShowPassword}
        aria-label='toggle password visibility'
        edge='end'
      >
        {!showPassword ? (
          <Visibility sx={{ color: 'text.primary' }} />
        ) : (
          <VisibilityOff sx={{ color: 'text.primary' }} />
        )}
      </IconButton>
    </InputAdornment>
  );

  return (
    <FormTextField
      type={showPassword ? 'text' : 'password'}
      autoComplete='current-password'
      {...props}
      InputProps={{ endAdornment: InputAdornmentPwd, ...props.InputProps }}
    />
  );
};

export default PasswordField;
