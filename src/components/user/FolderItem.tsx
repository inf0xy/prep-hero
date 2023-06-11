import { useAppSelector } from '@/hooks/hooks';
import { Dispatch, SetStateAction } from 'react';
import EllipsisVerticalIcon from '../icons/EllipsisVerticalIcon';
import FolderOpenIcon from '../icons/FolderOpen';
import FolderClosedIcon from '../icons/FolderClosed';
import classes from './ActionMenu.module.scss';
import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';
import DocumentPlus from '../icons/DocumentPlus';

interface FolderItemProps {
  folderName: string;
  selectedFolder: string | null;
  setSelectedFolder: Dispatch<SetStateAction<string | null>>;
  setActionFolderName: Dispatch<SetStateAction<string | null>>;
  setFolderAction: Dispatch<SetStateAction<string>>;
}

const FolderItem: React.FC<FolderItemProps> = ({
  folderName,
  selectedFolder,
  setSelectedFolder,
  setActionFolderName,
  setFolderAction
}) => {
  const { theme } = useAppSelector((state) => state.theme);
  return (
    <li
      className={`${classes['folder-item']} ${
        classes[`folder-item--${theme}`]
      }`}
    >
      <div
        className="flex items-center space-x-6"
        onClick={() => {
          if (selectedFolder && selectedFolder === folderName) {
            setSelectedFolder(null);
          } else {
            setSelectedFolder(folderName);
          }
        }}
      >
        <span>
          {selectedFolder === folderName ? (
            <FolderOpenIcon width={18} height={18} />
          ) : (
            <FolderClosedIcon width={18} height={18} />
          )}
        </span>
        <p>{folderName}</p>
      </div>
      <div
        className={`dropdown ${classes['vertical-dots']}`}
        onClick={() => setActionFolderName(folderName)}
      >
        <label tabIndex={0} className={classes.icon}>
          <EllipsisVerticalIcon width="7" height="7" />
        </label>
        <ul
          tabIndex={0}
          className={`dropdown-content shadow rounded-box min-w-[15rem] ${
            classes['folder-actions']
          } ${classes[`folder-actions--${theme}`]}`}
        >
          {folderName !== 'Problems' && (
            <>
              <li
                className={`${classes['new-note']} ${
                  classes[`new-note--${theme}`]
                }`}
              >

                  <label
                    htmlFor="modal__create-new-note"
                    className="cursor-pointer"
                  >
                    <DocumentPlus />
                    <span>New note</span>
                  </label>

              </li>
              <li
                className={`${classes['rename']} ${
                  classes[`rename--${theme}`]
                }`}
                onClick={() => setFolderAction('rename')}
              >
                <label
                  htmlFor="modal__create-new-folder"
                  className="cursor-pointer"
                >
                  <EditIcon />
                  <span>Rename</span>
                </label>
              </li>
            </>
          )}
          <li className={`${classes['delete']} ${classes[`delete--${theme}`]}`}>

              <label
                htmlFor="delete-folder-confirm-modal"
                className="cursor-pointer"
              >
                <TrashIcon />
                <span>Remove</span>
              </label>

          </li>
        </ul>
      </div>
    </li>
  );
};

export default FolderItem;
