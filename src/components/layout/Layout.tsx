import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import useCustomScrollbar from '@/hooks/useCustomScrollbar';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setHomePageLoading } from '@/store';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const regex = /\/(problem\/.*|notebook)/;

  const [headerIsRendered, setHeaderIsRendered] = useState(false);
  const { pageLoading } = useAppSelector(state => state.navigate);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pageLoading && router.pathname !== '/') {
      dispatch(setHomePageLoading(false));
    }
  }, [dispatch, pageLoading, router]);

  useEffect(() => {
    if (pageLoading) {
      setHeaderIsRendered(true);
    }
  }, [pageLoading])

  useCustomScrollbar();

  return (
    <main className="relative">
      <div
        id="drawer-left"
        className="absolute top-0 left-0 w-[70vw] min-h-full h-full w-fit max-w-screen z-50 overflow-hidden"
      />
      <div
        id="drawer-right"
        className="absolute top-0 right-0 w-[70vw] min-h-full h-full w-fit max-w-screen z-50 overflow-hidden"
      />
      {!pageLoading && <Header />}
      {headerIsRendered && children}
      {/* {children} */}
      {!regex.test(router.pathname) && !pageLoading && <Footer />}
    </main>
  );
};

export default Layout;
