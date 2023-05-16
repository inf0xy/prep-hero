import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const regex = /problem\/.*/;

  return (
    <main>
      <Header />
      {children}
      {!regex.test(router.pathname) && <Footer />}
    </main>
  );
};

export default Layout;
