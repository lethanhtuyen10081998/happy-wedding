import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import WeddingServiceDetail from 'src/components/pages/services';
import { DetailDataContextProvider } from 'src/context/detailContext/provider';
import { getProductDetail } from 'src/services/admin/manage/product/detail';
import { Product } from 'src/types/product';

const ProductDetailPage = ({ product }: { product: Product }) => {
  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name='description' content={product.description} />
        <meta name='keywords' content={product.tags.join(', ')} />
        <meta name='robots' content='index, follow' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='og:title' content={product.name} />
        <meta name='og:description' content={product.description} />
        <meta name='og:image' content={product.imagesList?.[0] || ''} />
      </Head>
      <DetailDataContextProvider data={product}>
        <WeddingServiceDetail />
      </DetailDataContextProvider>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { productId } = context.query;
  const product = await getProductDetail({ id: productId as string });

  if (!product) {
    return {
      props: { product: null },
    };
  }

  return {
    props: { product },
  };
};

export default ProductDetailPage;
