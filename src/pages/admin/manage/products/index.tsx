import Head from 'next/head';
import ListProductPage from 'src/components/pages/admin/products/ListPage';

const ManageProduct = () => {
  return (
    <>
      <Head>
        <title>Sản Phẩm</title>
      </Head>

      <ListProductPage />
    </>
  );
};

export default ManageProduct;
