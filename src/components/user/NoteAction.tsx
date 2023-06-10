import { useAppSelector } from '@/hooks/hooks';
import EllipsisVerticalIcon from '../icons/EllipsisVerticalIcon';
import classes from './FolderItem.module.scss';
import TrashIcon from '../icons/TrashIcon';
import EditIcon from '../icons/EditIcon';

interface NoteActionProps {
  folderName: string;
  title: string;
  handleRenameNote: (val: string) => void;
  handleDeleteNote: (val: string) => void;
}

const NoteAction: React.FC<NoteActionProps> = ({
  folderName,
  title,
  handleRenameNote,
  handleDeleteNote
}) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <div className={`dropdown ${classes['vertical-dots']}`}>
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
          <li
            className={`${classes['rename']} ${classes[`rename--${theme}`]}`}
            onClick={() => handleRenameNote(title)}
          >
            <label htmlFor="modal__rename-note" className="cursor-pointer">
              <EditIcon />
              <span>Rename</span>
            </label>
          </li>
        )}
        <li
          className={`${classes['delete']} ${classes[`delete--${theme}`]}`}
          onClick={() => handleDeleteNote(title)}
        >
          <a>
            <TrashIcon />
            <span>Remove</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default NoteAction;
