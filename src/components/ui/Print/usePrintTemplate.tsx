import { Box } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import useSpinner from 'src/hooks/useSpinner';

const debug = false;

export default function usePrintTemplate() {
  const printRef = useRef(null);
  const fileNameRef = useRef<string>();
  const delayRef = useRef(0);
  const callbackRef = useRef<(() => void) | null>(null);
  const { startLoading, hideLoading } = useSpinner();

  const [template, setTemplate] = useState<React.ReactNode | null>(null);

  const triggerPrint = useReactToPrint({
    get documentTitle() {
      return fileNameRef.current || '';
    },
    contentRef: printRef,
    onAfterPrint: () => {
      setTemplate(null);
      callbackRef.current?.();
      hideLoading();
    },
    onBeforePrint: () => {
      startLoading('Loading content print');
      return Promise.resolve(callbackRef.current?.());
    },
  });

  const handlePrint = useCallback(
    (
      reactNode: React.ReactNode,
      config?: {
        fileName?: string;
        delay?: number;
        callbackFn?(): void;
      },
    ) => {
      fileNameRef.current = config?.fileName;
      delayRef.current = config?.delay ?? 0;
      callbackRef.current = config?.callbackFn ?? null;
      setTemplate(reactNode);
    },
    [],
  );

  useEffect(() => {
    if (debug || !template) return;

    if (delayRef.current) {
      setTimeout(() => {
        triggerPrint?.();
      }, delayRef.current);
    } else {
      triggerPrint?.();
    }
  }, [template, triggerPrint]);

  const printContent = useMemo(
    () =>
      template ? (
        <Box
          {...{
            ref: printRef,
            displayPrint: 'block',
            color: 'black',
            background: 'white',
            fontSize: '11px !important',
          }}
        >
          <style
            media='print'
            dangerouslySetInnerHTML={{
              __html: 'body { margin: 0; }',
            }}
          />
          {template}
        </Box>
      ) : null,
    [template],
  );

  return {
    handlePrint,
    printContent,
  };
}
