import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/hooks/hooks';
import Image from 'next/image';
import Link from 'next/link';
import classes from './UserMenu.module.scss';
import variables from '@/styles/variables.module.scss';

const UserMenu = () => {
  const { data: session } = useSession();
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <ul
      tabIndex={0}
      className={`dropdown-content shadow rounded-box w-[18rem] px-12 py-8 mt-3 flex flex-col space-y-3 ${classes['user-menu']} ${
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
      >
        My Profile
      </li>
      <li
        className={`transition duration-300 ease-in-out hover:bg-primary ${
          theme === 'light' ? 'hover:text-white' : ''
        } w-full px-5 py-3 rounded-md cursor-pointer`}
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
      >
        <label htmlFor="logout-confirm-modal" className="cursor-pointer">
          Logout
        </label>
      </li>
    </ul>
  );
};

export default UserMenu;
