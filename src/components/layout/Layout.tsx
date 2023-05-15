import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <main>
      <Header />
      {children}
      {!router.pathname.includes('/problem') && <Footer />}
    </main>
  );
};

export default Layout;
