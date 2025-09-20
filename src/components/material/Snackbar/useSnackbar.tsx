import { OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar as useMessage } from 'notistack';

import SnackMessage from '.';

const useSnackbar = () => {
  const { enqueueSnackbar: showMessage } = useMessage();

  const enqueueSnackbar = (
    message: SnackbarMessage,
    options?: OptionsObject | undefined,
  ): SnackbarKey =>
    showMessage(message, {
      ...options,
      autoHideDuration: 3000,
      content: (key, value) => (
        <SnackMessage id={key} message={value} variant={options?.variant || 'default'} />
      ),
    });

  return { enqueueSnackbar };
};

export default useSnackbar;
