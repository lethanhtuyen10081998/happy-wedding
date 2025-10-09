import { Box, Container } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import WeddingServiceDetail from 'src/components/pages/services';
import { DetailDataContextProvider } from 'src/context/detailContext/provider';
import { getProductDetail } from 'src/services/admin/manage/product/detail';
import { Product } from 'src/types/product';

const ServiceDetail = ({ data }: { data: Product }) => {
  if (!data) {
    return (
      <>
        <Head>
          <title>Dịch vụ</title>
        </Head>
        <Container>
          <Box>Không tìm thấy dịch vụ</Box>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dịch vụ</title>
      </Head>
      <Container>
        <DetailDataContextProvider data={data}>
          <WeddingServiceDetail />
        </DetailDataContextProvider>
      </Container>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { productId } = context.query;
  if (!productId) {
    return {
      props: { data: null },
    };
  }

  const data = await getProductDetail({ id: productId as string });

  if (!data) {
    return {
      props: { data: null },
    };
  }
  return {
    props: { productId, data },
  };
}

export default ServiceDetail;
