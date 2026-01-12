import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import WeddingServiceDetail from 'src/components/pages/services';
import { DetailDataContextProvider } from 'src/context/detailContext/provider';
import { getProductDetail } from 'src/services/admin/manage/product/detail';
import { Product } from 'src/types/product';

interface ProductDetailPageProps {
  product: Product | null;
}

const ProductDetailPage = ({ product }: ProductDetailPageProps) => {
  const router = useRouter();

  if (!product) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <h2>Không tìm thấy sản phẩm</h2>
      </div>
    );
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { id, productId } = context.query;

    // Priority: productId from query > id from route
    // productId is the actual document ID, id is the slug
    const productIdToUse = (productId as string) || (id as string);

    console.log('getServerSideProps - id:', id, 'productId:', productId, 'using:', productIdToUse);

    if (!productIdToUse) {
      console.log('No productId or id found');
      return {
        notFound: true,
      };
    }

    // Fetch product - if productId exists, use it directly, otherwise try to find by slug
    let product;
    if (productId) {
      // Use productId (document ID) directly
      product = await getProductDetail({ id: productId as string });
    } else if (id) {
      // If no productId, try to find by slug using getByCondition
      // Import firestoreService to use getByCondition
      const firestoreService = (await import('src/libs/firebase/service')).default;
      product = await firestoreService.getByCondition<Product>('product', 'slug', '==', id as string);
    }

    console.log('Product found:', product ? 'Yes' : 'No');

    if (!product) {
      console.log('Product not found, returning 404');
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product in getServerSideProps:', error);
    // Don't return notFound on error, return empty product and let component handle it
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductDetailPage;
