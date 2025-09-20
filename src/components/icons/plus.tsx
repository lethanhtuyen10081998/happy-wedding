/* eslint-disable max-len */
import PlusOne from '@mui/icons-material/Add';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Plus = (props: SvgIconProps): JSX.Element => (
  <SvgIcon {...props}>
    <PlusOne />
  </SvgIcon>
);

export const PlusCircle = (props: SvgIconProps): JSX.Element => (
  <SvgIcon {...props}>
    <PlusOne />
  </SvgIcon>
);
