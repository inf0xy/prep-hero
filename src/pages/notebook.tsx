import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { renameFolder, deleteFolder } from '@/store';
import useSubmitNote from '@/hooks/useSubmitNote';
import { NotificationType } from '@/types/dataTypes';
import { listNameSelections } from '@/helpers/formFields';
import TitleList from '@/components/reusables/TitleList';
import TextEditor from '@/components/reusables/TextEditor';
import MenuIcon from '@/components/icons/MenuIcon';
import PlusIcon from '@/components/icons/PlusIcon';
import Modal from '@/components/reusables/Modal';
import ConfirmPanel from '@/components/reusables/ConfirmPanel';
import Alert from '@/components/reusables/Alert';
import FolderItem from '@/components/user/FolderItem';
import FolderPlus from '@/components/icons/FolderPlus';
import classes from '@/styles/NotebookPage.module.scss';

const NotebookPage = () => {
  const { theme, notes } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { notes } = state.user;
    return { theme, notes };
  });
  const dispatch = useAppDispatch();
  const [folderNames, setFolderNames] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [folderAction, setFolderAction] = useState('create');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [actionFolderName, setActionFolderName] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');
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

  const closeNewNoteModal = () => {
    const newNoteModal = document.querySelector(
      'input[type="checkbox"]#modal__create-new-note'
    ) as HTMLInputElement;
    if (newNoteModal) {
      newNoteModal.checked = false;
    }
  };

  const openNewNoteModal = () => {
    const newNoteModal = document.querySelector(
      'input[type="checkbox"]#modal__editor-note'
    ) as HTMLInputElement;
    if (newNoteModal) {
      newNoteModal.checked = true;
    }
  };

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

  const handleFolderAction = async () => {
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
        if (folderAction === 'create') {
          const note = {
            list_name: name,
            title: 'placeholder',
            content: ''
          };
          try {
            await handleSubmitNote(undefined, note);
          } catch (err: any) {
            setNotification({
              status: 'error',
              message: 'Something went wrong'
            });
            setShowAlert(true);
          }
        } else if (folderAction === 'rename') {
          try {
            await dispatch(
              renameFolder({
                oldFolderName: actionFolderName!,
                newFolderName: name
              })
            );
          } catch (err: any) {
            console.error(err);
            setNotification({
              status: 'error',
              message: 'Something went wrong'
            });
            setShowAlert(true);
          }
        }
      }
      folderNameRef.current.value = '';
    }
  };

  const handleCreateNote = async () => {
    closeNewNoteModal();

    if (noteTitleRef.current && noteTitleRef.current.value !== '') {
      const title = noteTitleRef.current!.value;
      const existedTitle = notes.find((el) => el.title === title);

      if (existedTitle) {
        setNotification({
          status: 'warning',
          message: 'Title name already exists.'
        });
        setShowAlert(true);
        noteTitleRef.current.value = '';
        return;
      }

      setEditingTitle(title);
      openNewNoteModal();
      try {
        handleSubmitNote(undefined, {
          list_name: actionFolderName!,
          title,
          content: ''
        });
      } catch (err: any) {
        setNotification({
          status: 'error',
          message: 'Something went wrong'
        });
        setShowAlert(true);
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
  const handleDeleteFolder = async () => {
    try {
      await dispatch(deleteFolder(actionFolderName!));
    } catch (err: any) {
      setNotification({
        status: 'error',
        message: err.message
      });
      setShowAlert(true);
    }
  };

  const handleCloseNoteModal = async () => {
    const note = {
      list_name: actionFolderName!,
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
                className={`dropdown-content translate-y-[-1.6rem] shadow rounded-box min-w-[15rem] ${
                  classes['create-button-actions']
                } ${classes[`create-button-actions--${theme}`]}`}
              >
                <li
                  className={`${classes['new-folder']} ${
                    classes[`new-folder--${theme}`]
                  }`}
                  onClick={() => setFolderAction('create')}
                >
                  <label htmlFor="modal__create-new-folder">
                    <FolderPlus />
                    <span>New folder</span>
                  </label>
                </li>
                <li
                  className={`${classes['new-folder']} ${
                    classes[`new-folder--${theme}`]
                  }`}
                >
                  <span>Item 2</span>
                </li>
              </ul>
            </div>
            <ul className={classes['folders']}>
              {folderNames.map((el) => (
                <FolderItem
                  key={el}
                  folderName={el}
                  selectedFolder={selectedFolder}
                  setSelectedFolder={setSelectedFolder}
                  setActionFolderName={setActionFolderName}
                  setFolderAction={setFolderAction}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className={classes['note-list']}>
          <TitleList
            listType="notes"
            titles={getNotesWithListName()}
            secondIconText="Action"
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
            <label className={classes.title}>
              {folderAction === 'create' ? 'New folder' : 'Rename folder'}
            </label>
            <input ref={folderNameRef} placeholder="Name" />
            <div className={classes['create-folder-actions']}>
              <button
                onClick={() => {
                  if (folderNameRef.current) {
                    setTimeout(() => {
                      folderNameRef.current!.value = '';
                      setFolderAction('');
                    }, 500);
                  }
                }}
              >
                <label htmlFor="modal__create-new-folder">Cancel</label>
              </button>
              <button onClick={handleFolderAction}>
                <label htmlFor="modal__create-new-folder">
                  {folderAction === 'create' ? 'Create' : 'Save'}
                </label>
              </button>
            </div>
          </div>
        </Modal>
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
              <button onClick={handleCreateNote}>Create</button>
            </div>
          </div>
        </Modal>
        <Modal
          id="modal__editor-note"
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
