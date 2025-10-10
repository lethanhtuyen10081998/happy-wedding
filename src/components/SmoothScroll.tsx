import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

interface FadeInBoxProps {
  inView: boolean;
}

const FadeInBox = styled(Box)<FadeInBoxProps>(({ inView }) => ({
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : 'translateY(36px)',
  transition: 'opacity 1s ease-out, transform 1s ease-out',
  width: '100%',
}));

interface SmoothScrollComponentProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollComponentProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
    rootMargin: '0px 0px 340px 0px',
  });

  return (
    <FadeInBox ref={ref} inView={inView}>
      {children}
    </FadeInBox>
  );
};

export default SmoothScroll;
