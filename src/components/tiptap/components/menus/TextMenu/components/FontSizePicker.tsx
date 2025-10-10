import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Menu, MenuItem } from '@mui/material';
import { MouseEvent, useCallback, useState } from 'react';

const FONT_SIZES = [
  { label: 'Smaller', value: '12px' },
  { label: 'Small', value: '14px' },
  { label: 'Medium', value: '' },
  { label: 'Large', value: '18px' },
  { label: 'Extra Large', value: '24px' },
];

export type FontSizePickerProps = {
  onChange: (value: string) => void;
  value: string;
};

export const FontSizePicker = ({ onChange, value }: FontSizePickerProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const currentValue = FONT_SIZES.find((size) => size.value === value);
  const currentSizeLabel = currentValue?.label.split(' ')[0] || 'Medium';

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(anchorEl ? null : event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const selectSize = useCallback(
    (size: string) => {
      onChange(size);
      handleClose();
    },
    [onChange],
  );

  return (
    <>
      <MenuItem onClick={handleOpen} component='button'>
        {currentSizeLabel}
        <ExpandMoreIcon />
      </MenuItem>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {FONT_SIZES.map((size) => (
          <MenuItem
            key={size.value}
            onClick={() => selectSize(size.value)}
            selected={value === size.value}
            style={{ fontSize: size.value }}
          >
            {size.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
