import { useEffect, useRef, RefObject, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import Image from 'next/image';
import Drawer from '../reusables/Drawer';
import {
  setNavigateDestination,
  setTimerReminder,
  setShowUserMenu
} from '@/store';
import UserIcon from '../icons/UserIcon';
import DashboardIcon from '../icons/DashboardIcon';
import JournalIcon from '../icons/JournalIcon';
import LogoutIcon from '../icons/LogoutIcon';
import SmallClockIcon from '../icons/SmallClockIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import classes from './MobileUserMenu.module.scss';
import CodeBracketIcon from '../icons/CodeBracketIcon';
import ThemeButton from '../reusables/ThemeButton';

type MobileUserMenuProps = {
  // showUserMenu: boolean;
  // setShowUserMenu: Dispatch<SetStateAction<boolean>>;
  parentRef: RefObject<HTMLLabelElement>;
};

const MobileUserMenu: React.FC<MobileUserMenuProps> = ({
  // showUserMenu,
  // setShowUserMenu,
  parentRef
}) => {
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
            <Image
              src="/user.png"
              alt="avatar"
              width={35}
              height={35}
              className="white"
            />

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
              } ${classes.signup} mb-3`}
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
            }`}
            onClick={() => dispatch(setShowUserMenu(false))}
          >
            <UserIcon />
            My Profile
          </li>
        ) : (
          <li
            onClick={() => {
              dispatch(setShowUserMenu(false));
              router.push('/auth/login');
            }}
            className={`${classes['mobile-user-menu__item']} ${
              classes[`mobile-user-menu__item--${theme}`]
            } `}
          >
            <UserIcon /> Login
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
          } `}
          onClick={() => {
            dispatch(setShowUserMenu(false));
            router.push('/resources');
          }}
        >
          Resources
        </li>
        <li
          className={`${classes['mobile-user-menu__item']} ${
            classes[`mobile-user-menu__item--${theme}`]
          } `}
          onClick={() => {
            dispatch(setShowUserMenu(false));
            router.push('/problems');
          }}
        >
          <CodeBracketIcon width={8} height={8} /> Problems
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
              }`}
              onClick={handleDashboardClick}
            >
              <DashboardIcon width={19} height={19} />
              Dashboard
            </li>
            <li
              className={`${classes['mobile-user-menu__item']} ${
                classes[`mobile-user-menu__item--${theme}`]
              }`}
              onClick={handleNavigateToSavedList}
            >
              <BookmarkIcon />
              Saved List
            </li>

            <li
              className={`${classes['mobile-user-menu__item']} ${
                classes[`mobile-user-menu__item--${theme}`]
              }`}
              onClick={handleNotebookClick}
            >
              <JournalIcon />
              Notebook
            </li>
            <li
              className={`${classes['mobile-user-menu__item']} ${
                classes[`mobile-user-menu__item--${theme}`]
              }`}
              onClick={handleSetTimerReminder}
            >
              <SmallClockIcon /> Timer Reminder
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
        >
          <span>
            <ThemeButton />{' '}
          </span>
          <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
        </li>
        {session && (
          <li
            className={`${classes['mobile-user-menu__item']} ${
              classes[`mobile-user-menu__item--${theme}`]
            }`}
            onClick={() =>
              signOut({ redirect: true, callbackUrl: '/auth/login' })
            }
          >
            <LogoutIcon /> Logout
          </li>
        )}
      </ul>
    </Drawer>
  );
};

export default MobileUserMenu;
