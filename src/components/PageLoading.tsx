import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Backdrop from 'src/components/material/Backdrop';

function PageLoading() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', (url) => {
      handleComplete();
    });
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <>
      <Backdrop show={loading} />
    </>
  );
}

export default PageLoading;
