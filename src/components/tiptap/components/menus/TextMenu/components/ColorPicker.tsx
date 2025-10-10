import { memo, MouseEvent, useState } from 'react';
import { ColorPicker } from 'src/components/tiptap/components/panels';

const MemoColorPicker = memo(ColorPicker);

const ColorPickerComponent = ({ states, commands }: { states: any; commands: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openHighlight = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>, setAnchor: (el: HTMLElement | null) => void) => {
    setAnchor(event.currentTarget);
  };

  return (
    <>
      {/* <Popover.Root>
        <Popover.Trigger asChild>
          <MenuItem selected={!!states.currentHighlight} component='button'>
            <Icon name='Highlighter' />
          </MenuItem>
        </Popover.Trigger>
        <Popover.Content side='top' sideOffset={8} asChild>
          <Surface className='p-1'>
            <MemoColorPicker
              color={states.currentHighlight}
              onChange={commands.onChangeHighlight}
              onClear={commands.onClearHighlight}
            />
          </Surface>
        </Popover.Content>
      </Popover.Root> */}
    </>
  );
};

export default ColorPickerComponent;
