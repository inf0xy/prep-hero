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
  // const regex = /problem\/.*/;
  const regex = /\/(problem\/.*|notebook)/;

  useCustomScrollbar();

  return (
    <main>
      <Header />
      {children}
      {!regex.test(router.pathname) && <Footer />}
    </main>
  );
};

export default Layout;
