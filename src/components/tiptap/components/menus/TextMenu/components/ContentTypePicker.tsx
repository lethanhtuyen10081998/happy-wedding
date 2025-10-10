import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { icons, Pilcrow } from 'lucide-react';
import { MouseEvent, useMemo, useState } from 'react';

import { Icon } from '../../../ui/Icon';

export type ContentTypePickerOption = {
  label: string;
  id: string;
  type: 'option';
  disabled: () => boolean;
  isActive: () => boolean;
  onClick: () => void;
  icon: keyof typeof icons;
};

export type ContentTypePickerCategory = {
  label: string;
  id: string;
  type: 'category';
};

export type ContentPickerOptions = Array<ContentTypePickerOption | ContentTypePickerCategory>;

export type ContentTypePickerProps = {
  options: ContentPickerOptions;
};

const isOption = (
  option: ContentTypePickerOption | ContentTypePickerCategory,
): option is ContentTypePickerOption => option.type === 'option';

const isCategory = (
  option: ContentTypePickerOption | ContentTypePickerCategory,
): option is ContentTypePickerCategory => option.type === 'category';

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const activeItem = useMemo(
    () => options.find((option) => option.type === 'option' && option.isActive()),
    [options],
  );

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(anchorEl ? null : event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <MenuItem onClick={handleOpen} component='button'>
        <Icon name={(activeItem?.type === 'option' && activeItem.icon) || 'Pilcrow'} />
        <ExpandMoreIcon />
      </MenuItem>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => {
          if (isOption(option)) {
            const IconComponent = icons[option.icon] || Pilcrow;
            return (
              <MenuItem
                key={option.id}
                onClick={() => {
                  option.onClick();
                  handleClose();
                }}
                selected={option.isActive()}
                disabled={option.disabled()}
              >
                <ListItemIcon>
                  <IconComponent size={18} />
                </ListItemIcon>
                <ListItemText primary={option.label} />
              </MenuItem>
            );
          } else if (isCategory(option)) {
            return (
              <MenuItem key={option.id} disabled>
                <strong>{option.label}</strong>
              </MenuItem>
            );
          }
        })}
      </Menu>
    </>
  );
};
