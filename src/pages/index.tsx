import Head from 'next/head';
import PagePadding from 'src/components/PagePadding';
import TravelHomePage from 'src/components/pages/home';

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Happy wedding</title>
      </Head>
      <PagePadding>
        <TravelHomePage />
      </PagePadding>
    </>
  );
};

export default Dashboard;
