import Head from 'next/head';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getTheme } from '@/store';
import UnauthorizedIcon from '@/components/icons/UnauthorizedIcon';

const Page403 = () => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTheme());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Forbidden</title>
      </Head>
      <div
        className={`${
          theme === 'dark'
            ? 'bg-[#181818] text-[#ffffffde]'
            : 'bg-[#fff] text-[#343036]'
        } min-h-screen min-w-screen flex flex-col items-center justify-center space-y-6`}
      >
        <h2 className="text-3xl">You are not authorized to access this page.</h2>
        <UnauthorizedIcon width={80} height={80} />
      </div>
    </>
  );
};

export default Page403;
