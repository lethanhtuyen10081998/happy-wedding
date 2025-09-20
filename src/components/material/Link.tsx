import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import NextLink, { LinkProps } from 'next/link';
import React, { FC } from 'react';

const StyledLink: FC<
  LinkProps & {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
    target?: string;
  }
> = ({ children, sx = {}, ...props }) => {
  return (
    <NextLink
      {...props}
      passHref
      style={{
        textDecoration: 'none',
      }}
    >
      {children}
    </NextLink>
  );
};

export default StyledLink;
