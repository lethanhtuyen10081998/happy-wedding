import uniqueId from 'lodash/uniqueId';
import { createRef } from 'react';
import {
  AlertContainerHandler,
  AlertOptions,
} from 'src/components/material/Alert/alertContainer/types';
import { AlertResult } from 'src/components/material/Alert/alertDialog/types';

export const alertContainerRef = createRef<AlertContainerHandler>();

function show<D = any>(options: Omit<AlertOptions, 'id' | 'onResult' | 'open'>) {
  return new Promise<AlertResult<D>>((resolve) => {
    alertContainerRef.current?.setAlertList((prevList) => [
      ...prevList,
      {
        id: uniqueId('alert_'),
        onResult: resolve,
        ...options,
      },
    ]);
  });
}

export default {
  show,
};
