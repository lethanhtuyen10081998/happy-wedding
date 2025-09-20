import { Box, FormHelperText } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useCallback, useState } from 'react';
import { SPACING } from 'src/constants/grid';

import Button from '../../Button';
import Dialog from '../../Dialog';
import { AlertAction, Props } from './types';

const AlertDialog = (props: Props) => {
  const {
    title,
    description,
    content,
    onResult,
    validate,
    yesNo = false,
    showCancelButton = true,
    confirmButtonText = yesNo ? 'common:yes' : 'common:ok',
    cancelButtonText = yesNo ? 'common:no' : 'common:cancel',
    fullWidth = true,
  } = props;

  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const submit = useCallback(
    async (action: AlertAction) => {
      if (action === AlertAction.CANCEL || action === AlertAction.CLOSE) {
        setOpen(false);
        onResult?.({ action });
      } else {
        try {
          const data = await validate?.();
          setOpen(false);
          setErrorMsg('');
          onResult?.({ action, data });
        } catch (error: any) {
          setErrorMsg(error.message);
        }
      }
    },
    [onResult, validate],
  );

  const handleClose = useCallback(() => submit(AlertAction.CLOSE), [submit]);
  const handleCancel = useCallback(() => submit(AlertAction.CANCEL), [submit]);

  return (
    <Dialog
      maxWidth='xs'
      fullWidth
      open={open}
      onClose={handleClose}
      footer={
        <Box display='flex' gap={SPACING} mt={2}>
          {showCancelButton && (
            <Box>
              <Button fullWidth={fullWidth} variant='text' onClick={handleCancel}>
                {t(cancelButtonText)}
              </Button>
            </Box>
          )}

          <Box>
            <Button
              variant='contained'
              fullWidth={fullWidth}
              onClick={() => submit(AlertAction.CONFIRM)}
              color='error'
            >
              {t(confirmButtonText)}
            </Button>
          </Box>
        </Box>
      }
      title={title}
    >
      {description && <Box sx={{ padding: 0, textAlign: 'center' }}>{description}</Box>}

      {!!content && (
        <Box mx={3} mb={2}>
          {content}
        </Box>
      )}

      {!!errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </Dialog>
  );
};

export default AlertDialog;
