import { RefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import {
  setTheme,
  getTheme,
  getProblemCounts,
  fetchUserData,
  toggleSavedList,
  setShowUserMenu
} from '@/store';
import UserMenu from '../user/UserMenu';

import LogoDark from './LogoDark';
import LogoLight from './LogoLight';
import ClockIcon from '../icons/ClockIcon';
import TimeSetter from '../reusables/codeEditor/TimeSetter';
import Time from '../reusables/codeEditor/Time';
import ShuffleButton from '../reusables/ShuffleButton';
import Tooltip from '../reusables/Tooltip';
import variables from '@/styles/variables.module.scss';
import classes from './Header.module.scss';

import { useMediaQuery } from 'react-responsive';
import MenuIcon from '../icons/MenuIcon';
import MobileUserMenu from '../user/MobileUserMenu';
import ThemeButton from '../reusables/ThemeButton';

type HeaderProps = {
  headerRef: RefObject<HTMLElement>;
};

const Header: React.FC<HeaderProps> = ({ headerRef }) => {
  const avatarRef = useRef<HTMLLabelElement>(null);

  const router = useRouter();

  const { theme, showUserMenu } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { showUserMenu } = state.navigate;
    return { theme, showUserMenu };
  });

  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  });

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 990px)' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      await dispatch(fetchUserData());
    };

    try {
      fetchUserInfo();
      dispatch(getProblemCounts());
    } catch (err) {
      console.error(err);
    }
    dispatch(getTheme());
  }, [dispatch]);

  const handleLogoClick = () => {
    if (session) {
      router.push('/problems');
    } else {
      router.push('/');
    }
  };

  return (
    <header
      ref={headerRef}
      className={`${classes.header} ${classes[`header--${theme}`]} ${
        router.pathname === '/' ? classes['in-home-page'] : ''
      }`}
    >
      <span className={classes.logo} onClick={handleLogoClick}>
        {theme === 'dark' ? <LogoDark /> : <LogoLight />}
      </span>
      <nav className="h-full">
        <ul className={classes['main-nav']}>
          <li>
            <Link href="/resources">Resources</Link>
          </li>
          <li>
            <Link href="/problems">Problems</Link>
          </li>
        </ul>
      </nav>
      {router.pathname.match(/\/problem\/.*/) && (
        <div className={classes['problem__action-buttons']}>
          {session && (
            <button
              className={classes['saved-list-button']}
              onClick={() => dispatch(toggleSavedList())}
            >
              Saved List
            </button>
          )}
          <Tooltip
            direction="bottom"
            text="Pick random question"
            zIndex={30}
            className="w-[17rem] py-4"
            extraStyle={{
              left: '3rem',
              backgroundColor: variables.darkBackground200
            }}
          >
            <ShuffleButton />
          </Tooltip>
        </div>
      )}
      <div
        className={classes['header-right-group']}
        style={{
          marginLeft: router.pathname.match(/\/problem\/.*/) ? 'unset' : 'auto'
        }}
      >
        {session && router.pathname.match(/^(.*?)\/problem\/(.*?)$/) && (
          <div className="flex space-x-4">
            <span className="self-center  pt-[2px]">
              <Time />
            </span>
            <div className="dropdown dropdown-bottom dropdown-end self-center pt-[1px]">
              <label tabIndex={0} className="cursor-pointer">
                <ClockIcon height={23} width={23} />
              </label>
              <div
                tabIndex={0}
                className={`dropdown-content mt-4 px-8 py-12 shadow rounded-box w-fit h-[22rem] bg-[${
                  theme === 'dark'
                    ? variables.darkBackground100
                    : variables.lightBackground0
                }]`}
              >
                <TimeSetter />
              </div>
            </div>
          </div>
        )}
        <ThemeButton />
        <span
          className="cursor-pointer"
          onClick={() => dispatch(setShowUserMenu(true))}
        >
          <MenuIcon width={25} />
        </span>
        <MobileUserMenu
          // showUserMenu={showUserMenu}
          // setShowUserMenu={setShowUserMenu}
          parentRef={avatarRef}
        />
        {/* {!session ? (
          !router.pathname.includes('/auth') ? (
            <nav>
              <ul className={classes.auth}>
                <li
                  className={`${classes.login} ${classes[`login--${theme}`]}`}
                  onClick={() => router.push('/auth/login')}
                >
                  Login
                </li>
                <li
                  className={`${classes.signup} ${classes[`signup--${theme}`]}`}
                  onClick={() => router.push('/auth/signup')}
                >
                  JOIN
                </li>
              </ul>
            </nav>
          ) : null
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              onClick={() => setShowUserMenu(!showUserMenu)}
              ref={avatarRef}
            >
              <Image
                src="/user.png"
                alt="avatar"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </label>
            <UserMenu
              showUserMenu={showUserMenu}
              setShowUserMenu={setShowUserMenu}
              parentRef={avatarRef}
            />
          </div>
        )} */}
      </div>
    </header>
  );
};

export default Header;
