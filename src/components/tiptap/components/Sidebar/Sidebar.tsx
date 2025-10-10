import Box from '@mui/material/Box';
import { Editor } from '@tiptap/react';
import { memo, useCallback } from 'react';

export const Sidebar = memo(
  ({ editor, isOpen, onClose }: { editor: Editor; isOpen?: boolean; onClose: () => void }) => {
    const handlePotentialClose = useCallback(() => {
      if (window.innerWidth < 1024) {
        onClose();
      }
    }, [onClose]);

    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundColor: 'white',
          backdropFilter: 'blur(10px)',
          zIndex: 999,
          duration: '300ms',
          transition: 'all 0.3s ease',
        }}
      >
        <Box className='w-full h-full overflow-hidden'>
          <Box className='w-full h-full p-6 overflow-auto'>
            <div>table content</div>
          </Box>
        </Box>
      </Box>
    );
  },
);

Sidebar.displayName = 'TableOfContentSidepanel';
