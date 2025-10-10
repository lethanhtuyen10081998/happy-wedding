import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { useCallback, useMemo, useState } from 'react';
import { Icon } from 'src/components/icons';
import Button from 'src/components/material/Button';
import TextField from 'src/components/material/TextField';
import { AiTone } from 'src/components/tiptap/components/BlockEditor/types';
import { Icon as IconLuci } from 'src/components/tiptap/components/ui/Icon';
import { PADDING } from 'src/constants/grid';
import { v4 as uuid } from 'uuid';

export interface DataProps {
  text: string;
  tone?: AiTone;
  textUnit?: string;
  textLength?: string;
}

export const AiWriterView = ({ editor: editorProps, node, getPos, deleteNode }: NodeViewProps) => {
  let editor = editorProps as any;

  const [generatedText, setGeneratedText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataProps>({
    text: '',
    tone: undefined,
  });

  const textareaId = useMemo(() => uuid(), []);
  const generateText = useCallback(async () => {
    if (!data.text) return;

    // setLoading(true);
    // setGeneratedText('');

    // try {
    //   const response = await fetch(endpoints.LOCAL_API_AI_PREFIX, {
    //     method: 'POST',
    //     body: JSON.stringify({ url: endpoints.MANAGEMENT_AI_GENERATE_TOUR_PROGRAM, prompt: data.text }),
    //   });

    //   if (!response.body) {
    //     throw new Error('No response body');
    //   }

    //   const reader = response.body.getReader();
    //   const decoder = new TextDecoder();
    //   let done = false;
    //   let result = '';
    //   let currentText = ''; // Giữ phần kết quả tại một nơi để tránh cập nhật quá nhanh

    //   while (!done) {
    //     const { value, done: readerDone } = await reader.read();
    //     done = readerDone;
    //     result = decoder.decode(value, { stream: true });

    //     // Cập nhật từng phần dữ liệu nhận được vào currentText
    //     currentText += result;

    //     // Cập nhật state mỗi khi có một phần dữ liệu mới
    //     setGeneratedText(currentText);
    //   }
    // } catch (error) {
    //   console.error('Error generating text:', error);
    // } finally {
    //   setLoading(false);
    // }
  }, [data.text]);

  const insert = useCallback(() => {
    const from = getPos();
    const to = from + node.nodeSize;
    editor.chain().focus().insertContent(generatedText, from, to).run();
  }, [editor, getPos, node.nodeSize, generatedText]);

  const discard = useCallback(() => {
    deleteNode();
  }, [deleteNode]);

  const onTextAreaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData((prevData) => ({ ...prevData, text: e.target.value }));
  }, []);

  return (
    <NodeViewWrapper data-drag-handle>
      <Box component={Paper} p={PADDING}>
        <div>
          {generatedText && <Box dangerouslySetInnerHTML={{ __html: generatedText }} />}

          <TextField
            id={textareaId}
            value={data.text}
            onChange={onTextAreaChange}
            placeholder={'Hãy nói với tôi bạn muốn viết gì'}
            required
            multiline
            rows={4}
            variant='outlined'
            autoFocus={true}
          />

          <div className='flex flex-row items-center justify-between gap-1'>
            {/* <div className='flex justify-between w-auto gap-1'>
              <Dropdown.Root>
                <Dropdown.Trigger asChild>
                  <Button>
                    <Icon name='Mic' />
                    {currentTone?.label || 'Change tone'}
                    <Icon name='ChevronDown' />
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Portal>
                  <Dropdown.Content side='bottom' align='start' asChild>
                    <Surface className='p-2 min-w-[12rem]'>
                      {!!data.tone && (
                        <>
                          <Dropdown.Item asChild>
                            <DropdownButton
                              isActive={data.tone === undefined}
                              onClick={onUndoClick}
                            >
                              <Icon name='Undo2' />
                              Reset
                            </DropdownButton>
                          </Dropdown.Item>
                          <Toolbar.Divider horizontal />
                        </>
                      )}
                      {tones.map((tone) => (
                        <Dropdown.Item asChild key={tone.value}>
                          <DropdownButton
                            isActive={tone.value === data.tone}
                            onClick={createItemClickHandler(tone)}
                          >
                            {tone.label}
                          </DropdownButton>
                        </Dropdown.Item>
                      ))}
                    </Surface>
                  </Dropdown.Content>
                </Dropdown.Portal>
              </Dropdown.Root>
            </div> */}

            <Box display='flex' gap={1} mt={1}>
              {generatedText && (
                <Button variant='outlined' onClick={discard} startIcon={<Icon name='delete' />} color='error'>
                  Discard
                </Button>
              )}
              {generatedText && (
                <Button onClick={insert} variant='outlined' disabled={!generatedText} startIcon={<Icon name='check' />} color='success'>
                  Insert
                </Button>
              )}

              <Button onClick={generateText} startIcon={generatedText ? <Icon name='reload' /> : <IconLuci name='Sparkles' />} disabled={loading}>
                {loading ? 'Đang tạo...' : generatedText ? 'Tạo lại' : 'Tạo văn bản'}
              </Button>

              <Button onClick={discard} startIcon={<Icon name='delete' />} color='error'>
                Xóa
              </Button>
            </Box>
          </div>
        </div>
      </Box>
    </NodeViewWrapper>
  );
};
