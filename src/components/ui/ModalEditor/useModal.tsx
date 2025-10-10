import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { Icon } from 'src/components/icons';
import Dialog from 'src/components/material/Dialog';
import ScrollContent from 'src/components/ScrollContent';

import { DialogEditorProps, ModalEditorProps } from './types';

const ModalContent = ({ isOpen, onClosed, label, children, dialogProps }: ModalEditorProps) => {
  return (
    <Dialog fullWidth maxWidth='sm' open={isOpen} {...dialogProps} onClose={onClosed}>
      <AppBar sx={{ position: 'relative', height: 50 }}>
        <Toolbar>
          <IconButton edge='start' sx={{ color: 'white' }} onClick={onClosed} aria-label='close'>
            <Icon name='close' />
          </IconButton>
          <Typography color='white' sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            {label}
          </Typography>
        </Toolbar>
      </AppBar>

      <ScrollContent maxHeight='calc(100vh - 60px)' height='100%'>
        <Box>{children}</Box>
      </ScrollContent>
    </Dialog>
  );
};
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const Dialog = useMemo(
    () =>
      ({ label, children, dialogProps, onClose }: DialogEditorProps) => (
        <ModalContent
          label={label}
          onClosed={() => {
            close();
            onClose?.();
          }}
          isOpen={isOpen}
          dialogProps={dialogProps}
        >
          {children}
        </ModalContent>
      ),
    [close, isOpen],
  );

  return useMemo(
    () => ({
      isOpen,
      Dialog,
      open,
      close,
    }),
    [isOpen, Dialog, open, close],
  );
};
