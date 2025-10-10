/* eslint-disable jsx-a11y/alt-text */
'use client';

import {
  Add,
  CheckBox,
  Code,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatClear,
  FormatColorText,
  FormatIndentDecrease,
  FormatIndentIncrease,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatUnderlined,
  HorizontalRule,
  Image,
  Link,
  LinkOff,
  Redo,
  StrikethroughS,
  Subscript,
  Superscript,
  TableChart,
  TextFields,
  Title,
  Undo,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import type { Editor } from '@tiptap/react';
import { useState, type MouseEvent } from 'react';

interface MenuBarProps {
  editor: Editor | null;
}

export default function MenuBar({ editor }: MenuBarProps) {
  const [headingAnchorEl, setHeadingAnchorEl] = useState<null | HTMLElement>(null);
  const [alignAnchorEl, setAlignAnchorEl] = useState<null | HTMLElement>(null);
  const [tableAnchorEl, setTableAnchorEl] = useState<null | HTMLElement>(null);
  const [linkAnchorEl, setLinkAnchorEl] = useState<null | HTMLElement>(null);
  const [imageAnchorEl, setImageAnchorEl] = useState<null | HTMLElement>(null);
  const [colorAnchorEl, setColorAnchorEl] = useState<null | HTMLElement>(null);
  const [fontSizeAnchorEl, setFontSizeAnchorEl] = useState<null | HTMLElement>(null);

  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  if (!editor) {
    return null;
  }

  const handleHeadingClick = (event: MouseEvent<HTMLButtonElement>) => {
    setHeadingAnchorEl(event.currentTarget);
  };

  const handleHeadingClose = () => {
    setHeadingAnchorEl(null);
  };

  const handleAlignClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAlignAnchorEl(event.currentTarget);
  };

  const handleAlignClose = () => {
    setAlignAnchorEl(null);
  };

  const handleTableClick = (event: MouseEvent<HTMLButtonElement>) => {
    setTableAnchorEl(event.currentTarget);
  };

  const handleTableClose = () => {
    setTableAnchorEl(null);
  };

  const handleLinkClick = (event: MouseEvent<HTMLButtonElement>) => {
    setLinkAnchorEl(event.currentTarget);
    // Pre-fill with selected text if it's a URL
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, '');
    if (text.match(/^https?:\/\//)) {
      setLinkUrl(text);
    } else {
      setLinkUrl('');
    }
  };

  const handleLinkClose = () => {
    setLinkAnchorEl(null);
    setLinkUrl('');
  };

  const handleImageClick = (event: MouseEvent<HTMLButtonElement>) => {
    setImageAnchorEl(event.currentTarget);
  };

  const handleImageClose = () => {
    setImageAnchorEl(null);
    setImageUrl('');
    setImageAlt('');
  };

  const handleColorClick = (event: MouseEvent<HTMLButtonElement>) => {
    setColorAnchorEl(event.currentTarget);
  };

  const handleColorClose = () => {
    setColorAnchorEl(null);
  };

  const handleFontSizeClick = (event: MouseEvent<HTMLButtonElement>) => {
    setFontSizeAnchorEl(event.currentTarget);
  };

  const handleFontSizeClose = () => {
    setFontSizeAnchorEl(null);
  };

  const handleSetLink = () => {
    // Check if URL is valid
    if (linkUrl) {
      // Add https if not present
      const url = linkUrl.match(/^https?:\/\//) ? linkUrl : `https://${linkUrl}`;
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    }
    handleLinkClose();
  };

  const handleSetImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
    }
    handleImageClose();
  };

  const handleInsertTable = () => {
    editor.chain().focus().insertTable({ rows: tableRows, cols: tableCols, withHeaderRow: true }).run();
    handleTableClose();
  };

  const handleFontSizeChange = (size: string) => {
    editor.chain().focus().setFontSize(size).run();
    handleFontSizeClose();
  };

  const handleTextColorChange = (color: string) => {
    editor.chain().focus().setColor(color).run();
    handleColorClose();
  };

  const handleHighlightColorChange = (color: string) => {
    editor.chain().focus().setHighlight({ color }).run();
    handleColorClose();
  };

  const colors = [
    '#000000',
    '#434343',
    '#666666',
    '#999999',
    '#b7b7b7',
    '#cccccc',
    '#d9d9d9',
    '#efefef',
    '#f3f3f3',
    '#ffffff',
    '#980000',
    '#ff0000',
    '#ff9900',
    '#ffff00',
    '#00ff00',
    '#00ffff',
    '#4a86e8',
    '#0000ff',
    '#9900ff',
    '#ff00ff',
    '#e6b8af',
    '#f4cccc',
    '#fce5cd',
    '#fff2cc',
    '#d9ead3',
    '#d0e0e3',
    '#c9daf8',
    '#cfe2f3',
    '#d9d2e9',
    '#ead1dc',
  ];

  const fontSizes = ['8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px', '48px', '72px'];

  return (
    <AppBar position='static' color='default' elevation={0}>
      <Toolbar variant='dense' sx={{ flexWrap: 'wrap', gap: 0.5, minHeight: 'auto', py: 0.5 }}>
        {/* Headings */}
        <Tooltip title='Heading'>
          <IconButton onClick={handleHeadingClick}>
            <Title fontSize='small' />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={headingAnchorEl} open={Boolean(headingAnchorEl)} onClose={handleHeadingClose}>
          <MenuItem
            onClick={() => {
              editor.chain().focus().setParagraph().run();
              handleHeadingClose();
            }}
            selected={editor.isActive('paragraph')}
          >
            <ListItemText>Normal</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 1 }).run();
              handleHeadingClose();
            }}
            selected={editor.isActive('heading', { level: 1 })}
          >
            <ListItemText>Heading 1</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 2 }).run();
              handleHeadingClose();
            }}
            selected={editor.isActive('heading', { level: 2 })}
          >
            <ListItemText>Heading 2</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 3 }).run();
              handleHeadingClose();
            }}
            selected={editor.isActive('heading', { level: 3 })}
          >
            <ListItemText>Heading 3</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 4 }).run();
              handleHeadingClose();
            }}
            selected={editor.isActive('heading', { level: 4 })}
          >
            <ListItemText>Heading 4</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 5 }).run();
              handleHeadingClose();
            }}
            selected={editor.isActive('heading', { level: 5 })}
          >
            <ListItemText>Heading 5</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              editor.chain().focus().toggleHeading({ level: 6 }).run();
              handleHeadingClose();
            }}
            selected={editor.isActive('heading', { level: 6 })}
          >
            <ListItemText>Heading 6</ListItemText>
          </MenuItem>
        </Menu>

        {/* Font Size */}
        <Tooltip title='Font Size'>
          <IconButton onClick={handleFontSizeClick}>
            <TextFields fontSize='small' />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={fontSizeAnchorEl} open={Boolean(fontSizeAnchorEl)} onClose={handleFontSizeClose}>
          {fontSizes.map((size) => (
            <MenuItem key={size} onClick={() => handleFontSizeChange(size)} sx={{ fontSize: size }}>
              {size}
            </MenuItem>
          ))}
        </Menu>

        {/* Colors */}
        <Tooltip title='Text Color & Highlight'>
          <IconButton onClick={handleColorClick}>
            <FormatColorText fontSize='small' />
          </IconButton>
        </Tooltip>
        <Popover
          anchorEl={colorAnchorEl}
          open={Boolean(colorAnchorEl)}
          onClose={handleColorClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2, width: 240 }}>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
              Text Color
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {colors.map((color) => (
                <Box
                  key={`text-${color}`}
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: color,
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => handleTextColorChange(color)}
                />
              ))}
            </Box>
            <Typography variant='subtitle2' sx={{ mb: 1 }}>
              Highlight Color
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {colors.map((color) => (
                <Box
                  key={`highlight-${color}`}
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: color,
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => handleHighlightColorChange(color)}
                />
              ))}
            </Box>
          </Box>
        </Popover>

        <Divider orientation='vertical' flexItem sx={{ mx: 0.5 }} />

        {/* Basic Formatting */}
        <Tooltip title='Bold'>
          <IconButton onClick={() => editor.chain().focus().toggleBold().run()} color={editor.isActive('bold') ? 'primary' : 'default'}>
            <FormatBold fontSize='small' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Italic'>
          <IconButton onClick={() => editor.chain().focus().toggleItalic().run()} color={editor.isActive('italic') ? 'primary' : 'default'}>
            <FormatItalic fontSize='small' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Underline'>
          <IconButton onClick={() => editor.chain().focus().toggleUnderline().run()} color={editor.isActive('underline') ? 'primary' : 'default'}>
            <FormatUnderlined fontSize='small' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Strikethrough'>
          <IconButton onClick={() => editor.chain().focus().toggleStrike().run()} color={editor.isActive('strike') ? 'primary' : 'default'}>
            <StrikethroughS fontSize='small' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Superscript'>
          <IconButton onClick={() => editor.chain().focus().toggleSuperscript().run()} color={editor.isActive('superscript') ? 'primary' : 'default'}>
            <Superscript fontSize='small' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Subscript'>
          <IconButton onClick={() => editor.chain().focus().toggleSubscript().run()} color={editor.isActive('subscript') ? 'primary' : 'default'}>
            <Subscript fontSize='small' />
          </IconButton>
        </Tooltip>

        <Divider orientation='vertical' flexItem sx={{ mx: 0.5 }} />

        {/* Alignment */}
        <Tooltip title='Alignment'>
          <IconButton onClick={handleAlignClick}>
            <FormatAlignLeft fontSize='small' />
          </IconButton>
        </Tooltip>
        <Menu anchorEl={alignAnchorEl} open={Boolean(alignAnchorEl)} onClose={handleAlignClose}>
          <MenuItem
            onClick={() => {
              editor.chain().focus().setTextAlign('left').run();
              handleAlignClose();
            }}
            selected={editor.isActive({ textAlign: 'left' })}
          >
            <ListItemIcon>
              <FormatAlignLeft fontSize='small' />
            </ListItemIcon>
            <ListItemText>Left</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              editor.chain().focus().setTextAlign('center').run();
              handleAlignClose();
            }}
            selected={editor.isActive({ textAlign: 'center' })}
          >
            <ListItemIcon>
              <FormatAlignCenter fontSize='small' />
            </ListItemIcon>
            <ListItemText>Center</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              editor.chain().focus().setTextAlign('right').run();
              handleAlignClose();
            }}
            selected={editor.isActive({ textAlign: 'right' })}
          >
            <ListItemIcon>
              <FormatAlignRight fontSize='small' />
            </ListItemIcon>
            <ListItemText>Right</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              editor.chain().focus().setTextAlign('justify').run();
              handleAlignClose();
            }}
            selected={editor.isActive({ textAlign: 'justify' })}
          >
            <ListItemIcon>
              <FormatAlignJustify fontSize='small' />
            </ListItemIcon>
            <ListItemText>Justify</ListItemText>
          </MenuItem>
        </Menu>

        {/* Indentation */}
        <Tooltip title='Decrease Indent'>
          <IconButton onClick={() => editor.chain().focus().liftListItem('listItem').run()}>
            <FormatIndentDecrease fontSize='small' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Increase Indent'>
          <IconButton onClick={() => editor.chain().focus().liftListItem('listItem').run()}>
            <FormatIndentIncrease fontSize='small' />
          </IconButton>
        </Tooltip>

        <Divider orientation='vertical' flexItem sx={{ mx: 0.5 }} />

        {/* Lists */}
        <Tooltip title='Bullet List'>
          <IconButton onClick={() => editor.chain().focus().toggleBulletList().run()} color={editor.isActive('bulletList') ? 'primary' : 'default'}>
            <FormatListBulleted fontSize='small' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Numbered List'>
          <IconButton onClick={() => editor.chain().focus().toggleOrderedList().run()} color={editor.isActive('orderedList') ? 'primary' : 'default'}>
            <FormatListNumbered fontSize='small' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Task List'>
          <IconButton onClick={() => editor.chain().focus().toggleTaskList().run()} color={editor.isActive('taskList') ? 'primary' : 'default'}>
            <CheckBox fontSize='small' />
          </IconButton>
        </Tooltip>

        <Divider orientation='vertical' flexItem sx={{ mx: 0.5 }} />

        {/* Block Elements */}
        <Tooltip title='Blockquote'>
          <IconButton onClick={() => editor.chain().focus().toggleBlockquote().run()} color={editor.isActive('blockquote') ? 'primary' : 'default'}>
            <FormatQuote fontSize='small' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Code Block'>
          <IconButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} color={editor.isActive('codeBlock') ? 'primary' : 'default'}>
            <Code fontSize='small' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Horizontal Rule'>
          <IconButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <HorizontalRule fontSize='small' />
          </IconButton>
        </Tooltip>

        <Divider orientation='vertical' flexItem sx={{ mx: 0.5 }} />

        {/* Links */}
        <Tooltip title='Link'>
          <IconButton onClick={handleLinkClick} color={editor.isActive('link') ? 'primary' : 'default'}>
            <Link fontSize='small' />
          </IconButton>
        </Tooltip>
        <Popover
          anchorEl={linkAnchorEl}
          open={Boolean(linkAnchorEl)}
          onClose={handleLinkClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2, width: 300 }}>
            <TextField
              autoFocus
              margin='dense'
              label='URL'
              type='url'
              fullWidth
              variant='outlined'
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder='https://example.com'
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button onClick={handleLinkClose}>Cancel</Button>
              <Button variant='contained' onClick={handleSetLink}>
                {editor.isActive('link') ? 'Update' : 'Add'} Link
              </Button>
            </Box>
          </Box>
        </Popover>

        <Tooltip title='Unlink'>
          <IconButton onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')}>
            <LinkOff fontSize='small' />
          </IconButton>
        </Tooltip>

        {/* Image */}
        <Tooltip title='Image'>
          <IconButton onClick={handleImageClick}>
            <Image fontSize='small' />
          </IconButton>
        </Tooltip>
        <Popover
          anchorEl={imageAnchorEl}
          open={Boolean(imageAnchorEl)}
          onClose={handleImageClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2, width: 300 }}>
            <TextField
              autoFocus
              margin='dense'
              label='Image URL'
              type='url'
              fullWidth
              variant='outlined'
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder='https://example.com/image.jpg'
              sx={{ mb: 2 }}
            />
            <TextField
              margin='dense'
              label='Alt Text'
              type='text'
              fullWidth
              variant='outlined'
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
              placeholder='Image description'
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button onClick={handleImageClose}>Cancel</Button>
              <Button variant='contained' onClick={handleSetImage}>
                Insert Image
              </Button>
            </Box>
          </Box>
        </Popover>

        {/* Table */}
        <Tooltip title='Table'>
          <IconButton onClick={handleTableClick}>
            <TableChart fontSize='small' />
          </IconButton>
        </Tooltip>
        <Popover
          anchorEl={tableAnchorEl}
          open={Boolean(tableAnchorEl)}
          onClose={handleTableClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 2, width: 300 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label='Rows'
                  type='number'
                  fullWidth
                  variant='outlined'
                  value={tableRows}
                  onChange={(e) => setTableRows(Number.parseInt(e.target.value) || 2)}
                  inputProps={{ min: 2, max: 10 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='Columns'
                  type='number'
                  fullWidth
                  variant='outlined'
                  value={tableCols}
                  onChange={(e) => setTableCols(Number.parseInt(e.target.value) || 2)}
                  inputProps={{ min: 2, max: 10 }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
              <Button onClick={handleTableClose}>Cancel</Button>
              <Button variant='contained' onClick={handleInsertTable}>
                Insert Table
              </Button>
            </Box>
          </Box>
        </Popover>

        {/* Table Controls - only show when cursor is in a table */}
        {editor.isActive('table') && (
          <>
            <Tooltip title='Add Column Before'>
              <IconButton onClick={() => editor.chain().focus().addColumnBefore().run()}>
                <Add fontSize='small' sx={{ transform: 'rotate(0deg)' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Add Column After'>
              <IconButton onClick={() => editor.chain().focus().addColumnAfter().run()}>
                <Add fontSize='small' sx={{ transform: 'rotate(90deg)' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Add Row Before'>
              <IconButton onClick={() => editor.chain().focus().addRowBefore().run()}>
                <Add fontSize='small' sx={{ transform: 'rotate(270deg)' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Add Row After'>
              <IconButton onClick={() => editor.chain().focus().addRowAfter().run()}>
                <Add fontSize='small' sx={{ transform: 'rotate(180deg)' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete Column'>
              <IconButton onClick={() => editor.chain().focus().deleteColumn().run()}>
                <FormatIndentDecrease fontSize='small' sx={{ transform: 'rotate(90deg)' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete Row'>
              <IconButton onClick={() => editor.chain().focus().deleteRow().run()}>
                <FormatIndentDecrease fontSize='small' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete Table'>
              <IconButton onClick={() => editor.chain().focus().deleteTable().run()}>
                <TableChart fontSize='small' color='error' />
              </IconButton>
            </Tooltip>
          </>
        )}

        <Divider orientation='vertical' flexItem sx={{ mx: 0.5 }} />

        {/* Utilities */}
        <Tooltip title='Clear Formatting'>
          <IconButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}>
            <FormatClear fontSize='small' />
          </IconButton>
        </Tooltip>

        <Box sx={{ flexGrow: 1 }}></Box>

        <Tooltip title='Undo'>
          <IconButton>
            <Undo fontSize='small' />
          </IconButton>
        </Tooltip>

        <Tooltip title='Redo'>
          <IconButton>
            <Redo fontSize='small' />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
