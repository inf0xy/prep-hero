import { FormEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TextEditor from '@/components/reusables/TextEditor';
import Alert from '@/components/reusables/Alert';
import classes from './NoteForm.module.scss';
import Button from '@/components/reusables/Button';
import { NotificationType } from '@/types/dataTypes';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { addOrUpdateNote, deleteNote } from '@/store';
import { validateAddingNote } from '@/helpers/validateAddNoteForm';
import { Note } from '@/types/dataTypes';

type NoteFormProps = {
  destination: string;
  listName?: string[];
  title?: string;
  content?: string;
  disableListName: boolean;
  disableTitle: boolean;
};

const noteFormDefaultProps: NoteFormProps = {
  destination: '/problems',
  listName: [],
  title: '',
  content: '',
  disableListName: false,
  disableTitle: false
};

const NoteForm: React.FC<NoteFormProps> = ({
  destination,
  disableListName,
  disableTitle,
  listName,
  title,
  content
}) => {
  const [note, setNote] = useState<Note>({
    listName: listName?.join(', '),
    title,
    content
  });
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>({
    status: undefined,
    message: undefined
  });
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { error } = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.theme);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
      setNotification({
        status: 'error',
        message: error.includes('401') ? 'Please log in.' : error
      });
    } else if (!error && submitted) {
      setNotification({
        status: 'success',
        message: submitText === 'Add' ? 'Added' : 'Saved'
      });
      setTimeout(() => {
        router.push(destination);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, submitted]);

  const handleSubmitNote = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const checkForm = validateAddingNote(note);
    if (checkForm.valid) {
      await dispatch(
        addOrUpdateNote({
          listName: note.listName!,
          title: note.title!,
          content: note.content!
        })
      );
    } else {
      setShowAlert(true);
      setNotification({
        status: 'error',
        message: checkForm.message
      });
    }
  };

  const submitText = router.pathname.includes('add') ? 'Add' : 'Save';

  return (
    <div className={`${classes['add-notes']} ${classes[`add-notes--${theme}`]}`}>
      {showAlert && (
        <Alert
          onClose={setShowAlert}
          status={notification!.status!}
          setNotification={setNotification}
        >
          {notification!.message}
        </Alert>
      )}
      <form onSubmit={handleSubmitNote}>
        <div className={`${classes['add-notes__form-controls']} ${classes[`add-notes__form-controls--${theme}`]}`}>
          <label>
            List Name: <span className={classes['add-notes__required']}>*</span>
          </label>
          <div className={classes['add-notes__list-name']}>
            <input
              className={`${classes['add-notes__title-field']} ${classes[`add-notes__title-field--${theme}`]}`}
              value={note.listName!}
              disabled={disableListName}
              onChange={(e) =>
                setNote((prev) => ({
                  ...prev,
                  listName: e.target.value
                }))
              }
            />
          </div>
        </div>
        <div className={`${classes['add-notes__form-controls']} ${classes[`add-notes__form-controls--${theme}`]}`}>
          <label>
            Title: <span className={classes['add-notes__required']}>*</span>
          </label>
          <input
            className={`${classes['add-notes__title-field']} ${classes[`add-notes__title-field--${theme}`]}`}
            value={note.title}
            disabled={disableListName}
            onChange={(e) =>
              setNote((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className={classes['add-notes__content']}>
          <TextEditor
            defaultMode={false}
            value={note.content!}
            setValue={(val) => setNote((prev) => ({ ...prev, content: val }))}
            className={classes['note-content-editor']}
          />
        </div>
      </form>
      <div className={classes['add-notes__actions']}>
        <Button
          color="gray"
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
          {submitText}
        </Button>
      </div>
    </div>
  );
};

NoteForm.defaultProps = noteFormDefaultProps;

export default NoteForm;
