import { useEffect, useRef, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { setTheme, getTheme, getProblemCounts } from '@/store';
import ConfirmPanel from '../reusables/ConfirmPanel';
import UserMenu from '../user/UserMenu';
import classes from './Header.module.scss';

import LogoDark from './LogoDark';
import LogoLight from './LogoLight';
import LightIcon from '../icons/LightIcon';
import DarkIcon from '../icons/DarkIcon';

const Header = () => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [confirmPanelVisible, setConfirmPanelVisible] = useState(false);
  const userMenuTransition = useTransition(userMenuVisible, {
    from: { opacity: 1 },
    leave: { opacity: 0 }
  });
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const avatarRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  useEffect(() => {
    dispatch(getTheme());
    dispatch(getProblemCounts());
  }, [dispatch]);

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: '/auth/login' });
  };

  return (
    <header className={`${classes.header} ${classes[`header--${theme}`]}`}>
      <Link href="/" className={classes.logo}>
        {theme === 'dark' ? <LogoDark /> : <LogoLight />}
      </Link>
      <nav className="h-full">
        <ul className={classes['main-nav']}>
          <li>
            <Link href="/about">Resources</Link>
          </li>
          <li>
            <Link href="/problems">Problems</Link>
          </li>
        </ul>
      </nav>
      <div className="flex space-x-12">
        <div
          className="cursor-pointer self-center"
          onClick={() => dispatch(setTheme())}
        >
          {theme === 'dark' ? (
            <LightIcon width={30} height={30} />
          ) : (
            <DarkIcon width={30} height={30} />
          )}
        </div>

        {!session ? (
          <>
            <nav>
              <ul className={classes.auth}>
                <li
                  className={`${classes.login} ${classes[`login--${theme}`]}`}
                >
                  <Link href="/auth/login">Login</Link>
                </li>
                <li
                  className={`${classes.signup} ${classes[`signup--${theme}`]}`}
                >
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
            {/* {userMenuVisible && (
              <UserMenu
                onClose={setUserMenuVisible}
                onTriggerLogout={setConfirmPanelVisible}
                avatarRef={avatarRef}
              />
            )} */}
          </div>
        )}
      </div>
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
