import { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import FolderOutlineIcon from '../icons/FolderOutlineIcon';
import PlusIcon from '../icons/PlusIcon';
import classes from './NotebookMobileNav.module.scss';

interface NotebookMobileNavProps {
  setFolderAction: Dispatch<SetStateAction<string>>;
  showFolderList: boolean;
  setShowFolderList: Dispatch<SetStateAction<boolean>>;
}

const NotebookMobileNav: React.FC<NotebookMobileNavProps> = ({
  setFolderAction,
  showFolderList,
  setShowFolderList
}) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className={`${classes['side-nav']} ${classes[`side-nav--${theme}`]}`}>
      <div className={classes['side-nav__content']}>
        <label
          htmlFor="modal__create-new-folder"
          className={`${classes['create-button']} ${
            classes[`create-button--${theme}`]
          }`}
          onClick={() => setFolderAction('create')}
        >
          <span className={classes['create-button__title']}>
            <PlusIcon width={31} height={31} />
          </span>
        </label>
        <button onClick={() => setShowFolderList(!showFolderList)}>
          <FolderOutlineIcon width={26} height={26} />
        </button>
      </div>
    </div>
  );
};

export default NotebookMobileNav;
