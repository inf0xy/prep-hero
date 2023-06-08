import { useEffect, useRef, RefObject } from 'react';
import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/hooks/hooks';
import Image from 'next/image';
import Link from 'next/link';
import classes from './UserMenu.module.scss';
import variables from '@/styles/variables.module.scss';

import { Dispatch, SetStateAction } from 'react';

type UserMenuProps = {
  showUserMenu: boolean;
  setShowUserMenu: Dispatch<SetStateAction<boolean>>;
  parentRef: RefObject<HTMLLabelElement>;
};

const UserMenu: React.FC<UserMenuProps> = ({
  showUserMenu,
  setShowUserMenu,
  parentRef
}) => {
  const { data: session } = useSession();
  const { theme } = useAppSelector((state) => state.theme);

  const ulEl = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handler = (event: React.MouseEvent<HTMLElement>) => {
      if (!ulEl.current || parentRef?.current?.contains(event.target as Node)) {
        return;
      }
      if (!ulEl.current.contains(event.target as Node)) {
        setShowUserMenu(false);
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

  return (
    <ul
      ref={ulEl}
      tabIndex={0}
      className={`dropdown-content shadow rounded-box w-[18rem] px-12 py-8 mt-3 flex flex-col space-y-3 ${
        classes['user-menu']
      } ${
        theme === 'dark'
          ? `bg-[${variables.darkBackground100}]`
          : 'bg-white text-gray-500'
      }`}
    >
      <li className={`${classes['user-menu__avatar']} mb-3`}>
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
        className={`transition duration-300 ease-in-out hover:bg-primary ${
          theme === 'light' ? 'hover:text-white' : ''
        } w-full px-5 py-3 rounded-md cursor-pointer`}
        onClick={() => setShowUserMenu(false)}
      >
        My Profile
      </li>
      <li
        className={`transition duration-300 ease-in-out hover:bg-primary ${
          theme === 'light' ? 'hover:text-white' : ''
        } w-full px-5 py-3 rounded-md cursor-pointer`}
        onClick={() => setShowUserMenu(false)}
      >
        <Link
          href={
            session && session.session.user.account_type === 'admin'
              ? '/admin'
              : '/dashboard'
          }
        >
          Dashboard
        </Link>
      </li>
      <li
        className={`transition duration-300 ease-in-out hover:bg-primary ${
          theme === 'light' ? 'hover:text-white' : ''
        } w-full px-5 py-3 rounded-md cursor-pointer`}
        onClick={() => setShowUserMenu(false)}
      >
        <Link href="/notebook">Notebook</Link>
      </li>
      <li
        className={`transition duration-300 ease-in-out hover:bg-primary ${
          theme === 'light' ? 'hover:text-white' : ''
        } w-full px-5 py-3 rounded-md cursor-pointer`}
      >
        <label htmlFor="logout-confirm-modal" className="cursor-pointer">
          Logout
        </label>
      </li>
    </ul>
  );
};

export default UserMenu;
