import Head from 'next/head';
import { serverSideAuthentication } from 'src/auth/session';
import PagePadding from 'src/components/PagePadding';
import ProfilePage from 'src/components/pages/profile';
import { useProfileContext } from 'src/context/profileContext/hooksContext';

const Page = () => {
  const profile = useProfileContext();
  return (
    <>
      <Head>
        <title>{profile.profile?.fullName}</title>
      </Head>
      <PagePadding>
        <ProfilePage />
      </PagePadding>
    </>
  );
};

export const getServerSideProps = serverSideAuthentication(async () => {
  return {
    props: {},
  };
});

export default Page;
