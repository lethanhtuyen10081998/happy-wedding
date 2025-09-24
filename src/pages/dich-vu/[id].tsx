import { Container } from '@mui/material';
import Head from 'next/head';
import WeddingServiceDetail from 'src/components/pages/services';

const ServiceDetail = () => {
  return (
    <>
      <Head>
        <title>Dịch vụ</title>
      </Head>
      <Container>
        <WeddingServiceDetail />
      </Container>
    </>
  );
};

export default ServiceDetail;
