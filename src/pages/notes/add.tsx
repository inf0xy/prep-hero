import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TextEditor from '@/components/reusables/TextEditor';
import Alert from '@/components/reusables/Alert';
import classes from '@/styles/AddNotePage.module.css';
import Button from '@/components/reusables/Button';
import { grayColors } from '@/helpers/formFields';
import { NotificationType } from '@/types/dataTypes';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { addOrUpdateNote } from '@/store/slices/notesSlice';
import { validateAddingNote } from '@/helpers/validateAddNoteForm';

const AddNotePage = () => {
  const [noteContent, setNoteContent] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({
    status: undefined,
    message: undefined
  });
  const router = useRouter();
  const { selectedNote, error } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  const handleSubmitNote = async (e: FormEvent) => {
    e.preventDefault();
    if (validateAddingNote(noteContent)) {
      await dispatch(
        addOrUpdateNote({
          listName: selectedNote.listName!,
          title: selectedNote.title!,
          content: noteContent
        })
      );
      setShowAlert(true);
      if (error) {
        setNotification({ status: 'error', message: error })
      } else {
        setNotification({
          status: 'success',
          message: 'Success.'
        });
        setTimeout(() => {
          router.push('/problems');
        }, 500);
      }
    } else {
      setShowAlert(true);
      setNotification({
        status: 'error',
        message: 'Please fill out all required (*) fields'
      });
    }
  };

  return (
    <div className={classes['add-notes']}>
      {showAlert && (
        <Alert onClose={setShowAlert} status={notification.status!} setNotification={setNotification}>
          {notification.message}
        </Alert>
      )}
      <form onSubmit={handleSubmitNote}>
        <div className={classes['add-notes__form-controls']}>
          <label>
            List Name: <span className={classes['add-notes__required']}>*</span>
          </label>
          <div className={classes['add-notes__list-name']}>
            <input
              className={classes['add-notes__list-field']}
              value={selectedNote.listName}
              disabled={true}
              onChange={() => {}}
            />
          </div>
        </div>
        <div className={classes['add-notes__form-controls']}>
          <label>
            Title: <span className={classes['add-notes__required']}>*</span>
          </label>
          <input
            className={classes['add-notes__title-field']}
            value={selectedNote.title}
            disabled={true}
            onChange={() => {}}
          />
        </div>
        <div className={classes['add-notes__content']}>
          <TextEditor
            defaultMode={false}
            value={noteContent}
            setValue={setNoteContent}
            className={classes['note-content-editor']}
          />
        </div>
      </form>
      <div className={classes['add-notes__actions']}>
        <Button
          color={grayColors[400]}
          className="text-[1.3rem]"
          extraStyle={{ padding: '1rem 3.5rem' }}
          onClick={() => router.back()}
        >
          Back
        </Button>
        <Button
          className="text-[1.3rem]"
          extraStyle={{ padding: '1rem 3.7rem' }}
          onClick={handleSubmitNote}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddNotePage;
