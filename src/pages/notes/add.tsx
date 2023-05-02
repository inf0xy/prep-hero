import { useAppSelector } from '@/hooks/hooks';
import NoteForm from '@/components/reusables/NoteForm';
import classes from '@/styles/NotePage.module.css';

const AddNotePage = () => {
  const { selectedNote } = useAppSelector((state) => state.notes);

  return (
    <div className={classes['note-page']}>
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