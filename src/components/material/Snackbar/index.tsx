import { Box, Card, CardActions, IconButton, Typography } from '@mui/material';
import { SnackbarContent, useSnackbar, VariantType } from 'notistack';
import React, { forwardRef, useCallback } from 'react';
import { Icon } from 'src/components/icons';

const SnackMessage = forwardRef<
  HTMLDivElement,
  {
    id: string | number;
    message: string | React.ReactNode;
    variant: VariantType;
  }
>((props, ref) => {
  const { closeSnackbar } = useSnackbar();
  const { variant = 'default' } = props;

  const colors = {
    default: 'common.black',
    success: 'success.main',
    error: 'error.main',
    warning: 'warning.main',
    info: 'info.main',
  };

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id);
  }, [props.id, closeSnackbar]);

  const icons = {
    success: <Icon name='check' sx={{ color: 'common.white' }} />,
    default: <Icon name='check' sx={{ color: 'common.white' }} />,
    error: <Icon name='warning-circle' sx={{ color: 'common.white' }} />,
    warning: <Icon name='warning' sx={{ color: 'common.white' }} />,
    info: <Icon name='info-fill' sx={{ color: 'common.white' }} />,
  };

  return (
    <SnackbarContent ref={ref}>
      <Card
        sx={{
          width: '100%',
          backgroundColor: colors[variant],
          borderRadius: '4px',
        }}
      >
        <CardActions
          sx={{
            ':root': {
              padding: '8px 8px 8px 16px',
              justifyContent: 'space-between',
            },
          }}
        >
          <Box display='flex' width={1}>
            {icons[variant]}

            <Typography sx={{ color: 'common.white', mt: '2px' }} ml={1}>
              {props.message}
            </Typography>
          </Box>

          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton onClick={handleDismiss}>
              <Icon name='close' sx={{ color: 'common.white' }} />
            </IconButton>
          </Box>
        </CardActions>
      </Card>
    </SnackbarContent>
  );
});

export default SnackMessage;
