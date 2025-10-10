import { Box, Popover } from '@mui/material';
import { icons } from 'lucide-react';
import { forwardRef, useState } from 'react';

import { Surface } from './Surface';
import { Toolbar } from './Toolbar';

export type MenuProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  triggerClassName?: string;
  customTrigger?: boolean;
  isOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
  withPortal?: boolean;
  tooltip?: string;
  isActive?: boolean;
};

export const Menu = ({ customTrigger, trigger, triggerClassName, children, isOpen, withPortal, tooltip, onOpenChange }: MenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <Popover
      open={open}
      onClose={() => setAnchorEl(null)}
      anchorEl={anchorEl}
      id={id}
      slotProps={{
        paper: {
          sx: {
            zIndex: 9999,
          },
        },
      }}
    >
      {customTrigger ? (
        <Toolbar.Button className={triggerClassName} tooltip={!isOpen ? tooltip : ''}>
          {trigger}
        </Toolbar.Button>
      ) : (
        <Toolbar.Button className={triggerClassName} tooltip={!isOpen ? tooltip : ''}>
          {trigger}
        </Toolbar.Button>
      )}
      {withPortal ? (
        <Box>
          <Surface className='min-w-[15rem] p-2 flex flex-col gap-0.5 max-h-80 overflow-auto z-[9999]'>{children}</Surface>
        </Box>
      ) : (
        <Box>
          <Surface className='min-w-[15rem] p-2 flex flex-col gap-0.5 max-h-80 overflow-auto z-[9999]'>{children}</Surface>
        </Box>
      )}
    </Popover>
  );
};

Menu.displayName = 'Menu';

export const Item = ({
  label,
  close = true,
  icon,
  iconComponent,
  disabled,
  onClick,
  isActive,
}: {
  label: string | React.ReactNode;
  icon?: keyof typeof icons;
  iconComponent?: React.ReactNode;
  close?: boolean;
  disabled?: boolean;
  onClick: () => void;
  isActive?: boolean;
}) => {
  const IconComponent = icon ? icons[icon] : null;
  const IconCustomComponent = iconComponent || null;

  const ItemComponent = close ? 'button' : 'button';

  return (
    <ItemComponent onClick={onClick} disabled={disabled}>
      {IconComponent && <IconComponent className='w-4 h-4' />}
      {IconCustomComponent}
      {label}
    </ItemComponent>
  );
};

export type CategoryTitle = {
  children: React.ReactNode;
};

export const CategoryTitle = ({ children }: CategoryTitle) => {
  return (
    <Box
      sx={{
        mt: 4,
        first: { mt: 1.5 },
        mb: 1.5,
        text: '0.625rem',
        textTransform: 'uppercase',
        fontWeight: 'medium',
        color: 'neutral.400',
        dark: {
          color: 'neutral.600',
        },
      }}
    >
      {children}
    </Box>
  );
};

export const Divider = forwardRef<HTMLHRElement>((props, ref) => {
  return <hr {...props} ref={ref} className='my-1 border-neutral-200 dark:border-neutral-800' />;
});

Divider.displayName = 'Divider';
