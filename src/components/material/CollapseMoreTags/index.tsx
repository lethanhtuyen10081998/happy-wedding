import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Link } from '@mui/material';
import React from 'react';

import { Props } from './types';

function CollapseMoreTags(props: Props) {
  const [showLess, setShowLess] = React.useState(true);
  const { length, text, sx, isCenter } = props;

  if (text.length < length) {
    return <p>{text}</p>;
  }

  return (
    <Box sx={sx}>
      {showLess ? (
        <>
          {`${text.slice(0, length)}...`}
          {isCenter ? (
            <Box>
              <Box>
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: (theme) => theme.typography.pxToRem(12),
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    mx: '4px',
                    ...props.sx,
                  }}
                  onClick={() => setShowLess(!showLess)}
                >
                  {showLess ? 'Read more' : 'Read less'}
                </Link>
              </Box>
              <ExpandMoreIcon />
            </Box>
          ) : (
            <Link
              sx={{
                cursor: 'pointer',
                textDecoration: 'none',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: (theme) => theme.typography.pxToRem(12),
                mx: '4px',
                ...props.sx,
              }}
              onClick={() => setShowLess(!showLess)}
            >
              {showLess ? 'Read more' : 'Read less'}
            </Link>
          )}
        </>
      ) : (
        <>
          {text}{' '}
          {isCenter ? (
            <Box>
              <Box>
                <Link
                  sx={{
                    cursor: 'pointer',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: (theme) => theme.typography.pxToRem(12),
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    mx: '4px',
                    ...props.sx,
                  }}
                  onClick={() => setShowLess(!showLess)}
                >
                  {showLess ? 'Read more' : 'Read less'}
                </Link>
              </Box>
              <ExpandLessIcon />
            </Box>
          ) : (
            <Link
              sx={{
                cursor: 'pointer',
                textDecoration: 'none',
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: (theme) => theme.typography.pxToRem(12),
                mx: '4px',
                ...props.sx,
              }}
              onClick={() => setShowLess(!showLess)}
            >
              {showLess ? 'Read more' : 'Read less'}
            </Link>
          )}
        </>
      )}
    </Box>
  );
}

export default CollapseMoreTags;
