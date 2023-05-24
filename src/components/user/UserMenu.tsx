import { useSession } from 'next-auth/react';
import { useAppSelector } from '@/hooks/hooks';
import { useTransition, animated } from 'react-spring';
import Image from 'next/image';
import Link from 'next/link';
import classes from './UserMenu.module.scss';
import variables from '@/styles/variables.module.scss';

import { Dispatch, SetStateAction } from 'react';

type UserMenuProps = {
  showMenu: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
};

const UserMenu: React.FC<UserMenuProps> = ({ showMenu, onClose }) => {
  const { data: session } = useSession();
  const { theme } = useAppSelector((state) => state.theme);

  const fadeAnimation = useTransition(showMenu, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    config: { duration: 200 }
  });

  return (
    <>
      {fadeAnimation(
        (styles, item) =>
          item && (
            <animated.ul
              tabIndex={showMenu ? -1 : 0}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  onClose(false);
                }
              }}
              style={{ ...styles, zIndex: 100 }}
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
                onClick={() => onClose(false)}
              >
                My Profile
              </li>
              <li
                className={`transition duration-300 ease-in-out hover:bg-primary ${
                  theme === 'light' ? 'hover:text-white' : ''
                } w-full px-5 py-3 rounded-md cursor-pointer`}
                onClick={() => onClose(false)}
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
                <label
                  htmlFor="logout-confirm-modal"
                  className="cursor-pointer"
                >
                  Logout
                </label>
              </li>
            </animated.ul>
          )
      )}
    </>
    // <animated.div
    //   style={{
    //     ...fadeAnimation,
    //     zIndex: 100
    //   }}
    // >
    //   <ul
    //     tabIndex={showMenu ? -1 : 0}
    //     onBlur={() => onClose(false)}
    //     // onBlur={(event) => {
    //     //   if (!event.currentTarget.contains(event.relatedTarget)) {
    //     //     onClose(false);
    //     //   }
    //     // }}
    //     className={`dropdown-content shadow rounded-box w-[18rem] px-12 py-8 mt-3 flex flex-col space-y-3 ${
    //       classes['user-menu']
    //     } ${
    //       theme === 'dark'
    //         ? `bg-[${variables.darkBackground100}]`
    //         : 'bg-white text-gray-500'
    //     }`}
    //   >
    // <li className={`${classes['user-menu__avatar']} mb-3`}>
    //   <Image
    //     src="/user.png"
    //     alt="avatar"
    //     width={25}
    //     height={25}
    //     className="white"
    //   />
    //   <h3>{session && session.session.user.name}</h3>
    // </li>
    // <li
    //   className={`transition duration-300 ease-in-out hover:bg-primary ${
    //     theme === 'light' ? 'hover:text-white' : ''
    //   } w-full px-5 py-3 rounded-md cursor-pointer`}
    //   onClick={() => onClose(false)}
    // >
    //   My Profile
    // </li>
    // <li
    //   className={`transition duration-300 ease-in-out hover:bg-primary ${
    //     theme === 'light' ? 'hover:text-white' : ''
    //   } w-full px-5 py-3 rounded-md cursor-pointer`}
    //   onClick={() => onClose(false)}
    // >
    //   <Link
    //     href={
    //       session && session.session.user.account_type === 'admin'
    //         ? '/admin'
    //         : '/dashboard'
    //     }
    //   >
    //     Dashboard
    //   </Link>
    // </li>
    // <li
    //   className={`transition duration-300 ease-in-out hover:bg-primary ${
    //     theme === 'light' ? 'hover:text-white' : ''
    //   } w-full px-5 py-3 rounded-md cursor-pointer`}
    // >
    //   <label htmlFor="logout-confirm-modal" className="cursor-pointer">
    //     Logout
    //   </label>
    // </li>
    //   </ul>
    // </animated.div>
  );
};

export default UserMenu;
