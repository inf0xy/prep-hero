import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Modal from '../reusables/Modal';
import ConfirmPanel from '../reusables/ConfirmPanel';
import EditorPreview from '../reusables/EditorPreview';
import classes from './ProblemItem.module.css';
import { Problem } from '@/types/dataTypes';
import {
  statusStyle,
  noteStripStyle,
  fullNoteStyle,
  colorPrimary
} from '@/helpers/extraStyles';
import { colors, oddCellStyle } from '@/helpers/extraStyles';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { deleteNote, setSelectedNote, setSelectedProblem } from '@/store';
import { formatLongString } from '@/helpers/formatString';

import VideoIcon from '../icons/VideoIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import NoteIcon from '../icons/NoteIcon';
import CodeIcon from '../icons/CodeIcon';
import ExpandIcon from '../icons/ExpandIcon';
import EditIcon from '../icons/EditIcon';
import TrashIcon from '../icons/TrashIcon';
import CodeBracketIcon from '../icons/CodeBracketIcon';
import PlusIconOutline from '../icons/PlusIconOutline';
import CircleX from '../icons/CircleX';

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showProblemNote, setShowProblemNote] = useState(false);
  const {
    list_name,
    title,
    difficulty,
    category,
    companies,
    leetcode_link,
    solution_link,
    description,
    tags
  } = problem;

  const { attempted_problems, easy_solved, medium_solved, hard_solved, notes } =
    useAppSelector((state) => state.user);
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
    dispatch(setSelectedNote({ list_name, title, problemNoteContent }));
    router.push('/notes/add');
  };

  const handleEditNote = () => {
    dispatch(setSelectedProblem(problem));
    router.push('/notes/edit');
  };

  const handleDeleteNote = async () => {
    await dispatch(deleteNote(title!));
  };

  const handleEditProblem = () => {
    dispatch(
      setSelectedProblem(problem)
    );
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
      <div className={classes.problem} style={oddCell ? oddCellStyle : {}}>
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
            href={leetcode_link!}
            className={classes['title-link']}
          >
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
          data-tooltip={companies!.join(', ')}
        >
          {formatLongString(companies!.join(', '), 80)}
        </div>
      </div>
      {showProblemNote && (
        <div className={classes.note}>
          <div className={classes.strip}></div>
          <div className={classes.content}>
            <EditorPreview
              value={problemNoteContent ? problemNoteContent : ''}
              extraStyle={noteStripStyle}
            />
          </div>
          {notes && problemNoteContent ? (
            <ul className={classes['note-actions']}>
              <>
                <li
                  data-tooltip="Expand"
                  className={classes.expand}
                  onClick={() => setShowModalNote(true)}
                >
                  <ExpandIcon width={7} height={7} />
                </li>
                <li
                  data-tooltip="Edit"
                  className={classes.edit}
                  onClick={handleEditNote}
                >
                  <EditIcon width={8} height={8} />
                </li>
                <li
                  data-tooltip="Clear"
                  className={classes.clear}
                  // onClick={handleDeleteNote}
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <TrashIcon width={8} height={8} />
                </li>
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
      {showModalSolution && (
        <Modal type="blur" onClose={() => setShowModalSolution(false)}>
          <Image
            src={solution_link!}
            alt="solution code"
            width={700}
            height={700}
          />
        </Modal>
      )}
      {showModalNote && (
        <Modal
          className="bg-[#333]"
          type="blur"
          onClose={() => setShowModalNote(false)}
        >
          <div
            className="text-gray-300 hover:text-[#e64900] absolute top-12 right-12 cursor-pointer transition duration-300 ease"
            onClick={() => setShowModalNote(false)}
          >
            <CircleX width={10} height={10} />
          </div>
          <div className={classes['modal__full-note']}>
            <EditorPreview
              value={problemNoteContent!}
              extraStyle={fullNoteStyle}
            />
          </div>
        </Modal>
      )}
      {showDeleteConfirm && (
        <ConfirmPanel
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={() => {
            handleDeleteNote();
            setShowDeleteConfirm(false);
          }}
          cancelText="Cancel"
          confirmText="Confirm"
          headerText="Are you sure?"
          message="You are about to delete this note."
        />
      )}
    </>
  );
};

export default ProblemItem;
