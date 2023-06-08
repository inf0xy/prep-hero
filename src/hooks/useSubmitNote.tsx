import { useCallback, Dispatch, SetStateAction, FormEvent } from 'react';
import { validateAddingNote } from '@/helpers/validateAddNoteForm';
import { useAppDispatch } from './hooks';
import { addOrUpdateNote } from '@/store';
import { Note, NotificationType } from '@/types/dataTypes';

interface UseSubmitNote {
  (
    setShowAlert: Dispatch<SetStateAction<boolean>>,
    setNotification: Dispatch<SetStateAction<NotificationType | null>>,
    setSubmitted?: Dispatch<SetStateAction<boolean>>,
  ): {
    handleSubmitNote: (e: FormEvent | undefined, note: Note) => Promise<void>;
  };
}

const useSubmitNote: UseSubmitNote = (
  setShowAlert,
  setNotification,
  setSubmitted,
) => {
  const dispatch = useAppDispatch();

  const handleSubmitNote: (e: FormEvent | undefined, note: Note) => Promise<void> =
    useCallback(async (e: FormEvent | undefined, note: Note) => {
      if (e) {
        e.preventDefault();
      }

      if (setSubmitted) {
        setSubmitted(true);
      }

      const checkForm = validateAddingNote(note);
      if (checkForm.valid) {
        await dispatch(
          addOrUpdateNote({
            list_name: note.list_name!,
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
    }, [dispatch, setNotification, setShowAlert, setSubmitted]);

  return { handleSubmitNote };
};

export default useSubmitNote;
