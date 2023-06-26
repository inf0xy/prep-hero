import { Dispatch, SetStateAction } from 'react';
import Drawer from '../Drawer';
import TextEditor from '../TextEditor';
import { useAppSelector } from '@/hooks/hooks';
import XIcon from '@/components/icons/XIcon';
import classes from './WorkingNote.module.scss';

type WorkingNoteProps = {
  showNote: boolean;
  closeNote: () => void;
  noteContent: string | null;
  setNoteContent: Dispatch<SetStateAction<string | null>>;
};

const WorkingNote: React.FC<WorkingNoteProps> = ({
  showNote,
  closeNote,
  noteContent,
  setNoteContent
}) => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <Drawer
      direction="right"
      isOpen={showNote}
      showCloseButton={false}
    >
      <div className={classes['working-note']}>
        <div
          className={`${classes['text-editor-wrapper']} ${
            classes[`text-editor-wrapper--${theme}`]
          }`}
        >
          <button className={classes['close-note']} onClick={closeNote}>
            <XIcon width={15} height={15} />
          </button>
          <TextEditor
            value={noteContent ? noteContent : ''}
            setValue={setNoteContent}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default WorkingNote;
