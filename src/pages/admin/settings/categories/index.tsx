import Head from 'next/head';
import AdminSettingsCategoriesPage from 'src/components/pages/admin/categories/ListCategoriesPage';
import { RefsContextProvider } from 'src/context/refsContext/provider';

const AdminSettingsCategories = () => {
  return (
    <>
      <Head>
        <title>Danh Mục</title>
      </Head>

      <RefsContextProvider>
        <AdminSettingsCategoriesPage />
      </RefsContextProvider>
    </>
  );
};

export default AdminSettingsCategories;
