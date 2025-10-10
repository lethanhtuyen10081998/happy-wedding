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

  if (!categoryDetail) {
    return <SpinnerCenter />;
  }

  return (
    <FilterContextProvider filter={{ name: '', category: categoryDetail, sortOrder: 'asc', fromPrice: 0, toPrice: 100000000 }}>
      <CategoryDetail />
    </FilterContextProvider>
  );
};

export default CategoryDetailPage;
