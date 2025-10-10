import { Popper } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { LinkEditorPanel } from 'src/components/tiptap/components/panels';
import { Icon } from 'src/components/tiptap/components/ui/Icon';

export type EditLinkPopoverProps = {
  onSetLink: (link: string, openInNewTab?: boolean) => void;
};

export const EditLinkPopover = ({ onSetLink }: EditLinkPopoverProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  return (
    <>
      <MenuItem onClick={handleClick}>
        <Icon name='Link' />
      </MenuItem>

      <Popper id={id} open={open} anchorEl={anchorEl}>
        <LinkEditorPanel onSetLink={onSetLink} />
      </Popper>
    </>
  );
};
