import Head from 'next/head';
import AdminSettingsCategoriesPage from 'src/components/pages/admin/ListCategoriesPage';

const AdminSettingsCategories = () => {
  return (
    <>
      <Head>
        <title>AdminSettingsCategories</title>
      </Head>

      <AdminSettingsCategoriesPage />
    </>
  );
};

export default AdminSettingsCategories;
