import { FormControl } from '@mui/material';
import MaterialTextField from '@mui/material/TextField';
import useTranslation from 'next-translate/useTranslation';

import { Props } from './types';

export const TextField = (props: Props) => {
  const { t } = useTranslation();
  const { error, helperText, counter, ...others } = props;

  return (
    <FormControl fullWidth>
      <MaterialTextField
        margin='normal'
        fullWidth
        error={error}
        sx={{
          ...props.sx,
        }}
        helperText={t(helperText as string)}
        variant='outlined'
        {...others}
      />
    </FormControl>
  );
};

export default TextField;
