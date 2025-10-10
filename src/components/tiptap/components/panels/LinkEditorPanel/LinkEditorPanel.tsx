import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { useCallback, useMemo, useState } from 'react';
import Button from 'src/components/material/Button';
import TextField from 'src/components/material/TextField';
import { Icon } from 'src/components/tiptap/components/ui/Icon';
import { Toggle } from 'src/components/tiptap/components/ui/Toggle';

export type LinkEditorPanelProps = {
  initialUrl?: string;
  initialOpenInNewTab?: boolean;
  onSetLink: (url: string, openInNewTab?: boolean) => void;
};

export const useLinkEditorState = ({
  initialUrl,
  initialOpenInNewTab,
  onSetLink,
}: LinkEditorPanelProps) => {
  const [url, setUrl] = useState(initialUrl || '');
  const [openInNewTab, setOpenInNewTab] = useState(initialOpenInNewTab || false);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }, []);

  const isValidUrl = useMemo(() => /^(\S+):(\/\/)?\S+$/.test(url), [url]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isValidUrl) {
        onSetLink(url, openInNewTab);
      }
    },
    [url, isValidUrl, openInNewTab, onSetLink],
  );

  return {
    url,
    setUrl,
    openInNewTab,
    setOpenInNewTab,
    onChange,
    handleSubmit,
    isValidUrl,
  };
};

export const LinkEditorPanel = ({
  onSetLink,
  initialOpenInNewTab,
  initialUrl,
}: LinkEditorPanelProps) => {
  const state = useLinkEditorState({ onSetLink, initialOpenInNewTab, initialUrl });

  return (
    <Box className='p-2' component={Paper} padding={2} width={300}>
      <form onSubmit={state.handleSubmit}>
        <label>
          <TextField
            type='url'
            placeholder='Enter URL'
            value={state.url}
            onChange={state.onChange}
            InputProps={{
              startAdornment: <Icon name='Link' className='flex-none text-black dark:text-white' />,
            }}
          />
        </label>
        <Box mt={1}>
          <Button type='submit' disabled={!state.isValidUrl}>
            Set Link
          </Button>
        </Box>
      </form>
      <div className='mt-3'>
        <label>
          Open in new tab
          <Toggle active={state.openInNewTab} onChange={state.setOpenInNewTab} />
        </label>
      </div>
    </Box>
  );
};
