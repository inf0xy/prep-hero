import { RefObject, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import {
  getTheme,
  getProblemCounts,
  fetchUserData,
  toggleSavedList,
  setShowUserMenu,
  setTheme,
  setShowProblemCodeEditor
} from '@/store';
import UserMenu from '../user/UserMenu';
import MenuIcon from '../icons/MenuIcon';
import MobileUserMenu from '../user/MobileUserMenu';
import ThemeButton from '../reusables/ThemeButton';
import LogoDark from './LogoDark';
import LogoLight from './LogoLight';
import ClockIcon from '../icons/ClockIcon';
import TimeSetter from '../reusables/codeEditor/TimeSetter';
import Time from '../reusables/codeEditor/Time';
import ShuffleButton from '../reusables/ShuffleButton';
import Tooltip from '../reusables/Tooltip';
import variables from '@/styles/variables.module.scss';
import classes from './Header.module.scss';
import CurlyBracketsIcon from '../icons/CurlyBracketsIcon';

type HeaderProps = {
  headerRef: RefObject<HTMLElement>;
};

const Header: React.FC<HeaderProps> = ({ headerRef }) => {
  const avatarRef = useRef<HTMLLabelElement>(null);
  const { theme, showUserMenu, showProblemCodeEditor, savedListOpen } =
    useAppSelector((state) => {
      const { theme } = state.theme;
      const { showUserMenu, showProblemCodeEditor, savedListOpen } =
        state.navigate;
      return { theme, showUserMenu, showProblemCodeEditor, savedListOpen };
    });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 990px)' });
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  });

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
      {!isTabletOrMobile && (
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
      )}
      {router.pathname.match(/\/problem\/.*/) && (
        <div className={classes['problem__action-buttons']}>
          {!isMobile ? (
            <>
              {session && (
                <button
                  id="saved list"
                  aria-label="saved list"
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
                <span role="button" aria-label="pick random">
                  <ShuffleButton />
                </span>
              </Tooltip>
            </>
          ) : (
            <button
              id="code editor"
              aria-label="code editor"
              className={`${!session && 'translate-x-[-2.5rem]'} ${
                classes['show-editor-button']
              } ${classes[`show-editor-button--${theme}`]} ${
                showProblemCodeEditor
                  ? classes[`show-editor-button--active`]
                  : ''
              }`}
              onClick={() =>
                dispatch(setShowProblemCodeEditor(!showProblemCodeEditor))
              }
            >
              <CurlyBracketsIcon
                changeWithTheme={showProblemCodeEditor ? false : true}
              />
            </button>
          )}
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
            <span
              className={`${isMobile && 'scale-125 pr-2'} self-center pt-[2px]`}
            >
              <Time />
            </span>
            <div className="dropdown dropdown-bottom dropdown-end self-center pt-[1px]">
              <label tabIndex={0} className="cursor-pointer">
                <span role="button" aria-label="timer">
                  <ClockIcon
                    height={!isMobile ? 23 : 26}
                    width={!isMobile ? 23 : 26}
                  />
                </span>
              </label>
              <div
                tabIndex={0}
                className={`dropdown-content mt-4 px-8 py-12 shadow rounded-box ${
                  isMobile
                    ? 'translate-x-10 w-[30rem] h-[26rem]'
                    : 'w-fit h-[22rem]'
                } bg-[${
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
        {isTabletOrMobile ? (
          <>
            <span
              className={classes['menu-icon']}
              onClick={() => {
                if (savedListOpen) {
                  dispatch(toggleSavedList());
                }
                dispatch(setShowUserMenu(true));
              }}
            >
              <MenuIcon width={25} />
            </span>
            <MobileUserMenu parentRef={avatarRef} />
          </>
        ) : (
          <>
            <ThemeButton switchTheme={() => dispatch(setTheme())} />
            {!session ? (
              !router.pathname.includes('/auth') ? (
                <nav>
                  <ul className={classes.auth}>
                    <li
                      className={`${classes.login} ${
                        classes[`login--${theme}`]
                      }`}
                      onClick={() => router.push('/auth/login')}
                    >
                      Login
                    </li>
                    <li
                      className={`${classes.signup} ${
                        classes[`signup--${theme}`]
                      }`}
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
                  onClick={() => dispatch(setShowUserMenu(!showUserMenu))}
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
                <UserMenu parentRef={avatarRef} />
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
