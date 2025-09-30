import Head from 'next/head';
import AdminSettingsCategoriesPage from 'src/components/pages/admin/categories/ListCategoriesPage';

const AdminSettingsCategories = () => {
  return (
    <>
      <Head>
        <title>Danh Mục</title>
      </Head>

      <AdminSettingsCategoriesPage />
    </>
  );
};

export default AdminSettingsCategories;
