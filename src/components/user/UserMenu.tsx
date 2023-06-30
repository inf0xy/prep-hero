import { useEffect, useRef, RefObject } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import Image from 'next/image';
import { setNavigateDestination, setTimerReminder, setShowUserMenu } from '@/store';
import UserIcon from '../icons/UserIcon';
import DashboardIcon from '../icons/DashboardIcon';
import JournalIcon from '../icons/JournalIcon';
import LogoutIcon from '../icons/LogoutIcon';
import SmallClockIcon from '../icons/SmallClockIcon';
import BookmarkIcon from '../icons/BookmarkIcon';
import classes from './UserMenu.module.scss';

type UserMenuProps = {
  parentRef: RefObject<HTMLLabelElement>;
};

const UserMenu: React.FC<UserMenuProps> = ({
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
    };
  }

  const handleNotebookClick = () => {
    dispatch(setShowUserMenu(false));
    router.push('/notebook');
  }

  return (
    <ul
      ref={ulEl}
      tabIndex={0}
      className={`dropdown-content shadow  ${classes['user-menu']} ${
        classes[`user-menu--${theme}`]
      }`}
    >
      <li
        className={`${classes['user-menu__item']} ${
          classes[`user-menu__item--${theme}`]
        } ${classes['user-menu__avatar']} mb-3`}
      >
        <Image
          src="/user.png"
          alt="avatar"
          width={25}
          height={25}
          className="white"
        />
        <h3>{session && session.session.user.name}</h3>
      </li>
      <li
        className={`${classes['user-menu__item']} ${
          classes[`user-menu__item--${theme}`]
        } `}
        onClick={() => dispatch(setShowUserMenu(false))}
      >
        <UserIcon />
        My Profile
      </li>
      <li
        className={`${classes['user-menu__item']} ${
          classes[`user-menu__item--${theme}`]
        }`}
        onClick={handleDashboardClick}
      >
        <DashboardIcon width={19} height={19} />
          Dashboard
      </li>
      <li
        className={`${classes['user-menu__item']} ${
          classes[`user-menu__item--${theme}`]
        }`}
        onClick={handleNavigateToSavedList}
      >
        <BookmarkIcon />Saved List
      </li>

      <li
        className={`${classes['user-menu__item']} ${
          classes[`user-menu__item--${theme}`]
        }`}
        onClick={handleNotebookClick}
      >
        <JournalIcon />Notebook
      </li>
      <li
        className={`${classes['user-menu__item']} ${
          classes[`user-menu__item--${theme}`]
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
        className={`${classes['user-menu__item']} ${
          classes[`user-menu__item--${theme}`]
        }`}
        onClick={() => signOut({ redirect: true, callbackUrl: '/auth/login' })}
      >
        <LogoutIcon /> Logout
      </li>
    </ul>
  );
};

export default UserMenu;
