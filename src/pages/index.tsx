import Head from 'next/head';
import PagePadding from 'src/components/PagePadding';
import HomePage from 'src/components/pages/home';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Happy wedding</title>
      </Head>
      <PagePadding>
        <HomePage />
      </PagePadding>
    </>
  );
};

export default Dashboard;
