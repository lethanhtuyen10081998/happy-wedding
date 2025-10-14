import { ReactNode } from 'react';

// interface FadeInBoxProps {
//   inView: boolean;
// }

// const FadeInBox = styled(Box)<FadeInBoxProps>(({ inView }) => ({
//   opacity: inView ? 1 : 0,
//   transform: inView ? 'translateY(0)' : 'translateY(36px)',
//   transition: 'opacity 1s ease-out, transform 1s ease-out',
//   width: '100%',
// }));

interface SmoothScrollComponentProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollComponentProps) => {
  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.5,
  //   rootMargin: '0px 0px 340px 0px',
  // });

  return <>{children}</>;

  // return (
  //   <FadeInBox ref={ref} inView={inView}>
  //     {children}
  //   </FadeInBox>
  // );
};

export default SmoothScroll;
