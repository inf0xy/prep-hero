import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Modal from '../reusables/Modal';
import ConfirmPanel from '../reusables/ConfirmPanel';
import EditorPreview from '../reusables/EditorPreview';
import classes from './ProblemItem.module.scss';
import variables from '@/styles/variables.module.scss';
import { Problem } from '@/types/dataTypes';
import {
  statusStyle,
  noteStripStyle,
  fullNoteStyle
} from '@/helpers/extraStyles';
import { colors } from '@/helpers/extraStyles';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  addProblemToList,
  deleteNote,
  removeProblemFromList,
  setSelectedNote,
  setSelectedProblem
} from '@/store';

import VideoIcon from '../icons/VideoIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import NoteIcon from '../icons/NoteIcon';
import CodeIcon from '../icons/CodeIcon';
import ExpandIcon from '../icons/ExpandIcon';
import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';
import CodeBracketIcon from '../icons/CodeBracketIcon';
import PlusIconOutline from '../icons/PlusIconOutline';
import BookmarkOutline from '../icons/BookmarkOutline';
import BookmarkFill from '../icons/BookmarkFill';
import LogoList from './LogoList';
import Tooltip from '../reusables/Tooltip';
import Solutions from '../reusables/Solutions';

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
  const [showProblemNote, setShowProblemNote] = useState(false);
  const {
    list_names,
    title,
    difficulty,
    category,
    companies,
    solution_link,
    solution_codes
  } = problem;

  const {
    attempted_problems,
    easy_solved,
    medium_solved,
    hard_solved,
    notes,
    list,
    theme
  } = useAppSelector((state) => {
    const {
      submissions,
      attempted_problems,
      easy_solved,
      medium_solved,
      hard_solved,
      notes,
      list
    } = state.user;
    const { theme } = state.theme;
    return {
      attempted_problems,
      easy_solved,
      medium_solved,
      hard_solved,
      notes,
      list,
      theme
    };
  });

  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

  let problemNoteContent: string | undefined;
  if (notes) {
    const result = notes.filter((el) => el.title === title);
    problemNoteContent = result.length ? result[0].content : undefined;
  }

  useEffect(() => {
    if (!showNotes) {
      setShowProblemNote(false);
    } else {
      setShowProblemNote(true);
    }
  }, [showNotes]);

  const handleAddNote = () => {
    dispatch(
      setSelectedNote({ list_names, title, content: problemNoteContent })
    );
    router.push('/notes/add');
  };

  const handleEditNote = () => {
    dispatch(
      setSelectedNote({ list_names, title, content: problemNoteContent })
    );
    router.push('/notes/edit');
  };

  const handleDeleteNote = async () => {
    await dispatch(deleteNote(title!));
  };

  const handleEditProblem = () => {
    dispatch(setSelectedProblem(problem));
    router.push('/admin/edit');
  };

  const solvedStatusStyle =
    session?.session.user.account_type === 'admin' ||
    (session &&
      (easy_solved.some((el) => el.title === title) ||
        medium_solved.some((el) => el.title === title) ||
        hard_solved.some((el) => el.title === title) ||
        attempted_problems.some((el) => el.title === title)))
      ? statusStyle
      : {};

  return (
    <>
      <div
        className={`${classes.problem} ${
          oddCell ? classes[`problem--${theme}--odd-cell`] : undefined
        }`}
      >
        <div className={classes['solved-content']} style={solvedStatusStyle}>
          {session?.session.user.account_type === 'user' ? (
            <>
              {attempted_problems.some((el) => el.title === title) ? (
                <CodeBracketIcon data-tooltip="Attempted" />
              ) : (
                <CheckIcon data-tooltip="Solved" width="18" height="18" />
              )}
            </>
          ) : (
            <span onClick={handleEditProblem}>
              <EditIcon
                width={7}
                height={7}
                className="cursor-pointer hover:text-[#ff7230] transition ease duration-300"
              />
            </span>
          )}
        </div>
        <div className={classes['category-content']}>{category}</div>
        <div className={classes['title-content']}>
          {session && session.session.user.account_type === 'user' && (
            <div className={classes['action-icons']}>
              {list.includes(title!) ? (
                <span
                  className={classes['bookmark-icon']}
                  data-tooltip="Remove"
                  onClick={() => dispatch(removeProblemFromList(title!))}
                >
                  <BookmarkFill className="text-primary" />
                </span>
              ) : (
                <Tooltip
                  text="Add to list"
                  direction="top"
                  className="w-[10rem] px-6 py-2"
                >
                  <span
                    className={classes['bookmark-icon']}
                    onClick={() => dispatch(addProblemToList(title!))}
                  >
                    <BookmarkOutline />
                  </span>
                </Tooltip>
              )}
              <Tooltip text="Note" direction="top" className="w-fit px-6 py-2">
                <span
                  className={classes['note-icon']}
                  onClick={() => setShowProblemNote(!showProblemNote)}
                >
                  <NoteIcon className="cursor-pointer" />
                </span>
              </Tooltip>
            </div>
          )}
          <Link href={`/problem/${title}`} className={classes['title-link']}>
            {title}
          </Link>
        </div>
        <div
          className={classes['difficulty-content']}
          style={{ color: colors[difficulty!] }}
        >
          {difficulty}
        </div>
        <div className={classes['solution-content']}>
          {solution_link!.includes('youtube') ? (
            <Link target="_blank" href={solution_link!}>
              <VideoIcon />
            </Link>
          ) : (
            <span>
              <label htmlFor="modal-solution">
                <CodeIcon
                  width={8}
                  height={8}
                  className="cursor-pointer"
                  extraStyle={{ transform: 'translateX(50%)' }}
                />
              </label>
            </span>
          )}
        </div>
        <div className={`${classes['companies-content']}`}>
          <LogoList companyNames={companies!} className="translate-x-8" />
        </div>
      </div>
      {showProblemNote && (
        <div className={`${classes.note} ${classes[`note--${theme}`]}`}>
          <div className={classes.strip}></div>
          <div className={classes.content}>
            <EditorPreview
              value={problemNoteContent ? problemNoteContent : ''}
              extraStyle={noteStripStyle[theme]}
            />
          </div>
          {notes && problemNoteContent ? (
            <ul className={classes['note-actions']}>
              <>
                <Tooltip
                  text="Expand"
                  direction="top"
                  className="w-fit px-6 py-4"
                >
                  <li className={classes.expand}>
                    <label htmlFor="modal-note" className="cursor-pointer">
                      <ExpandIcon width={7} height={7} />
                    </label>
                  </li>
                </Tooltip>
                <Tooltip
                  text="Edit"
                  direction="top"
                  className="w-fit px-6 py-4"
                >
                  <li className={classes.edit} onClick={handleEditNote}>
                    <EditIcon width={8} height={8} />
                  </li>
                </Tooltip>
                <Tooltip
                  text="Clear"
                  direction="top"
                  className="w-fit px-6 py-4"
                >
                  <li className={classes.clear}>
                    <label
                      htmlFor="note-delete-confirm-modal"
                      className="cursor-pointer"
                    >
                      <TrashIcon width={8} height={8} />
                    </label>
                  </li>
                </Tooltip>
              </>
            </ul>
          ) : (
            <div className={classes.add}>
              <span onClick={handleAddNote}>
                <PlusIconOutline width={8} height={8} />
              </span>
              <p>Add a note</p>
            </div>
          )}
        </div>
      )}
      <Modal
        id="modal-solution"
        className={`max-w-[70vw] h-full py-6 ${
          theme === 'dark' ? 'bg-[#2b2b2b]' : 'bg-white'
        }`}
      >
        <div className="h-90% px-4">
          <Solutions
            videoURL={
              solution_link !== ''
                ? 'https://www.youtube.com/embed/' +
                  solution_link?.split('=')[1]
                : ''
            }
            solution_codes={solution_codes ? solution_codes : undefined}
          />
        </div>
      </Modal>
      <Modal
        id="modal-note"
        type="close-button"
        className={`${
          theme === 'dark'
            ? `bg-[${variables.darkBackground50}]`
            : `bg-[${variables.lightBackground0}]`
        }`}
      >
        <div className={classes['modal__full-note']}>
          <EditorPreview
            value={problemNoteContent!}
            extraStyle={fullNoteStyle[theme]}
          />
        </div>
      </Modal>
      <ConfirmPanel
        id="note-delete-confirm-modal"
        onConfirm={() => {
          handleDeleteNote();
        }}
        cancelText="Cancel"
        confirmText="Confirm"
        headerText="Are you sure?"
        message="You are about to delete this note."
      />
    </>
  );
};

export default ProblemItem;
