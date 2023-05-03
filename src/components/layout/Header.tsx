import { useEffect, useRef, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { setTheme, getTheme } from '@/store';
import ConfirmPanel from '../reusables/ConfirmPanel';
import UserMenu from '../user/UserMenu';
import LightIcon from '../icons/LightIcon';
import DarkIcon from '../icons/DarkIcon';
import classes from './Header.module.scss';

import LogoDark from './LogoDark';
import LogoLight from './LogoLight';
import LightIcon2 from '../icons/LightIcon';
import DarkIcon2 from '../icons/DarkIcon';

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
  }, [dispatch]);

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: '/auth/login' });
  };

  return (
    <header className={`${classes.header} ${classes[`header--${theme}`]}`}>
      <Link href="/" className={classes.logo}>
        {theme === 'dark' ? <LogoDark /> : <LogoLight />}
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
      <div className="flex space-x-12">
        <div className="cursor-pointer" onClick={() => dispatch(setTheme())}>
          {theme === 'dark' ? (
            <LightIcon2 width={33} height={33} />
          ) : (
            <DarkIcon2 width={33} height={33} />
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
