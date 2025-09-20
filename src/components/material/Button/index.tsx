import LoadingButton from '@mui/lab/LoadingButton';
import { Button as MaterialButton } from '@mui/material';

import { Props } from './types';

export default function Button(props: Props) {
  const { label, loading, ...others } = props;

  if (loading) {
    return (
      <LoadingButton variant='contained' loading loadingPosition='start' {...others}>
        {label ? label : props.children}
      </LoadingButton>
    );
  }

  return (
    <MaterialButton variant='contained' {...others}>
      {label ? label : props.children}
    </MaterialButton>
  );
}
