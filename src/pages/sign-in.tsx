import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { serverSideUnAuthentication } from 'src/auth/session';
import SignIn from 'src/components/pages/auth/signIn';
import PublicLayout from 'src/layout/PublicLayout/PublicLayout';

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

SignInPage.Layout = PublicLayout;

export const getServerSideProps = serverSideUnAuthentication(async () => {
  return {
    props: {},
  };
});

export default SignInPage;
