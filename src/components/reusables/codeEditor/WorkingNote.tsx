import { Dispatch, SetStateAction } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '@/hooks/hooks';
import Drawer from '../Drawer';
import TextEditor from '../TextEditor';
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
  const isMobilePortrait = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Drawer
      direction="right"
      isOpen={showNote}
      showCloseButton={false}
      hideBorder={false}
    >
      <div
        className={`${isMobilePortrait && 'working-note-mobile'} ${
          classes['working-note']
        }`}
      >
        <div
          className={`${classes['text-editor-wrapper']} ${
            classes[`text-editor-wrapper--${theme}`]
          }`}
        >
          <TextEditor
            value={noteContent ? noteContent : ''}
            setValue={setNoteContent}
            fullScreen={isMobilePortrait ? true : false}
            onCloseNote={() => closeNote()}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default WorkingNote;
