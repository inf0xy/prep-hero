import { useAppSelector } from '@/hooks/hooks';
import NoteForm from '@/components/reusables/NoteForm';
import classes from '@/styles/NotePage.module.scss';

const AddNotePage = () => {
  const { selectedNote, theme } = useAppSelector((state) => {
    const { selectedNote } = state.notes;
    const { theme } = state.theme;
    return { selectedNote, theme };
  });

  return (
    <div
      className={`${classes['note-page']} ${classes[`note-page--${theme}`]}`}
    >
      <NoteForm
        listName={selectedNote.listName}
        title={selectedNote.title}
        destination="/problems"
        disableListName={true}
        disableTitle={true}
      />
    </div>
  );
};

export default AddNotePage;
