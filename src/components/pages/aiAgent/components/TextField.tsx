'use client';

import { Box, IconButton } from '@mui/material';
import React, { KeyboardEvent, useEffect, useRef } from 'react';
import { Icon } from 'src/components/icons';
import variables from 'src/themes/variables';

import MenuSuggestion from './MenuSuggestion';

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  placeholder?: string;
  maxHeight?: number;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSubmit, placeholder = 'Nhập tin nhắn...', maxHeight = 200 }) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
    }
  }, [value, maxHeight]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        backgroundColor: 'white',
        width: '100%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        maxHeight: '500px',
        minHeight: '100px',
        position: 'relative',
        borderRadius: '10px',
      }}
    >
      <Box
        component='textarea'
        ref={ref}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={1}
        sx={{
          width: '100%',
          resize: 'none',
          overflow: 'auto',
          padding: '10px 14px',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: '0.955rem',
          fontFamily: variables.fontFamily,
        }}
      />

      <Box p={1} display='flex' width='100%'>
        <Box display='flex' alignItems='center' width='100%'>
          <MenuSuggestion />
        </Box>
        <Box ml='auto'>
          <IconButton
            sx={{
              backgroundColor: 'black',
              borderRadius: '50%',
              ':hover': { backgroundColor: (theme) => theme.palette.grey[400] },
            }}
          >
            <Icon name='send' sx={{ color: 'white' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatInput;
