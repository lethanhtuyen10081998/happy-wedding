import { Box, colors, IconButton, List, ListItem, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Icon } from 'src/components/icons';
import NextLink from 'src/components/material/NextLink';
import useSnackbar from 'src/components/material/Snackbar/useSnackbar';
import ScrollContent from 'src/components/ScrollContent';
import { internalApiInstanceN8N } from 'src/providers/authProvider';
import endpoints from 'src/services/endpoints';
import { v4 as uuidv4 } from 'uuid';

import MessageInputField from './components/MessageInputField';

const threadId = uuidv4();

const bgcolor = colors.grey[100];
const color = 'black';

type Message = {
  id: number;
  role: string;
  content: string | JSX.Element;
  type: string;
};

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    content: <Typography variant='body2'>Xin chào! Tôi là trợ lý AI của bạn</Typography>,
    type: 'jsx',
  },
  {
    id: 2,
    role: 'assistant',
    content: <Typography variant='body2'>Vui lòng cho tôi biết tên của bạn để tiện xưng hô được không?</Typography>,
    type: 'jsx',
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSendMessage = async (message: string) => {
    const id = messages.length + 2;
    try {
      const newUserMessage = {
        id: messages.length + 1,
        role: 'user',
        content: message,
        type: 'text',
      };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);

      const placeholderMessage = {
        id,
        role: 'assistant',
        content: (
          <Box width={60} height={10} display='flex'>
            <span className='loader-dot'></span>
          </Box>
        ),
        type: 'jsx',
      };

      setMessages((prevMessages) => [...prevMessages, placeholderMessage]);

      setIsLoading(true);

      const response = await internalApiInstanceN8N.post('', {
        url: endpoints.MANAGEMENT_AI_N8N_CHAT_AI,
        chatInput: message,
        sessionId: threadId,
        factNo: process.env.NEXT_PUBLIC_FACT_NO,
      });

      if (!response.data) {
        throw new Error('No response body');
      }

      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.map((msg) => (msg.id === id ? { ...msg, content: response.data, type: 'text' } : msg));
        return updatedMessages;
      });

      setIsLoading(false);
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: 'error' });
      setIsLoading(false);
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.filter((msg) => msg.id !== id);
        return updatedMessages;
      });

      setMessages((prevMessages) => {
        const updatedMessages = [
          ...prevMessages,
          {
            id: id,
            role: 'assistant',
            content: (
              <Typography color={colors.red[500]} variant='body2'>
                Lỗi khi trò chuyện, vui lòng thử lại sau!
              </Typography>
            ),
            type: 'jsx',
          },
        ];
        return updatedMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  return (
    <Box sx={{ p: { xs: 0 }, position: 'relative', height: '100%' }} bgcolor={bgcolor} width='100%'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: 1,
            height: '50px',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <Box px={2}>
            <NextLink href='/'>
              <IconButton size='large'>
                <Icon name='back' />
              </IconButton>
            </NextLink>
          </Box>

          <Box sx={{ py: 1, width: 1 }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold', textAlign: 'left', display: { xs: 'none', md: 'block' } }}>
              Về lại trang chủ
            </Typography>
          </Box>
        </Box>

        <ScrollContent height='calc(100vh)' maxHeight='calc(100vh)'>
          <Box width='100%' display='flex' justifyContent='center'>
            <Box width={{ xs: '100%', md: '80%', lg: '60%', xl: '40%' }} display='flex' justifyContent='center' mb='200px' mt={6}>
              <List
                sx={{
                  flexGrow: 1,
                  background: bgcolor,
                  width: '100%',
                  height: '100%',
                }}
              >
                <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ pb: 2, display: 'flex', justifyContent: 'center' }}>
                    <Typography sx={{ fontWeight: 'bold', color }} variant='caption'>
                      Bắt đầu cuộc trò chuyện
                    </Typography>
                  </Box>
                </ListItem>

                {messages.map((message) => (
                  <ListItem
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                      py: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        maxWidth: '80%',
                      }}
                    >
                      <Box>
                        <Box
                          sx={{
                            px: 1.5,
                            py: 1.5,
                            color: message.role === 'user' ? 'white' : 'black',
                            borderRadius: message.role === 'user' ? '20px 20px 20px 20px' : '20px 20px 20px 20px',
                            mt: 0.2,
                            boxShadow: (theme) =>
                              message.role === 'user'
                                ? `${theme.palette.secondary.light} 0px 5px 15px -5px, rgba(0, 0, 0, 0.04) 0px 10px 5px -5px`
                                : 'rgba(0, 0, 0, 0.1) 0px 10px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                            backgroundColor: (theme) => (message.role === 'assistant' ? 'white' : theme.palette.secondary.light),
                            '& p': {
                              padding: 0,
                              margin: 0,
                            },
                          }}
                        >
                          {message.type === 'text' ? <Box dangerouslySetInnerHTML={{ __html: message.content }} /> : message.content}
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
          <div ref={messagesEndRef} />
        </ScrollContent>

        <Box width='100%' display='flex' justifyContent='center' sx={{ bottom: 16, position: 'absolute' }}>
          <Box width={{ xs: '100%', md: '80%', lg: '60%', xl: '40%' }} display='flex' justifyContent='center' p={1}>
            <MessageInputField onSubmit={handleSendMessage} isLoading={isLoading} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
