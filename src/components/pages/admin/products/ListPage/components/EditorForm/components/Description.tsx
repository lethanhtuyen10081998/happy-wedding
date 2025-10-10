import { useFormContext } from 'react-hook-form';
import { useBlockEditor } from 'src/components/tiptap/hooks/useBlockEditor';
import TiptapEditor from 'src/components/tiptap/TiptapEditor';
import { useDetailDataContext } from 'src/context/detailContext/hooksContext';
import { Product } from 'src/types/product';

const Description = ({ content }: { content: string }) => {
  const product = useDetailDataContext<Product>();

  const { setValue } = useFormContext();

  const debounceUpdate = (content: string) => {
    setValue('description', content);
  };

  const { editor } = useBlockEditor({
    content,
    onUpdate: ({ editor }) => {
      debounceUpdate(editor.getHTML());
    },
  });

  return <TiptapEditor editor={editor} />;
};

const DescriptionContent = () => {
  const product = useDetailDataContext<Product>();

  return <Description content={product.description || ''} />;
};

export default DescriptionContent;
