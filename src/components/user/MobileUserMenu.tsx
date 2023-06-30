import { useEffect, useRef, RefObject } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import Image from 'next/image';
import Drawer from '../reusables/Drawer';
import {
  setNavigateDestination,
  setTimerReminder,
  setShowUserMenu,
  setTheme
} from '@/store';
import UserIcon from '../icons/UserIcon';
import DashboardIcon from '../icons/DashboardIcon';
import JournalIcon from '../icons/JournalIcon';
import LogoutIcon from '../icons/LogoutIcon';
import SmallClockIcon from '../icons/SmallClockIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import ThemeButton from '../reusables/ThemeButton';
import classes from './MobileUserMenu.module.scss';
import CurlyBracketsIcon from '../icons/CurlyBracketsIcon';
import ResourcesIcon from '../icons/ResourcesIcon';

type MobileUserMenuProps = {
  parentRef: RefObject<HTMLLabelElement>;
};

const MobileUserMenu: React.FC<MobileUserMenuProps> = ({ parentRef }) => {
  const { data: session } = useSession();
  const { theme, timer_reminder, showUserMenu } = useAppSelector((state) => {
    const { timer_reminder } = state.user;
    const { theme } = state.theme;
    const { showUserMenu } = state.navigate;
    return { theme, timer_reminder, showUserMenu };
  });
  const dispatch = useAppDispatch();
  const router = useRouter();

  const ulEl = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handler = (event: React.MouseEvent<HTMLElement>) => {
      if (!ulEl.current || parentRef?.current?.contains(event.target as Node)) {
        return;
      }
      if (!ulEl.current.contains(event.target as Node)) {
        dispatch(setShowUserMenu(false));
      }
    };

    document.addEventListener('click', handler as any, true);
    return () => {
      document.removeEventListener('click', handler as any);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = document.activeElement as HTMLElement;

    if (el && !showUserMenu) {
      el?.blur();
    } else if (el && showUserMenu) {
      el?.focus();
    }
  }, [showUserMenu]);

  const handleSetTimerReminder = async () => {
    try {
      await dispatch(setTimerReminder(!timer_reminder));
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleNavigateToSavedList = () => {
    dispatch(setNavigateDestination('saved-list'));
    dispatch(setShowUserMenu(false));
    router.push('/dashboard');
  };

  const handleDashboardClick = () => {
    dispatch(setShowUserMenu(false));
    if (session && session.session.user.account_type === 'admin') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  const handleNotebookClick = () => {
    dispatch(setShowUserMenu(false));
    router.push('/notebook');
  };

  return (
    <Drawer
      direction="right"
      showCloseButton={true}
      isOpen={showUserMenu}
      closeDrawer={() => dispatch(setShowUserMenu(false))}
    >
      <ul
        ref={ulEl}
        tabIndex={0}
        className={`${classes['mobile-user-menu']} ${
          classes[`mobile-user-menu--${theme}`]
        }`}
      >
        {session ? (
          <li
            className={`${classes['mobile-user-menu__item']} ${
              classes[`mobile-user-menu__item--${theme}`]
            } ${classes['mobile-user-menu__avatar']} ${
              classes[`mobile-user-menu__avatar--${theme}`]
            } mb-3`}
          >
            <span className={`${classes.avatar} ${classes[`avatar--${theme}`]}`}>
              <Image
                src="/user.png"
                alt="avatar"
                width={35}
                height={35}
                className="white"
              />
            </span>
            <h3>{session && session.session.user.name}</h3>
          </li>
        ) : (
          <>
            <li
              onClick={() => {
                dispatch(setShowUserMenu(false));
                router.push('/auth/signup');
              }}
              className={`${classes['mobile-user-menu__item']} ${
                classes[`mobile-user-menu__item--${theme}`]
              } ${classes.signup}`}
            >
              Sign Up
            </li>
            <li
              className={`${classes['divider-line']} ${
                classes[`divider-line--${theme}`]
              } ${classes[`divider-line--signup`]}`}
            />
          </>
        )}
        {session ? (
          <li
            className={`${classes['mobile-user-menu__item']} ${
              classes[`mobile-user-menu__item--${theme}`]
            } ${classes['my-profile']}`}
            onClick={() => dispatch(setShowUserMenu(false))}
          >
            <UserIcon />
            <span>My Profile</span>
          </li>
        ) : (
          <li
            onClick={() => {
              dispatch(setShowUserMenu(false));
              router.push('/auth/login');
            }}
            className={`${classes['mobile-user-menu__item']} ${
              classes[`mobile-user-menu__item--${theme}`]
            } ${classes.login}`}
          >
            <UserIcon />
            <span>Login</span>
          </li>
        )}
        <li
          className={`${classes['divider-line']} ${
            classes[`divider-line--${theme}`]
          }`}
        />
        <li
          className={`${classes['mobile-user-menu__item']} ${
            classes[`mobile-user-menu__item--${theme}`]
          }  ${classes.resources}`}
          onClick={() => {
            dispatch(setShowUserMenu(false));
            router.push('/resources');
          }}
        >
          <ResourcesIcon width={21} height={21} />
          <span>Resources</span>
        </li>
        <li
          className={`${classes['mobile-user-menu__item']} ${
            classes[`mobile-user-menu__item--${theme}`]
          } ${classes.problems}`}
          onClick={() => {
            dispatch(setShowUserMenu(false));
            router.push('/problems');
          }}
        >
          <CurlyBracketsIcon width={17} height={17} />
          <span>Problems</span>
        </li>
        <li
          className={`${classes['divider-line']} ${
            classes[`divider-line--${theme}`]
          }`}
        />
        {session && (
          <>
            <li
              className={`${classes['mobile-user-menu__item']} ${
                classes[`mobile-user-menu__item--${theme}`]
              } ${classes.dashboard}`}
              onClick={handleDashboardClick}
            >
              <DashboardIcon width={19} height={19} />
              <span>Dashboard</span>
            </li>
            <li
              className={`${classes['mobile-user-menu__item']} ${
                classes[`mobile-user-menu__item--${theme}`]
              } ${classes['saved-list']}`}
              onClick={handleNavigateToSavedList}
            >
              <BookmarkIcon />
              <span>Saved List</span>
            </li>

            <li
              className={`${classes['mobile-user-menu__item']} ${
                classes[`mobile-user-menu__item--${theme}`]
              } ${classes.notebook}`}
              onClick={handleNotebookClick}
            >
              <JournalIcon />
              <span>Notebook</span>
            </li>
            <li
              className={`${classes['mobile-user-menu__item']} ${
                classes[`mobile-user-menu__item--${theme}`]
              } ${classes['time-reminder']}`}
              onClick={handleSetTimerReminder}
            >
              <SmallClockIcon />
              <span>Timer Reminder</span>
              <input
                type="checkbox"
                className="toggle toggle-info"
                checked={timer_reminder}
                onChange={handleSetTimerReminder}
              />
            </li>
            <li
              className={`${classes['divider-line']} ${
                classes[`divider-line--${theme}`]
              }`}
            />
          </>
        )}
        <li
          className={`${classes['mobile-user-menu__item']} ${
            classes[`mobile-user-menu__item--${theme}`]
          } ${classes['theme-button']}`}
          onClick={() => dispatch(setTheme())}
        >
          <span>
            <ThemeButton />{' '}
          </span>
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </li>
        {session && (
          <li
            className={`${classes['mobile-user-menu__item']} ${
              classes[`mobile-user-menu__item--${theme}`]
            } ${classes.logout}`}
            onClick={() =>
              signOut({ redirect: true, callbackUrl: '/auth/login' })
            }
          >
            <LogoutIcon />
            <span>Logout</span>
          </li>
        )}
      </ul>
    </Drawer>
  );
};

export default MobileUserMenu;
