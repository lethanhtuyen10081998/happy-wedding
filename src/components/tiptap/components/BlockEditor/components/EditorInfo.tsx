/* eslint-disable @next/next/no-img-element */
import { WebSocketStatus } from '@hocuspocus/provider';
import Box from '@mui/material/Box';
import { memo } from 'react';

import { getConnectionText } from '../../../lib/utils/getConnectionText';
import Tooltip from '../../ui/Tooltip';
import { EditorUser } from '../types';

export type EditorInfoProps = {
  characters: number;
  words: number;
  collabState: WebSocketStatus;
  users: EditorUser[];
};

export const EditorInfo = memo(({ characters, collabState, users, words }: EditorInfoProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pr: 4,
          mr: 4,
          textAlign: 'right',
          borderRight: '1px solid #e0e0e0',
          dark: {
            borderColor: '#2d2d2d',
          },
        }}
      >
        <div className='text-xs font-semibold text-neutral-500 dark:text-neutral-400'>
          {words} {words === 1 ? 'word' : 'words'}
        </div>
        <div className='text-xs font-semibold text-neutral-500 dark:text-neutral-400'>
          {characters} {characters === 1 ? 'character' : 'characters'}
        </div>
      </Box>
      <Box className='flex items-center gap-2 mr-2'>
        <div />
        <span className='max-w-[4rem] text-xs text-neutral-500 dark:text-neutral-400 font-semibold'>
          {getConnectionText(collabState)}
        </span>
      </Box>
      {collabState === 'connected' && (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              ml: 3,
            }}
          >
            {users.slice(0, 3).map((user: EditorUser) => (
              <div key={user.clientId} className='-ml-3'>
                <Tooltip title={user.name}>
                  <Box
                    component='img'
                    sx={{
                      width: 8,
                      height: 8,
                      border: '1px solid white',
                      borderColor: 'black',
                      backgroundColor: '#FFA2A2',
                      borderRadius: 'full',
                    }}
                    src={`https://api.dicebear.com/7.x/notionists-neutral/svg?seed=${
                      user.name
                    }&backgroundColor=${user.color.replace('#', '')}`}
                    alt='avatar'
                  />
                </Tooltip>
              </div>
            ))}
            {users.length > 3 && (
              <Box sx={{ ml: -3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 8,
                    height: 8,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    leading: 'none',
                    border: '1px solid white',
                    borderColor: 'black',
                    backgroundColor: '#FFA2A2',
                    borderRadius: 'full',
                  }}
                >
                  +{users.length - 3}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
});

EditorInfo.displayName = 'EditorInfo';
