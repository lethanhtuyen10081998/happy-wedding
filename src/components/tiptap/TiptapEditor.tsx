import Box from '@mui/material/Box';
import { Editor, EditorContent } from '@tiptap/react';
import { useRef } from 'react';
import { LinkMenu, TextMenu } from 'src/components/tiptap/components/menus';
import ImageBlockMenu from 'src/components/tiptap/extensions/ImageBlock/components/ImageBlockMenu';
import { ColumnsMenu } from 'src/components/tiptap/extensions/MultiColumn/menus';
import { TableColumnMenu, TableRowMenu } from 'src/components/tiptap/extensions/Table/menus';

import ScrollContent from '../ScrollContent';
import MenuBar from './components/MenuBar';

export const BlockEditor = ({ editor }: { editor: Editor }) => {
  const menuContainerRef = useRef(null);

  if (!editor) {
    return null;
  }

  return (
    <div className='flex h-full' ref={menuContainerRef}>
      <MenuBar editor={editor} />

      <Box sx={{ position: 'relative' }}>
        <ScrollContent height={'calc(100vh - 200px)'}>
          <EditorContent editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        </ScrollContent>
      </Box>
    </div>
  );
};

export default BlockEditor;
