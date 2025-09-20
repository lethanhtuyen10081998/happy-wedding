import DialogMaterial, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import React, { FC, ReactNode } from 'react';
import { Icon } from 'src/components/icons';

export type Props = Omit<DialogProps, 'title'> & {
  open: boolean;
  title?: React.ReactNode;
  footer?: ReactNode;
  onClose(): void;
};

const Dialog: FC<Props> = ({
  title,
  onClose = () => {},
  open = false,
  footer,
  children,
  ...others
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <DialogMaterial open={open} onClose={handleClose} {...others}>
      {title && (
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Typography variant='h3'>{title}</Typography>
          <IconButton sx={{ ml: 'auto' }} onClick={handleClose}>
            <Icon name='close' />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent sx={{ p: 0 }}>{children}</DialogContent>

      {footer && <DialogActions sx={{ padding: '0px 40px 24px 40px' }}>{footer}</DialogActions>}
    </DialogMaterial>
  );
};

export default Dialog;
