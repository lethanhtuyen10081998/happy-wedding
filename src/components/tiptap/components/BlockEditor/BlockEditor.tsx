import { TiptapCollabProvider } from '@hocuspocus/provider';
import { EditorContent } from '@tiptap/react';
import { useRef, useState } from 'react';
import { LinkMenu } from 'src/components/tiptap/components/menus';
import ImageBlockMenu from 'src/components/tiptap/extensions/ImageBlock/components/ImageBlockMenu';
import { ColumnsMenu } from 'src/components/tiptap/extensions/MultiColumn/menus';
import { TableColumnMenu, TableRowMenu } from 'src/components/tiptap/extensions/Table/menus';
import { useBlockEditor } from 'src/components/tiptap/hooks/useBlockEditor';
import { useSidebar } from 'src/components/tiptap/hooks/useSidebar';
import 'src/components/tiptap/styles/index.css';
import * as Y from 'yjs';

import { ContentItemMenu } from '../menus/ContentItemMenu';
import { TextMenu } from '../menus/TextMenu';
import { EditorHeader } from './components/EditorHeader';

export const BlockEditor = ({
  aiToken,
  ydoc,
  provider,
}: {
  aiToken?: string;
  ydoc: Y.Doc | null;
  provider?: TiptapCollabProvider | null | undefined;
}) => {
  const [isEditable, setIsEditable] = useState(true);
  const menuContainerRef = useRef(null);

  const leftSidebar = useSidebar();
  const { editor } = useBlockEditor({
    aiToken,
    provider,
    onTransaction({ editor: currentEditor }) {
      setIsEditable(currentEditor.isEditable);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className='flex h-full' ref={menuContainerRef}>
      <div className='relative flex flex-col flex-1 h-full overflow-hidden'>
        <EditorHeader editor={editor} isSidebarOpen={leftSidebar.isOpen} toggleSidebar={leftSidebar.toggle} />
        <EditorContent editor={editor} className='flex-1 overflow-y-auto' />
        <ContentItemMenu editor={editor} isEditable={isEditable} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  );
};

export default BlockEditor;
