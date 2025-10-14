import Head from 'next/head';
import { useSearchParams } from 'next/navigation';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import WeddingServiceDetail from 'src/components/pages/services';
import { DetailDataContextProvider } from 'src/context/detailContext/provider';
import useDetail from 'src/services/admin/manage/product/detail';

const ProductDetailPage = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const { data: product } = useDetail({ id: productId as string });

  if (!productId || !product) {
    return <SpinnerCenter />;
  }

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

export default ProductDetailPage;
