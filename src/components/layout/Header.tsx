import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { setTheme, getTheme, getProblemCounts, fetchUserData } from '@/store';
import UserMenu from '../user/UserMenu';
import classes from './Header.module.scss';

import LogoDark from './LogoDark';
import LogoLight from './LogoLight';
import ClockIconDark from '../icons/ClockIconDark';
import ClockIconLight from '../icons/ClockIconLight';
import Time from '../reusables/codeEditor/Time';

import variables from '@/styles/variables.module.scss';
import TimeSetter from '../reusables/codeEditor/TimeSetter';
import { useRouter } from 'next/router';

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const avatarRef = useRef<HTMLLabelElement>(null);

  const router = useRouter();

  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

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

  return (
    <header className={`${classes.header} ${classes[`header--${theme}`]}`}>
      <Link href="/" className={classes.logo}>
        {theme === 'dark' ? <LogoDark /> : <LogoLight />}
      </Link>
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
      <div className="flex space-x-10">
        {router.pathname.match(/^(.*?)\/problem\/(.*?)$/) && (
          <div className="flex space-x-4">
            <span className="self-center  pt-[2px]">
              <Time />
            </span>
            <div className="dropdown dropdown-bottom dropdown-end self-center pt-[1px]">
              <label tabIndex={0} className="cursor-pointer">
                {theme === 'dark' ? (
                  <ClockIconDark height={23} width={23} />
                ) : (
                  <ClockIconLight height={23} width={23} />
                )}
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
        <label
          className="swap swap-rotate cursor-pointer self-center mt-1"
          onClick={() => dispatch(setTheme())}
        >
          <svg
            className={`${
              theme === 'dark' ? 'swap-off' : 'swap-on'
            }  fill-current w-10 h-10`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className={`${
              theme === 'dark' ? 'swap-on' : 'swap-off'
            }  fill-current w-10 h-10`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

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
        )}
      </div>
    </header>
  );
};

export default Header;
