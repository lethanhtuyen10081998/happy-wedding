import { useImperativeHandle, useState } from 'react';
import { alertContainerRef } from 'src/helpers/alertUtil';

import AlertDialog from '../alertDialog';
import { AlertOptions } from './types';

const AlertContainer = () => {
  const [alertList, setAlertList] = useState<AlertOptions[]>([]);

  useImperativeHandle(
    alertContainerRef,
    () => ({
      setAlertList,
    }),
    [],
  );

  return (
    <>
      {alertList.map((al) => (
        <AlertDialog key={al.id} {...al} />
      ))}
    </>
  );
};

export default AlertContainer;
