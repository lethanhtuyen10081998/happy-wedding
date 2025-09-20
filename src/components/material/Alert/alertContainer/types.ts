import { Dispatch, SetStateAction } from 'react';

import { Props as AlertDialogProps } from '../alertDialog/types';

export type AlertOptions = AlertDialogProps & {
  id: string;
};

export type AlertContainerHandler = {
  setAlertList: Dispatch<SetStateAction<AlertOptions[]>>;
};
