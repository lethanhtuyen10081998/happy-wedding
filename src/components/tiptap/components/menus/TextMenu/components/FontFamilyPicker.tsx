import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListSubheader, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useCallback, useState } from 'react';

const FONT_FAMILY_GROUPS = [
  {
    label: 'Sans Serif',
    options: [
      { label: 'Inter', value: '' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Helvetica', value: 'Helvetica' },
    ],
  },
  {
    label: 'Serif',
    options: [
      { label: 'Times New Roman', value: 'Times' },
      { label: 'Garamond', value: 'Garamond' },
      { label: 'Georgia', value: 'Georgia' },
    ],
  },
  {
    label: 'Monospace',
    options: [
      { label: 'Courier', value: 'Courier' },
      { label: 'Courier New', value: 'Courier New' },
    ],
  },
];

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap((group) => group.options);

export type FontFamilyPickerProps = {
  onChange: (value: string) => void;
  value: string;
};

export const FontFamilyPicker = ({ onChange, value }: FontFamilyPickerProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const currentValue = FONT_FAMILIES.find((font) => font.value === value);
  const currentFontLabel = currentValue?.label.split(' ')[0] || 'Inter';

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(anchorEl ? null : event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const selectFont = useCallback(
    (font: string) => {
      onChange(font);
      handleClose();
    },
    [onChange],
  );

  return (
    <>
      <MenuItem onClick={handleOpen} component='button'>
        {currentFontLabel}
        <ExpandMoreIcon />
      </MenuItem>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {FONT_FAMILY_GROUPS.map((group) => (
          <div key={group.label}>
            <ListSubheader>{group.label}</ListSubheader>
            {group.options.map((font) => (
              <MenuItem
                key={font.value}
                onClick={() => selectFont(font.value)}
                selected={value === font.value}
                style={{ fontFamily: font.value }}
              >
                {font.label}
              </MenuItem>
            ))}
          </div>
        ))}
      </Menu>
    </>
  );
};
