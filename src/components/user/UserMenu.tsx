import {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  RefObject
} from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import classes from './UserMenu.module.css';

type UserMenuProps = {
  avatarRef: RefObject<HTMLDivElement>;
  onClose: Dispatch<SetStateAction<boolean>>;
  onTriggerLogout: Dispatch<SetStateAction<boolean>>;
};

const UserMenu: React.FC<UserMenuProps> = ({
  onClose,
  onTriggerLogout,
  avatarRef
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  console.log(session);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      !avatarRef.current?.contains(event.target as Node)
    ) {
      onClose(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${classes['user-menu']}`}
    >
      <div className={classes['user-menu__nav-items']}>
        <div className={classes['user-menu__avatar']}>
          <Image
            src="/user.png"
            alt="avatar"
            width={25}
            height={25}
            className="white"
          />
          <h3>{session && session.session.user.name}</h3>
        </div>
        <ul className={classes['user-menu__items']}>
          <li>My Profile</li>
          <li>
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
          <li onClick={() => onTriggerLogout(true)}>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
