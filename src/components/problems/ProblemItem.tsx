import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Modal from '../reusables/Modal';
import EditorPreview from '../reusables/EditorPreview';
import classes from './ProblemItem.module.css';
import { Problem } from '@/types/dataTypes';
import { statusStyle, stripStyle } from '@/helpers/extraStyles';
import { colors, oddCellStyle } from '@/helpers/extraStyles';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setSelectedNote } from '@/store';
import { formatLongString } from '@/helpers/formatString';

import VideoIcon from '../icons/VideoIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import NoteIcon from '../icons/NoteIcon';
import CodeIcon from '../icons/CodeIcon';
import ExpandIcon from '../icons/ExpandIcon';
import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';
import PlusIcon from '../icons/PlusIcon';
import CodeBracketIcon from '../icons/CodeBracketIcon';

type ProblemItemProps = {
  problem: Problem;
  showNotes: boolean;
  oddCell: boolean;
};

const ProblemItem: React.FC<ProblemItemProps> = ({
  problem,
  showNotes,
  oddCell
}) => {
  const [showModalSolution, setShowModalSolution] = useState(false);
  const [showModalNote, setShowModalNote] = useState(false);
  const [showProblemNote, setShowProblemNote] = useState(false);
  const {
    list_name,
    title,
    difficulty,
    category,
    companies,
    leetcode_link,
    solution_link
  } = problem;
  const { data: session } = useSession();
  const { attempted_problems, easy_solved, medium_solved, hard_solved, notes } =
    useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  let problemNoteContent;
  if (notes) {
    const result = notes.filter((el) => el.title === title);
    problemNoteContent = result.length ? result[0].content : null;
  }

  useEffect(() => {
    if (!showNotes) {
      setShowProblemNote(false);
    } else {
      setShowProblemNote(true);
    }
  }, [showNotes]);

  const handleAddNote = () => {
    dispatch(setSelectedNote({ list_name, title }));
    router.push('/notes/add');
  };

  const solvedStatusStyle =
    session &&
    (easy_solved.some((el) => el.title === title) ||
      medium_solved.some((el) => el.title === title) ||
      hard_solved.some((el) => el.title === title) ||
      attempted_problems.some((el) => el.title === title))
      ? statusStyle
      : {};

  return (
    <>
      <div className={classes.problem} style={oddCell ? oddCellStyle : {}}>
        <div className={classes['solved-content']} style={solvedStatusStyle}>
          {attempted_problems.some((el) => el.title === title) ? (
            <CodeBracketIcon data-tooltip="Attempted" />
          ) : (
            <CheckIcon data-tooltip="Solved" width="18" height="18" />
          )}
        </div>
        <div className={classes['category-content']}>{category}</div>
        <div className={classes['title-content']}>
          {session && (
            <span
              data-tooltip="Note"
              className={classes['note-icon']}
              onClick={() => setShowProblemNote(!showProblemNote)}
            >
              <NoteIcon className="cursor-pointer" />
            </span>
          )}
          <Link
            target="_blank"
            href={leetcode_link}
            className={classes['title-link']}
          >
            {title}
          </Link>
        </div>
        <div
          className={classes['difficulty-content']}
          style={{ color: colors[difficulty] }}
        >
          {difficulty}
        </div>
        <div className={classes['solution-content']}>
          {solution_link.includes('youtube') ? (
            <Link target="_blank" href={solution_link}>
              <VideoIcon />
            </Link>
          ) : (
            <span onClick={() => setShowModalSolution(true)}>
              <CodeIcon
                width={8}
                height={8}
                className="cursor-pointer"
                extraStyle={{ transform: 'translateX(50%)' }}
              />
            </span>
          )}
        </div>
        <div
          className={`${classes['companies-content']}`}
          data-tooltip={companies.join(', ')}
        >
          {formatLongString(companies.join(', '), 80)}
        </div>
      </div>
      {showProblemNote && (
        <div className={classes.note}>
          <ul className={classes['note-actions']}>
            {notes && problemNoteContent ? (
              <>
                <li data-tooltip="Expand" className={classes.expand}>
                  <ExpandIcon width={7} height={7} />
                </li>
                <li data-tooltip="Edit" className={classes.edit}>
                  <EditIcon width={8} height={8} />
                </li>
                <li data-tooltip="Clear" className={classes.clear}>
                  <TrashIcon width={8} height={8} />
                </li>
              </>
            ) : (
              <li
                data-tooltip="New"
                className={classes.add}
                onClick={handleAddNote}
              >
                <PlusIcon width={8} height={8} />
              </li>
            )}
          </ul>
          <div className={classes.strip}></div>
          <EditorPreview
            value={
              problemNoteContent
                ? formatLongString(problemNoteContent, 60)
                : 'Add a note'
            }
            extraStyle={stripStyle}
          />
        </div>
      )}
      {showModalSolution && (
        <Modal onClose={() => setShowModalSolution(false)}>
          <Image
            src={solution_link}
            alt="solution code"
            width={700}
            height={700}
          />
        </Modal>
      )}
      {/* {showModalNote && (
        <Modal onClose={() => setShowModalNote(false)}><TextEditor /></Modal>
      )} */}
    </>
  );
};

export default ProblemItem;
