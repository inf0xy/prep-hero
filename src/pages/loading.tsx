import Head from 'next/head';
import Loading from '@/components/reusables/Loading';

const LoadingPage = () => {
  return (
    <>
      <Head>
        <title>Loading</title>
      </Head>
      <Loading />
    </>
  );
};

export default LoadingPage;
