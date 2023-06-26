import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import useCustomScrollbar from '@/hooks/useCustomScrollbar';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const regex = /\/(problem\/.*|notebook)/;

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
      <Header />
      {children}
      {!regex.test(router.pathname) && <Footer />}
    </main>
  );
};

export default Layout;
