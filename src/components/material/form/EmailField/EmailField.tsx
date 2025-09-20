import { TextFieldProps } from '@mui/material';

import FormTextField from '../FormTextField';

const EmailField = (props: TextFieldProps) => {
  return <FormTextField id='email' name='email' autoComplete='email' {...props} />;
};

export default EmailField;
