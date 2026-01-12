import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { serverSideUnAuthentication } from 'src/auth/session';
import SignIn from 'src/components/pages/admin/signIn';
import AdminLayout from 'src/layout/AdminLayout';

const SignInPage = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('signIn')}</title>
      </Head>

      <SignIn />
    </>
  );
};

SignInPage.Layout = AdminLayout;

export const getServerSideProps = serverSideUnAuthentication(async () => {
  return {
    props: {},
  };
});

export default SignInPage;
