import { ReactNode, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setHomePageLoading } from '@/store';
import useCustomScrollbar from '@/hooks/useCustomScrollbar';
import Header from './Header';
import Footer from './Footer';
import Loading from '../reusables/Loading';
import variables from '@/styles/variables.module.scss';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const regex = /\/(problem\/.*|notebook)/;

  const { pageLoading, theme, showUserMenu } = useAppSelector((state) => {
    const { pageLoading } = state.navigate;
    const { theme } = state.theme;
    const { showUserMenu } = state.navigate;
    return { pageLoading, theme, showUserMenu };
  });

  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && router.pathname === '/') {
      router.push('/problems');
    } else if (pageLoading && (session === null || router.pathname !== '/')) {
      dispatch(setHomePageLoading(false));
    }
  }, [dispatch, pageLoading, router, session]);

  const headerRef = useRef<HTMLElement>(null);

  useCustomScrollbar();

  const backgroundColor =
    theme === 'dark'
      ? router.pathname === '/' || router.pathname === '/resources'
        ? variables.darkBackground600
        : variables.darkBackground400
      : variables.lightBackground0;
  const placeHolder = <div className={`min-h-screen ${backgroundColor}`} />;

  return (
    <main
      className={`relative min-w-screen overflow-x-hidden max-w-full ${
        showUserMenu
          ? `${
              !router.pathname.includes('auth') ? 'pr-[8px]' : ''
            } h-screen overflow-y-hidden`
          : ''
      }`}
    >
      <div
        id="drawer-left"
        className="absolute top-0 left-0 w-[70vw] min-h-full h-full w-fit max-w-screen z-50 overflow-hidden"
      />
      <div
        id="drawer-right"
        className="absolute top-0 right-0 w-[70vw] min-h-full h-full w-fit max-w-screen z-50 overflow-hidden"
      />
      {pageLoading || pageLoading === undefined ? (
        <Loading />
      ) : (
        <>
          {!router.pathname.includes('auth') && <Header headerRef={headerRef} />}
          {!headerRef.current && !router.pathname.includes('auth') ? placeHolder : children}
          {!regex.test(router.pathname) && headerRef.current && !router.pathname.includes('auth') && <Footer />}
        </>
      )}
    </main>
  );
};

export default Layout;
