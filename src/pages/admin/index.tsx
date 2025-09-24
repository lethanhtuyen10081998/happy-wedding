import Head from 'next/head';
import { serverSideAuthentication } from 'src/auth/session';

const Admin = () => {
  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <div>Admin</div>
    </>
  );
};

export const getServerSideProps = serverSideAuthentication(async () => {
  return {
    props: {},
  };
});

export default Admin;
