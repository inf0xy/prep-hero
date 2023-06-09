import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import useSubmitNote from '@/hooks/useSubmitNote';
import { NotificationType } from '@/types/dataTypes';
import { listNameSelections } from '@/helpers/formFields';
import TitleList from '@/components/reusables/TitleList';
import TextEditor from '@/components/reusables/TextEditor';
import EditIcon from '@/components/icons/EditIcon';
import MenuIcon from '@/components/icons/MenuIcon';
import TrashIcon from '@/components/icons/TrashIcon';
import classes from '@/styles/NotebookPage.module.scss';
import PlusIcon from '@/components/icons/PlusIcon';
import Modal from '@/components/reusables/Modal';
import ConfirmPanel from '@/components/reusables/ConfirmPanel';
import FolderClosedIcon from '@/components/icons/FolderClosed';
import Alert from '@/components/reusables/Alert';
import EllipsisVerticalIcon from '@/components/icons/EllipsisVerticalIcon';
import FolderOpenIcon from '@/components/icons/FolderOpen';

const NotebookPage = () => {
  const { theme, notes } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { notes } = state.user;
    return { theme, notes };
  });
  const [folderNames, setFolderNames] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState<string | null>(null);
  const folderNameRef = useRef<HTMLInputElement | null>(null);
  const noteTitleRef = useRef<HTMLInputElement | null>(null);
  const { handleSubmitNote } = useSubmitNote(setShowAlert, setNotification);

  useEffect(() => {
    const folders = new Set();
    notes.forEach((el) => {
      if (
        listNameSelections.some((name) =>
          el.list_name?.match(new RegExp(name, 'g'))
        )
      ) {
        folders.add('Problems');
      } else {
        folders.add(el.list_name);
      }
    });
    setFolderNames(Array.from(folders) as string[]);
  }, [notes]);

  const getNotesWithListName = () => {
    let currentNotes = notes.filter((el) => el.title !== 'placeholder');
    if (selectedFolder) {
      if (selectedFolder === 'Problems') {
        currentNotes = currentNotes.filter((el) =>
          listNameSelections.some((name) =>
            el.list_name?.match(new RegExp(name, 'g'))
          )
        );
      } else {
        currentNotes = currentNotes.filter(
          (el) => el.list_name === selectedFolder
        );
      }
    }
    return currentNotes.map((el) => el.title) as string[];
  };

  const handleCreateFolder = async () => {
    if (folderNameRef.current) {
      const name = folderNameRef.current.value;
      if (
        folderNames.some((el) => el === name) ||
        listNameSelections.some((el) => el === name)
      ) {
        setNotification({
          status: 'warning',
          message: listNameSelections.some((el) => el === name)
            ? 'Folder name not allowed.'
            : 'Folder name already exists.'
        });
        setShowAlert(true);
      } else {
        const note = {
          list_name: name,
          title: 'placeholder',
          content: ''
        };
        try {
          await handleSubmitNote(undefined, note);
          folderNameRef.current.value = '';
        } catch (err: any) {
          setNotification({
            status: 'error',
            message: 'Something went wrong'
          });
          setShowAlert(true);
          console.log(err.message);
        }
      }
    }
  };

  const handleCreateNote = async () => {
    if (noteTitleRef.current && noteTitleRef.current.value !== '') {
      const title = noteTitleRef.current!.value;
      const existedTitle = notes.find(
        (el) => el.list_name === selectedFolder && el.title === title
      );

      if (existedTitle) {
        setNotification({
          status: 'error',
          message: 'Title name already exists.'
        });
        setShowAlert(true);
        noteTitleRef.current.value = '';
        return;
      }

      setEditingTitle(title);
      try {
        handleSubmitNote(undefined, {
          list_name: selectedFolder!,
          title,
          content: ''
        });
      } catch (err: any) {
        setNotification({
          status: 'error',
          message: 'Something went wrong'
        });
        setShowAlert(true);
        console.log(err.message);
      }
    } else {
      setNotification({
        status: 'error',
        message: 'Note title is required!'
      });
      setShowAlert(true);
    }
    if (noteTitleRef.current) {
      noteTitleRef.current.value = '';
    }
  };
  const handleDeleteFolder = async () => {};

  const handleCloseNoteModal = async () => {
    const note = {
      list_name: selectedFolder!,
      title: editingTitle!,
      content: noteContent!
    };
    await handleSubmitNote(undefined, note);
    setNoteContent('');
    setEditingTitle(null);
  };

  return (
    <>
      {showAlert && (
        <Alert
          onClose={() => setShowAlert(false)}
          setNotification={setNotification}
          status={notification?.status!}
        >
          {notification?.message}
        </Alert>
      )}
      <div
        className={`${classes['notebook-page']} ${
          classes[`notebook-page--${theme}`]
        }`}
      >
        <div
          className={`${classes['side-nav']} ${classes[`side-nav--${theme}`]}`}
        >
          <button
            className={`${classes['list-button']} ${
              classes[`list-button--${theme}`]
            }`}
          >
            <MenuIcon width={8} height={8} />
          </button>
          <div className={classes['side-nav__content']}>
            <div
              className={`dropdown ${classes['create-button']} ${
                classes[`create-button--${theme}`]
              }`}
            >
              <label tabIndex={0} className={classes['create-button__title']}>
                <PlusIcon width={25} height={25} />
                <span>New</span>
              </label>
              <ul
                tabIndex={0}
                className={`dropdown-content translate-x-[-4.1rem] translate-y-[-3.5rem] shadow rounded-box min-w-[15rem] ${
                  classes['create-button-actions']
                } ${classes[`create-button-actions--${theme}`]}`}
              >
                <li
                  className={`${classes['new-folder']} ${
                    classes[`new-folder--${theme}`]
                  }`}
                >
                  <a>
                    <label htmlFor="modal__create-new-folder">New folder</label>
                  </a>
                </li>
                <li
                  className={`${classes['new-folder']} ${
                    classes[`new-folder--${theme}`]
                  }`}
                >
                  <a>Item 2</a>
                </li>
              </ul>
            </div>
            <ul className={classes['folders']}>
              {folderNames.map((el) => (
                <li key={el}>
                  <div
                    className="flex items-center space-x-6"
                    onClick={() => {
                      if (selectedFolder && selectedFolder === el) {
                        setSelectedFolder(null);
                      } else {
                        setSelectedFolder(el);
                      }
                    }}
                  >
                    <span>
                      {selectedFolder === el ? (
                        <FolderOpenIcon width={18} height={18} />
                      ) : (
                        <FolderClosedIcon width={18} height={18} />
                      )}
                    </span>
                    <p>{el}</p>
                  </div>
                  <div
                    className={`dropdown ${classes['vertical-dots']}`}
                    onClick={() => setSelectedFolder(el)}
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
                      <li
                        className={`${classes['new-note']} ${
                          classes[`new-note--${theme}`]
                        }`}
                      >
                        <a>
                          <label
                            htmlFor="modal__create-new-note"
                            className="cursor-pointer"
                          >
                            New note
                          </label>
                        </a>
                      </li>
                      <li
                        className={`${classes['rename']} ${
                          classes[`rename--${theme}`]
                        }`}
                      >
                        <a>Rename</a>
                      </li>
                      <li
                        className={`${classes['delete']} ${
                          classes[`delete--${theme}`]
                        }`}
                      >
                        <a>
                          <label
                            htmlFor="delete-folder-confirm-modal"
                            className="cursor-pointer"
                          >
                            Delete
                          </label>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={classes['note-list']}>
          <TitleList
            listType="notes"
            titles={getNotesWithListName()}
            firstIconText="Clear"
            secondIconText="Edit"
            firstIcon={<TrashIcon />}
            secondIcon={<EditIcon />}
            firstIconAction={undefined}
            secondIconAction={undefined}
            actionBar={undefined}
          />
        </div>
        <Modal
          id="modal__create-new-folder"
          type="close-button"
          showCloseButton={false}
          className="min-w-[30rem] min-h-[15rem]"
        >
          <div
            className={`${classes['form__create-folder']} ${
              classes[`form__create-folder--${theme}`]
            }`}
          >
            <label className={classes.title}>New folder</label>
            <input ref={folderNameRef} placeholder="Name" />
            <div className={classes['create-folder-actions']}>
              <button
                onClick={() => {
                  if (folderNameRef.current) {
                    setTimeout(() => {
                      folderNameRef.current!.value = '';
                    }, 500);
                  }
                }}
              >
                <label htmlFor="modal__create-new-folder">Cancel</label>
              </button>
              <button onClick={handleCreateFolder}>
                <label htmlFor="modal__create-new-folder">Create</label>
              </button>
            </div>
          </div>
        </Modal>
        {!editingTitle && (
          <Modal
            id="modal__create-new-note"
            type="close-button"
            showCloseButton={false}
            className="min-w-[30rem] min-h-[15rem]"
          >
            <div
              className={`${classes['form__create-note']} ${
                classes[`form__create-note--${theme}`]
              }`}
            >
              <label className={classes.title}>New note</label>
              <input ref={noteTitleRef} placeholder="Title" />
              <div className={classes['create-note-actions']}>
                <button
                  onClick={() => {
                    if (noteTitleRef.current) {
                      setTimeout(() => {
                        noteTitleRef.current!.value = '';
                      }, 500);
                    }
                  }}
                >
                  <label htmlFor="modal__create-new-note">Cancel</label>
                </button>

                <button onClick={handleCreateNote}>
                  <label htmlFor={`modal__editor-note-${editingTitle}`}>
                    Create
                  </label>
                </button>
              </div>
            </div>
          </Modal>
        )}
        <Modal
          id={`modal__editor-note-${editingTitle}`}
          type="close-button"
          buttonSize="btn-sm"
          className={`max-w-[100vw] max-h-[100vh] w-[70vw] h-[60vh] px-8 pt-24 ${
            theme === 'dark' ? 'bg-[#2b2b2b]' : 'bg-white'
          }`}
          onClose={handleCloseNoteModal}
          fullScreenToggle={true}
        >
          <div className={`code-editor__note code-editor__note--${theme}`}>
            {editingTitle && (
              <TextEditor value={noteContent!} setValue={setNoteContent} />
            )}
          </div>
        </Modal>
        <ConfirmPanel
          id="delete-folder-confirm-modal"
          headerText="Are you sure?"
          message="The folder and all contents inside will be deleted."
          cancelText="Cancel"
          confirmText="Delete"
          onConfirm={handleDeleteFolder}
        />
      </div>
    </>
  );
};

export default NotebookPage;
