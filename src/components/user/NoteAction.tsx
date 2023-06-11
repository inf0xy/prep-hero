import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { deleteNote, renameNote } from '@/store';
import { listNameSelections } from '@/helpers/formFields';
import { Note, NotificationType } from '@/types/dataTypes';
import EllipsisVerticalIcon from '../icons/EllipsisVerticalIcon';
import TrashIcon from '../icons/TrashIcon';
import Modal from '../reusables/Modal';
import EditIcon from '../icons/EditIcon';
import classes from './ActionMenu.module.scss';

interface NoteActionProps {
  title: string;
}

const NoteAction: React.FC<NoteActionProps> = ({ title }) => {
  const { theme, notes } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { notes } = state.user;
    return { theme, notes };
  });
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const newTitleRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const showRenameOption = (title: string) => {
    const foundNote = notes.find((el: Note) => el.title === title);
    if (
      foundNote &&
      listNameSelections.some((el) =>
        foundNote.list_name?.match(new RegExp(el))
      )
    ) {
      return false;
    }
    return true;
  };

  const handleRenameNote = async () => {
    try {
      if (newTitleRef?.current && newTitleRef.current.value !== '') {
        const newTitle = newTitleRef.current.value;
        const duplicate = notes.find((el: Note) => el.title === newTitle);
        if (duplicate) {
          setNotification({
            status: 'warning',
            message: 'Title name already exists.'
          });
          setShowAlert(true);
        } else {
          await dispatch(renameNote({ oldTitle: title, newTitle }));
        }
      } else {
        setNotification({ status: 'error', message: 'Title cannot be empty.' });
        setShowAlert(true);
      }
    } catch (err: any) {
      setNotification({ status: 'error', message: 'Something went wrong.' });
      setShowAlert(true);
    }

    if (newTitleRef.current) {
      newTitleRef.current.value = '';
    }
  };

  const handleDeleteNote = async (title: string) => {
    try {
      await dispatch(deleteNote(title));
    } catch (err: any) {
      setNotification({ status: 'error', message: 'Something went wrong.' });
      setShowAlert(true);
    }
  };

  return (
    <>
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
          {showRenameOption(title) && (
            <li
              className={`${classes['rename']} ${classes[`rename--${theme}`]}`}
            >
              <label
                htmlFor={`modal__rename-note--${title}`}
                className="cursor-pointer"
              >
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
      <Modal
        id={`modal__rename-note--${title}`}
        type="close-button"
        showCloseButton={false}
        className="min-w-[30rem] min-h-[15rem]"
      >
        <div
          className={`${classes['form__rename-note']} ${
            classes[`form__rename-note--${theme}`]
          }`}
        >
          <label className={classes.title}>New Title</label>
          <input ref={newTitleRef} placeholder="Title" />
          <div className={classes['rename-note-actions']}>
            <button
              onClick={() => {
                setTimeout(() => {
                  if (newTitleRef.current) {
                    newTitleRef.current.value = '';
                  }
                }, 500);
              }}
            >
              <label htmlFor={`modal__rename-note--${title}`}>Cancel</label>
            </button>
            <button onClick={handleRenameNote}>
              <label htmlFor={`modal__rename-note--${title}`}>Save</label>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NoteAction;
