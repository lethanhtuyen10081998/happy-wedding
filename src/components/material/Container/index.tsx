import ContainerMaterial, { ContainerProps } from '@mui/material/Container';
import { FC } from 'react';

const Container: FC<ContainerProps> = ({ children, ...others }) => {
  return (
    <ContainerMaterial {...others} sx={{ padding: 0, ...others.sx }}>
      {children}
    </ContainerMaterial>
  );
};

export default Container;
