import { TiptapCollabProvider } from '@hocuspocus/provider';
import type { AnyExtension, Editor, EditorOptions } from '@tiptap/core';
import { useEditor } from '@tiptap/react';
import { ExtensionKit } from 'src/components/tiptap/extensions/extension-kit';

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  content,
  userId,
  userName = 'Maxi',
  ...editorOptions
}: {
  aiToken?: string;
  provider?: TiptapCollabProvider | null | undefined;
  userId?: string;
  userName?: string;
} & Partial<Omit<EditorOptions, 'extensions'>>) => {
  const editor = useEditor(
    {
      ...editorOptions,
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      content: content || '',
      extensions: [...ExtensionKit({})].filter((e): e is AnyExtension => e !== undefined),
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
    },
    [],
  );

  window.editor = editor;

  return { editor };
};
