import { ReactNode, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth/core/types';
import { useMediaQuery } from 'react-responsive';
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
  const [loadedSession, setLoadedSession] = useState<
    Session | undefined | null
  >(undefined);

  const router = useRouter();
  const regex = /\/(problem\/.*|notebook)/;

  const { pageLoading, theme, showUserMenu } = useAppSelector((state) => {
    const { pageLoading } = state.navigate;
    const { theme } = state.theme;
    const { showUserMenu } = state.navigate;
    return { pageLoading, theme, showUserMenu };
  });

  const dispatch = useAppDispatch();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 990px)' });
  const isSmallMobile = useMediaQuery({ query: '(max-width: 501px)' });

  useEffect(() => {
    getSession().then((session) => setLoadedSession(session));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentPath = decodeURI(router.asPath);

    if (currentPath) {
      if (
        currentPath === '/404' ||
        currentPath === '/403' ||
        currentPath === '/problems' ||
        currentPath === '/resources' ||
        currentPath.includes('/problem') ||
        ((currentPath === '/' ||
          currentPath === '/auth/login' ||
          currentPath === '/auth/signup') &&
          loadedSession === null) ||
        ((currentPath === '/dashboard' || currentPath === '/notebook') &&
          loadedSession)
      ) {
        dispatch(setHomePageLoading(false));
        return;
      }

      getSession().then((session) => {
        if (session !== loadedSession) {
          setLoadedSession(session);
        }

        // WITHOUT session
        if (!session) {
          if (currentPath === '/admin' || currentPath.match(/\/admin\/*./)) {
            router.push('/403');
          } else if (
            currentPath === '/dashboard' ||
            currentPath === '/notebook'
          ) {
            router.push('/auth/login');
          }
          // WITH session
        } else {
          if (
            (currentPath === '/admin' || currentPath.match(/\/admin\/*./)) &&
            session?.session.user.account_type !== 'admin'
          ) {
            router.push('/403');
          } else if (
            currentPath === '/' ||
            currentPath === '/auth/login' ||
            currentPath === '/auth/signup'
          ) {
            router.push('/problems');
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, router.asPath, loadedSession]);

  const headerRef = useRef<HTMLElement>(null);

  useCustomScrollbar();

  const backgroundColor =
    theme === 'dark'
      ? router.pathname === '/' || router.pathname === '/resources'
        ? variables.darkBackground600
        : variables.darkBackground400
      : variables.lightBackground0;
  const placeHolder = <div className={`min-h-screen ${backgroundColor}`} />;

  const excludedRoutes = [/\/auth\/.*/, /\/problem\/.*/, /\/dashboard/];

  if (router.pathname === '/404' || router.pathname === '/403') {
    return <>{children}</>;
  }

  return (
    <main
      className={`relative min-w-screen overflow-x-hidden max-w-full ${
        showUserMenu && isTabletOrMobile
          ? `${
              excludedRoutes.every((el) => !router.pathname.match(el)) &&
              !isSmallMobile
                ? 'pr-[8px]'
                : ''
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
          {!router.pathname.includes('auth') && (
            <Header headerRef={headerRef} />
          )}
          {!headerRef.current && !router.pathname.includes('auth')
            ? placeHolder
            : children}
          {!regex.test(router.pathname) &&
            headerRef.current &&
            !router.pathname.includes('auth') && <Footer />}
        </>
      )}
    </main>
  );
};

export default Layout;
