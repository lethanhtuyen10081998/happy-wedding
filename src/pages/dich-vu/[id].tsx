import Head from 'next/head';
import { useParams } from 'next/navigation';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import CategoryDetail from 'src/components/pages/category';
import { FilterContextProvider } from 'src/context/filterContext/provider';
import useCategoryDetail from 'src/services/admin/settings/categories/detail';

const CategoryDetailPage = () => {
  const { id } = useParams();
  const { data: categoryDetail } = useCategoryDetail({
    slug: id as string,
  });

  console.log('CategoryDetailPage - URL id:', id);
  console.log('CategoryDetailPage - categoryDetail:', categoryDetail);

  if (!categoryDetail) {
    return <SpinnerCenter />;
  }

  return (
    <>
      <Head>
        <title>{categoryDetail.name}</title>
        <meta name='description' content={categoryDetail.description} />
        <meta name='robots' content='index, follow' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <FilterContextProvider filter={{ name: '', category: categoryDetail, sortOrder: 'asc', fromPrice: 0, toPrice: 100000000 }}>
        <CategoryDetail />
      </FilterContextProvider>
    </>
  );
};

export default CategoryDetailPage;
