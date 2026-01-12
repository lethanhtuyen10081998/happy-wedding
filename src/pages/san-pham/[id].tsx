import Head from 'next/head';
import { useRouter } from 'next/router';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import WeddingServiceDetail from 'src/components/pages/services';
import { DetailDataContextProvider } from 'src/context/detailContext/provider';
import useDetail from 'src/services/admin/manage/product/detail';

const ProductDetailPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { data: product } = useDetail({ id: productId as string });

  if (!productId || !product) {
    return <SpinnerCenter />;
  }

  // Strip HTML from description for meta tags
  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').substring(0, 160);
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  const currentUrl = `${siteUrl}${router.asPath}`;
  const imageUrl = product.imagesList?.[0] || '';
  const description = stripHtml(product.description || '');
  const title = product.name || 'Sản phẩm';
  const tags = product.tags?.join(', ') || '';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={tags} />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href={currentUrl} />

        {/* Open Graph / Facebook */}
        <meta property='og:type' content='product' />
        <meta property='og:url' content={currentUrl} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={imageUrl} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta property='og:image:alt' content={title} />
        <meta property='og:site_name' content='Happy Wedding' />

        {/* Twitter Card */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={imageUrl} />

        {/* Additional */}
        <meta name='author' content='Happy Wedding' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <DetailDataContextProvider data={product}>
        <WeddingServiceDetail />
      </DetailDataContextProvider>
    </>
  );
};

export default ProductDetailPage;
