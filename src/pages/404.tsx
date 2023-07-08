import Head from 'next/head';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getTheme, setHomePageLoading } from '@/store';
import PageNotFoundIcon from '@/components/icons/PageNotFoundIcon';

const Page404 = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTheme());
    dispatch(setHomePageLoading(false));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div
        className={`${
          theme === 'dark'
            ? 'bg-[#181818] text-[#ffffffde]'
            : 'bg-[#fff] text-[#343036]'
        } min-h-screen min-w-screen flex flex-col items-center justify-center space-y-6`}
      >
        <h2 className="text-3xl">Page Not Found</h2>
        <PageNotFoundIcon width={70} height={70} />
      </div>
    </>
  );
};

export default Page404;
