import { Box, MenuItem, Paper, Tooltip } from '@mui/material';
import { BubbleMenu, Editor } from '@tiptap/react';
import { memo, useEffect, useState } from 'react';
import { Icon } from 'src/components/tiptap/components/ui/Icon';

import { AIDropdown } from './components/AIDropdown';
import ColorPickerComponent from './components/ColorPicker';
import { ContentTypePicker } from './components/ContentTypePicker';
import { EditLinkPopover } from './components/EditLinkPopover';
import { FontFamilyPicker } from './components/FontFamilyPicker';
import { FontSizePicker } from './components/FontSizePicker';
import { useTextmenuCommands } from './hooks/useTextmenuCommands';
import { useTextmenuContentTypes } from './hooks/useTextmenuContentTypes';
import { useTextmenuStates } from './hooks/useTextmenuStates';

// We memorize the button so each button is not rerendered
// on every editor state change
const MemoFontFamilyPicker = memo(FontFamilyPicker);
const MemoFontSizePicker = memo(FontSizePicker);
const MemoContentTypePicker = memo(ContentTypePicker);

export type TextMenuProps = {
  editor: Editor;
};

export const TextMenu = ({ editor }: TextMenuProps) => {
  const [selecting, setSelecting] = useState(false);
  const commands = useTextmenuCommands(editor);
  const states = useTextmenuStates(editor);
  const blockOptions = useTextmenuContentTypes(editor);

  useEffect(() => {
    const controller = new AbortController();
    let selectionTimeout: number;

    document.addEventListener(
      'selectionchange',
      () => {
        setSelecting(true);

        if (selectionTimeout) {
          window.clearTimeout(selectionTimeout);
        }

        selectionTimeout = window.setTimeout(() => {
          setSelecting(false);
        }, 500);
      },
      { signal: controller.signal },
    );

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <BubbleMenu
      editor={editor}
      pluginKey='textMenu'
      shouldShow={states.shouldShow}
      updateDelay={0}
      tippyOptions={{
        popperOptions: {
          placement: 'top-start',
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
                padding: 8,
              },
            },
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['bottom-start', 'top-end', 'bottom-end'],
              },
            },
          ],
        },
        offset: [0, 8],
        maxWidth: 'calc(100vw - 16px)',
      }}
    >
      <Box component={Paper} display='flex' sx={{ p: 1 }} width='100%'>
        <AIDropdown
          onCompleteSentence={commands.onCompleteSentence}
          onEmojify={commands.onEmojify}
          onFixSpelling={commands.onFixSpelling}
          onMakeLonger={commands.onMakeLonger}
          onMakeShorter={commands.onMakeShorter}
          onSimplify={commands.onSimplify}
          onTldr={commands.onTldr}
          onTone={commands.onTone}
          onTranslate={commands.onTranslate}
        />

        <MemoContentTypePicker options={blockOptions} />
        <MemoFontFamilyPicker onChange={commands.onSetFont} value={states.currentFont || ''} />
        <MemoFontSizePicker onChange={commands.onSetFontSize} value={states.currentSize || ''} />

        <Tooltip title='Bold'>
          <MenuItem onClick={commands.onBold} selected={states.isBold} component='button'>
            <Icon name='Bold' />
          </MenuItem>
        </Tooltip>

        <Tooltip title='Italic'>
          <MenuItem onClick={commands.onItalic} selected={states.isItalic} component='button'>
            <Icon name='Italic' />
          </MenuItem>
        </Tooltip>

        <Tooltip title='Underline'>
          <MenuItem onClick={commands.onUnderline} selected={states.isUnderline} component='button'>
            <Icon name='Underline' />
          </MenuItem>
        </Tooltip>

        <Tooltip title={['Mod', 'Shift', 'S'].join('+')}>
          <MenuItem onClick={commands.onStrike} selected={states.isStrike} component='button'>
            <Icon name='Strikethrough' />
          </MenuItem>
        </Tooltip>

        <Tooltip title={['Mod', 'E'].join('+')}>
          <MenuItem onClick={commands.onCode} selected={states.isCode} component='button'>
            <Icon name='Code' />
          </MenuItem>
        </Tooltip>

        <Tooltip title='Code block'>
          <MenuItem onClick={commands.onCodeBlock} selected={states.isCode} component='button'>
            <Icon name='FileCode' />
          </MenuItem>
        </Tooltip>

        <EditLinkPopover onSetLink={commands.onLink} />

        <ColorPickerComponent states={states} commands={commands} />
        {/* <Popover.Root>
          <Popover.Trigger asChild>
            <MemoButton active={!!states.currentHighlight} tooltip='Highlight text'>
              <Icon name='Highlighter' />
            </MemoButton>
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
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger asChild>
            <MemoButton active={!!states.currentColor} tooltip='Text color'>
              <Icon name='Palette' />
            </MemoButton>
          </Popover.Trigger>
          <Popover.Content side='top' sideOffset={8} asChild>
            <Surface className='p-1'>
              <MemoColorPicker
                color={states.currentColor}
                onChange={commands.onChangeColor}
                onClear={commands.onClearColor}
              />
            </Surface>
          </Popover.Content>
        </Popover.Root>
        <Popover.Root>
          <Popover.Trigger asChild>
            <MemoButton tooltip='More options'>
              <Icon name='EllipsisVertical' />
            </MemoButton>
          </Popover.Trigger>
          <Popover.Content side='top' asChild>
            <Toolbar>
              <MemoButton
                tooltip='Subscript'
                tooltipShortcut={['Mod', '.']}
                onClick={commands.onSubscript}
                active={states.isSubscript}
              >
                <Icon name='Subscript' />
              </MemoButton>
              <MemoButton
                tooltip='Superscript'
                tooltipShortcut={['Mod', ',']}
                onClick={commands.onSuperscript}
                active={states.isSuperscript}
              >
                <Icon name='Superscript' />
              </MemoButton>
              <MemoButton
                tooltip='Align left'
                tooltipShortcut={['Shift', 'Mod', 'L']}
                onClick={commands.onAlignLeft}
                active={states.isAlignLeft}
              >
                <Icon name='AlignLeft' />
              </MemoButton>
              <MemoButton
                tooltip='Align center'
                tooltipShortcut={['Shift', 'Mod', 'E']}
                onClick={commands.onAlignCenter}
                active={states.isAlignCenter}
              >
                <Icon name='AlignCenter' />
              </MemoButton>
              <MemoButton
                tooltip='Align right'
                tooltipShortcut={['Shift', 'Mod', 'R']}
                onClick={commands.onAlignRight}
                active={states.isAlignRight}
              >
                <Icon name='AlignRight' />
              </MemoButton>
              <MemoButton
                tooltip='Justify'
                tooltipShortcut={['Shift', 'Mod', 'J']}
                onClick={commands.onAlignJustify}
                active={states.isAlignJustify}
              >
                <Icon name='AlignJustify' />
              </MemoButton>
            </Toolbar>
          </Popover.Content>
        </Popover.Root> */}
      </Box>
    </BubbleMenu>
  );
};
