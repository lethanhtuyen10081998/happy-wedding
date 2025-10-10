import { Box, MenuItem } from '@mui/material';
import React from 'react';

export const DropdownCategoryTitle = ({ children }: { children: React.ReactNode }) => {
  return <Box sx={{ p: 1 }}>{children}</Box>;
};

export const DropdownButton = React.forwardRef<
  HTMLButtonElement,
  {
    children: React.ReactNode;
    isActive?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
  }
>(function DropdownButtonInner({ children, isActive, onClick, disabled, className }, ref: any) {
  return (
    <MenuItem onClick={onClick} ref={ref} disabled={disabled}>
      {children}
    </MenuItem>
  );
});
