import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import classes from './Header.module.css';

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: '/auth/login' });
  };

  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <Image
          src="/prep-hero-logo.png"
          alt="prep-hero logo"
          width={85}
          height={85}
        />
      </Link>
      <nav>
        <ul className={classes['main-nav']}>
          {/* <li>
            <Link href="/about">Resources</Link>
          </li> */}
          <li>
            <Link href="/problems">Problems</Link>
          </li>
          {session && session.session.user.account_type === 'admin' && (
            <li>
              <Link href="/admin">Dashboard</Link>
            </li>
          )}
        </ul>
      </nav>
      {!session ? (
        <>
          <nav>
            <ul className={classes.auth}>
              <li className={classes.login}>
                <Link href="/auth/login">Login</Link>
              </li>
              <li className={classes.signup}>
                <Link href="/auth/signup">JOIN</Link>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <nav>
          <ul className={classes.auth}>
            <li className={classes.logout} onClick={handleLogout}>
              <p>Logout</p>
            </li>
            <li className={classes.avatar}>
              <Image
                src="/user.png"
                alt="avatar"
                width={32}
                height={32}
                className="white"
              />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
