import { Dispatch, SetStateAction } from 'react';
import FolderItem from './FolderItem';
import Drawer from '../reusables/Drawer';
import classes from './NotebookFolderList.module.scss';
import { useAppSelector } from '@/hooks/hooks';
import XIcon from '../icons/XIcon';

interface NotebookFolderListProps {
  folderNames: string[];
  selectedFolder: string | null;
  showFolderList: boolean;
  setShowFolderList: Dispatch<SetStateAction<boolean>>;
  setSelectedFolder: Dispatch<SetStateAction<string | null>>;
  setActionFolderName: Dispatch<SetStateAction<string | null>>;
  setFolderAction: Dispatch<SetStateAction<string>>;
}

const NotebookFolderList: React.FC<NotebookFolderListProps> = ({
  folderNames,
  selectedFolder,
  showFolderList,
  setShowFolderList,
  setSelectedFolder,
  setActionFolderName,
  setFolderAction
}) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Drawer
      direction="left"
      isOpen={showFolderList}
      showCloseButton={false}
      hideBorder={false}
    >
      <div
        className={classes['notebook__mobile-folder-list']}
      >
        <div
          className={`${classes['folder-list__wrapper']} ${
            classes[`folder-list__wrapper--${theme}`]
          }`}
        >
          <div className={classes['close-button__wrapper']}>
            <button
              className={`${classes['close-folder-list__button']} ${
                classes[`close-folder-list__button--${theme}`]
              }`}
              onClick={() => setShowFolderList(false)}
            >
              <XIcon />
            </button>
          </div>
          <ul
            className={`${classes['folders']} ${classes[`folders--${theme}`]}`}
          >
            {folderNames.map((el) => (
              <FolderItem
                key={el}
                folderName={el}
                selectedFolder={selectedFolder}
                setSelectedFolder={setSelectedFolder}
                setActionFolderName={setActionFolderName}
                setFolderAction={setFolderAction}
                setShowFolderList={setShowFolderList}
              />
            ))}
          </ul>
        </div>
      </div>
    </Drawer>
  );
};

export default NotebookFolderList;
