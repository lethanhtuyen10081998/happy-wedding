import ContainerMaterial, { ContainerProps } from '@mui/material/Container';
import { FC } from 'react';

const Container: FC<ContainerProps> = ({ children, ...others }) => {
  return <ContainerMaterial {...others}>{children}</ContainerMaterial>;
};

export default Container;
