import { useAppSelector } from '@/hooks/hooks';
import NoteForm from '@/components/reusables/NoteForm';
import classes from '@/styles/NotePage.module.scss';

const EditNotePage = () => {
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
        content={selectedNote.content}
        destination="/problems"
        disableListName={true}
        disableTitle={true}
      />
    </div>
  );
};

export default EditNotePage;
