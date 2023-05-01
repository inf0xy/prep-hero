import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTransition, animated } from 'react-spring';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import ConfirmPanel from '../reusables/ConfirmPanel';
import classes from './Header.module.css';
import UserMenu from '../user/UserMenu';

const Header = () => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [confirmPanelVisible, setConfirmPanelVisible] = useState(false);
  const userMenuTransition = useTransition(userMenuVisible, {
    from: { opacity: 1 },
    leave: { opacity: 0 }
  });

  const avatarRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

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
          <li>
            <Link href="/about">Resources</Link>
          </li>
          <li>
            <Link href="/problems">Problems</Link>
          </li>
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
        <div
          ref={avatarRef}
          className={classes.avatar}
          onClick={() => setUserMenuVisible((prev) => !prev)}
        >
          <Image
            src="/user.png"
            alt="avatar"
            width={32}
            height={32}
            className="white"
          />
          {userMenuTransition((style, item) =>
            item ? (
              <animated.div style={style}>
                <UserMenu
                  onClose={setUserMenuVisible}
                  onTriggerLogout={setConfirmPanelVisible}
                  avatarRef={avatarRef}
                />
              </animated.div>
            ) : null
          )}
        </div>
      )}
      {confirmPanelVisible && (
        <ConfirmPanel
          headerText="Are you sure?"
          message="You are about to log out."
          cancelText="Cancel"
          confirmText="Logout"
          onCancel={() => setConfirmPanelVisible(false)}
          onConfirm={handleLogout}
        />
      )}
    </header>
  );
};

export default Header;
