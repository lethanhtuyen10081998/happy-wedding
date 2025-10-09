import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import SpinnerCenter from 'src/components/material/Spinner/SpinnerCenter';
import PagePadding from 'src/components/PagePadding';
import CategoryDetail from 'src/components/pages/category';
import { FilterContextProvider, useAPIFilterContext } from 'src/context/filterContext/provider';
import useCategoryDetail from 'src/services/admin/settings/categories/detail';

const CategoryDetailPage = () => {
  const pathname = useSearchParams();
  const category = pathname.get('category');
  const { data: categoryDetail, isLoading } = useCategoryDetail({
    slug: category as string,
  });

  const { onSetDefaultFilter } = useAPIFilterContext();

  useEffect(() => {
    if (categoryDetail) {
      onSetDefaultFilter({ category: categoryDetail });
    }
  }, [categoryDetail, onSetDefaultFilter]);

  if (isLoading)
    return (
      <PagePadding>
        <SpinnerCenter />
      </PagePadding>
    );

  return <CategoryDetail />;
};

const CategoryDetailPageWrapper = () => {
  return (
    <FilterContextProvider>
      <CategoryDetailPage />
    </FilterContextProvider>
  );
};

export default CategoryDetailPageWrapper;
