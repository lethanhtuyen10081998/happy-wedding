import { Box } from '@mui/material';
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';

export type FileUpload = File & {
  path?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  name?: string;
  size?: number;
  type?: string;
  src?: string;
};

export interface Props {
  multiple?: boolean;
  accept: Accept;
  maxLength: number;
  currentFileLength: number;
  message?: string;
  children?: React.ReactNode;
  onAddFile?(files: FileUpload[]): void;
  isValidMinimumSize?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
}

type CardCommentImpHandler = {
  onOpenFileUpload: () => void;
};

const Dropzone = forwardRef<CardCommentImpHandler, Props>((props, ref) => {
  const { children, multiple, accept, disabled, onAddFile = () => {}, width = '100%', height = '100%' } = props;
  const dropzoneRef: any = useRef();
  const [files, setFiles] = useState<FileUpload[]>([]);

  const handleDrop = useCallback(
    (chosenFiles: FileUpload[]) => {
      const result = files.concat(chosenFiles);
      onAddFile(result);
      setFiles([]);
    },
    [files, onAddFile],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept,
    multiple,
    noKeyboard: true,
    disabled,
  });

  const rootProps = getRootProps();

  useImperativeHandle(ref, () => ({
    onOpenFileUpload() {
      dropzoneRef?.current?.click();
    },
  }));

  return (
    <Box
      {...rootProps}
      itemRef={dropzoneRef}
      sx={{
        width: width,
        cursor: disabled ? 'not-allowed' : 'pointer',
        height: height,
      }}
    >
      <input {...getInputProps()} disabled={disabled} />

      {children}
    </Box>
  );
});

export default Dropzone;
