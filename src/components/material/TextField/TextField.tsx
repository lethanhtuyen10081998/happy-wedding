import { FormControl, FormLabel } from '@mui/material';
import MaterialTextField from '@mui/material/TextField';
import useTranslation from 'next-translate/useTranslation';

import { Props } from './types';

export const TextField = (props: Props) => {
  const { t } = useTranslation();
  const { error, helperText, counter, label, ...others } = props;

  return (
    <FormControl fullWidth>
      {label && <FormLabel required={others.required}>{label}</FormLabel>}
      <MaterialTextField
        margin='normal'
        fullWidth
        error={error}
        sx={{
          ...props.sx,
          mt: label ? 0 : 0,
        }}
        helperText={t(helperText as string)}
        variant='outlined'
        {...others}
      />
    </FormControl>
  );
};

export default TextField;
