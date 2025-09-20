'use client';

import { useState } from 'react';

import AutoResizeTextarea from './TextField';

export default function MessageInputField({ onSubmit }: { onSubmit: (message: string) => void; isLoading: boolean }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
      }}
      style={{ display: 'flex', width: '100%' }}
    >
      <AutoResizeTextarea
        placeholder='Hỏi bất cứ gì ở đây....'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onSubmit={() => {
          onSubmit(inputValue);
          setInputValue('');
        }}
      />
    </form>
  );
}
