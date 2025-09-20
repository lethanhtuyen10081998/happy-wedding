import { DialogProps } from '@mui/material';

export type ModalEditorProps = {
  isOpen: boolean;
  onClosed(): void;
  label: string;
  children: React.ReactNode;
  dialogProps?: Omit<DialogProps, 'open' | 'onClose'>;
};

export type DialogEditorProps = {
  label: string;
  loading?: boolean;
  children: React.ReactNode;
  dialogProps?: Omit<DialogProps, 'open' | 'onClose'>;
  onClose?: () => void;
};
