import NextImage, { ImageProps } from 'next/image';
import { FC } from 'react';

const Image: FC<ImageProps> = ({ src, ...others }) => {
  if (!src) return null;

  return <NextImage src={src} {...others} />;
};

export default Image;
