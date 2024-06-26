import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import Modal from '../reusables/Modal';
import ConfirmPanel from '../reusables/ConfirmPanel';
import EditorPreview from '../reusables/EditorPreview';
import TextEditor from '../reusables/TextEditor';
import Alert from '../reusables/Alert';
import { colors } from '@/helpers/extraStyles';
import { config } from '@/helpers/config';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  addProblemToList,
  deleteNote,
  removeProblemFromList,
  setSelectedProblem,
  toggleFullScreen
} from '@/store';
import { NotificationType, Problem } from '@/types/dataTypes';
import { statusStyle, noteStripStyle } from '@/helpers/extraStyles';

import CheckIcon from '@/components/icons/CheckIcon';
import NoteIcon from '../icons/NoteIcon';
import CodeIcon from '../icons/CodeIcon';
import EditIcon from '../icons/EditIcon';
import TrashIconColor from '../icons/TrashIconColor';
import InProgressIcon from '../icons/InProgressIcon';
import PlusIconOutline from '../icons/PlusIconOutline';
import BookmarkOutline from '../icons/BookmarkOutline';
import PreviewIconColor from '../icons/PreviewIconColor';
import BookmarkFill from '../icons/BookmarkFill';
import LogoList from './LogoList';
import Tooltip from '../reusables/Tooltip';
import Solutions from '../reusables/Solutions';
import useSubmitNote from '@/hooks/useSubmitNote';

import classes from './ProblemItem.module.scss';

type ProblemItemProps = {
  problem: Problem;
  showNotes: boolean;
  oddCell: boolean;
};

const YOUTUBE_URL = config.YOUTUBE_URL;

const ProblemItem: React.FC<ProblemItemProps> = ({
  problem,
  showNotes,
  oddCell
}) => {
  const [showProblemNote, setShowProblemNote] = useState(false);
  const [showSolutionModal, setShowSolutionModal] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [showNote, setShowNote] = useState(false);
  const [noteAction, setNoteAction] = useState<string | undefined>(undefined);

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

  const { handleSubmitNote } = useSubmitNote(setShowAlert, setNotification);

  let problemNoteContent: string | undefined;
  if (notes) {
    const result = notes.filter((el) => el.title === title);
    problemNoteContent = result.length ? result[0].content : undefined;
  }

  const [noteContent, setNoteContent] = useState(problemNoteContent);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 820px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 642px)' });
  const isSmallMobile = useMediaQuery({ query: '(max-width: 416px)' });

  const [currentModal, setCurrentModal] = useState('');

  useEffect(() => {
    if (!showNotes) {
      setShowProblemNote(false);
    } else {
      setShowProblemNote(true);
    }
  }, [showNotes]);

  useEffect(() => {
    if (problemNoteContent) {
      setNoteContent(problemNoteContent);
    }
  }, [problemNoteContent]);

  useEffect(() => {
    let problemNoteContent: string | undefined;
    if (notes) {
      const result = notes.filter((el) => el.title === title);
      problemNoteContent = result.length ? result[0].content : undefined;
    }
    setNoteContent(problemNoteContent);
  }, [notes, title]);

  const handleCloseNoteModal = async () => {
    const note = {
      list_name: list_names!.join(', '),
      title,
      content: noteContent
    };
    setCurrentModal('');
    setShowNote(false);
    dispatch(toggleFullScreen(false));

    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.style.overflow = '';
    }

    setNoteAction(undefined);
    await handleSubmitNote(undefined, note);
  };

  const handleDeleteNote = async () => {
    await dispatch(deleteNote(title!));
  };

  const handleEditProblem = () => {
    dispatch(setSelectedProblem(problem));
    router.push('/admin/edit');
  };

  const handleNoteAction = (action: string, e: any) => {
    setNoteAction(action);
    setShowNote(true);
    const closestLabel = (e.target as HTMLElement).closest('label');
    const currentLabel = closestLabel?.getAttribute('for');
    if (currentLabel) {
      setCurrentModal(currentLabel);
    }
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
      {showAlert && (
        <Alert
          status="error"
          onClose={() => setShowAlert(false)}
          setNotification={setNotification}
        >
          {notification?.message}
        </Alert>
      )}
      <div
        role="row"
        aria-label="row"
        className={`${classes.problem} ${
          oddCell ? classes[`problem--${theme}--odd-cell`] : undefined
        }`}
      >
        {!isTabletOrMobile && (
          <>
            <div
              role="cell"
              aria-label="solved content cell"
              className={classes['solved-content']}
              style={solvedStatusStyle}
            >
              {session?.session.user.account_type === 'user' ? (
                <>
                  {attempted_problems.some((el) => el.title === title) ? (
                    <span id="in-progress-icon" aria-label="in progress">
                      <InProgressIcon
                        width={19}
                        height={19}
                        data-tooltip="Attempted"
                      />
                    </span>
                  ) : (
                    <span id="completed-icon" aria-label="completed">
                      <CheckIcon data-tooltip="Solved" width="18" height="18" />
                    </span>
                  )}
                </>
              ) : (
                <span
                  role="button"
                  arial-label="edit"
                  onClick={handleEditProblem}
                >
                  <EditIcon
                    width={7}
                    height={7}
                    className="cursor-pointer hover:text-[#ff7230] transition ease duration-300"
                  />
                </span>
              )}
            </div>
            <div className={classes['category-content']}>{category}</div>
          </>
        )}
        <div
          role="cell"
          aria-label="title cell"
          className={classes['title-content']}
        >
          {session && session.session.user.account_type === 'user' && (
            <div className={classes['action-icons']}>
              {list.includes(title!) ? (
                <Tooltip
                  text="Remove"
                  direction="top"
                  className="w-fit px-4 py-2"
                >
                  <span
                    role="button"
                    aria-label="remove problem"
                    className={classes['bookmark-icon']}
                    data-tooltip="Remove"
                    onClick={() => dispatch(removeProblemFromList(title!))}
                  >
                    <BookmarkFill
                      width={8}
                      height={8}
                      className="text-primary"
                    />
                  </span>
                </Tooltip>
              ) : (
                <Tooltip
                  text="Add to list"
                  direction="top"
                  className="w-[9rem] py-2"
                >
                  <span
                    role="button"
                    aria-label="add problem"
                    className={classes['bookmark-icon']}
                    onClick={() => dispatch(addProblemToList(title!))}
                  >
                    <BookmarkOutline width={8} height={8} />
                  </span>
                </Tooltip>
              )}
              <Tooltip text="Note" direction="top" className="w-fit px-6 py-2">
                <span
                  role="button"
                  aria-label="open note"
                  className={classes['note-icon']}
                  onClick={() => setShowProblemNote(!showProblemNote)}
                >
                  <NoteIcon width={8} height={8} className="cursor-pointer" />
                </span>
              </Tooltip>
            </div>
          )}
          <Link href={`/problem/${title}`} className={classes['title-link']}>
            {title}
          </Link>
        </div>
        <div
          role="cell"
          aria-label="difficulty cell"
          className={classes['difficulty-content']}
          style={{ color: colors[difficulty!].inner }}
        >
          {difficulty}
        </div>
        {isTabletOrMobile && (
          <div
            role="cell"
            aria-label="category cell"
            className={classes['category-content']}
          >
            {category}
          </div>
        )}
        <div className={classes['solution-content']}>
          <span
            role="button"
            aria-label="open solution"
            onClick={() => setShowSolutionModal(true)}
          >
            <label htmlFor={`modal-solution-${title}`} className="w-fit">
              <CodeIcon
                width={isSmallMobile ? 10 : 8}
                height={isSmallMobile ? 10 : 8}
                className="cursor-pointer"
              />
            </label>
          </span>
        </div>
        <div
          role="cell"
          aria-label="companies cell"
          className={`${classes['companies-content']}`}
        >
          <LogoList companyNames={companies!} className="translate-x-8" />
        </div>
        {isTabletOrMobile && (
          <div
            role="cell"
            aria-label="solved content cell"
            className={classes['solved-content']}
            style={solvedStatusStyle}
          >
            {session?.session.user.account_type === 'user' ? (
              <>
                {attempted_problems.some((el) => el.title === title) ? (
                  <span id="in-progress-icon" aria-label="in progress">
                    <InProgressIcon
                      width={isSmallMobile ? 23 : 19}
                      height={isSmallMobile ? 23 : 19}
                      data-tooltip="Attempted"
                    />
                  </span>
                ) : (
                  <span id="completed-icon" aria-label="completed">
                    <CheckIcon
                      data-tooltip="Solved"
                      width={isSmallMobile ? '22' : '18'}
                      height={isSmallMobile ? '22' : '18'}
                    />
                  </span>
                )}
              </>
            ) : (
              <span role="button" aria-label="edit" onClick={handleEditProblem}>
                <EditIcon
                  width={7}
                  height={7}
                  className="cursor-pointer hover:text-[#ff7230] transition ease duration-300"
                />
              </span>
            )}
          </div>
        )}
      </div>
      {showProblemNote && (
        <div className={`${classes.note} ${classes[`note--${theme}`]}`}>
          <div className={classes.strip}></div>
          <div className={classes.content}>
            <EditorPreview
              value={noteContent!}
              extraStyle={noteStripStyle[theme]}
            />
          </div>
          {notes && noteContent && noteContent.length > 0 ? (
            <ul className={classes['note-actions']}>
              <>
                <Tooltip
                  text="View Note"
                  direction="top"
                  className="w-[9rem] py-4"
                >
                  <li
                    role="button"
                    aria-label="view note"
                    className={classes['view-note']}
                    onClick={(e) => handleNoteAction('view', e)}
                  >
                    <label
                      htmlFor={`modal__problems-note-${title}`}
                      className="w-fit cursor-pointer"
                    >
                      <span className="opacity-[0.7]">
                        <PreviewIconColor
                          width={isSmallMobile ? 26 : 22}
                          height={isSmallMobile ? 26 : 22}
                        />
                      </span>
                    </label>
                  </li>
                </Tooltip>
                <Tooltip
                  text="Clear"
                  direction="top"
                  className="w-fit px-6 py-4"
                >
                  <li
                    role="button"
                    aria-label="delete note"
                    className={classes.clear}
                  >
                    <label
                      htmlFor={`note-delete-confirm-modal-${title}`}
                      className="cursor-pointer"
                    >
                      <TrashIconColor
                        width={isSmallMobile ? 26 : 22}
                        height={isSmallMobile ? 26 : 22}
                      />
                    </label>
                  </li>
                </Tooltip>
              </>
            </ul>
          ) : (
            <div className={classes.add}>
              <label
                role="button"
                aria-label="add note"
                htmlFor={`modal__problems-note-${title}`}
                onClick={(e) => handleNoteAction('add', e)}
              >
                <span className="opacity-[0.7]">
                  <PlusIconOutline width={8} height={8} />
                </span>
              </label>
              <p>Add a note</p>
            </div>
          )}
        </div>
      )}
      <Modal
        id={`modal-solution-${title}`}
        type="close-button"
        buttonPosition="right-9 top-9"
        className={`max-w-[100vw] h-full pt-24 pb-8 pl-3 ${
          isTabletOrMobile
            ? 'w-screen h-screen min-w-screen min-h-screen'
            : 'w-[70vw] min-w-[70vw]'
        } ${theme === 'dark' ? 'bg-[#2b2b2b]' : 'bg-white'}`}
        onClose={() => setShowSolutionModal(false)}
        noBorderRadius={isTabletOrMobile ? true : false}
      >
        <div
          className={`solution-modal-wrapper--${theme} ${
            classes['solution-modal-wrapper']
          } w-full h-full ${
            isTabletOrMobile ? 'overflow-y-visible' : 'overflow-y-hidden'
          } `}
        >
          {showSolutionModal && (
            <Solutions
              videoURL={
                solution_link !== ''
                  ? YOUTUBE_URL + solution_link?.split('=')[1]
                  : ''
              }
              solution_codes={solution_codes ? solution_codes : undefined}
            />
          )}
        </div>
      </Modal>
      <Modal
        id={`modal__problems-note-${title}`}
        className={`max-w-[70vw] max-h-[60vh] w-[70vw] h-[60vh] ${
          theme === 'dark' ? 'bg-[#2b2b2b]' : 'bg-white'
        }`}
        isOpen={currentModal === `modal__problems-note-${title}`}
      >
        <div className={isMobile ? 'modal-note' : ''}>
          {showNote && (
            <TextEditor
              value={noteContent!}
              setValue={setNoteContent}
              onCloseNote={handleCloseNoteModal}
              previewMode={noteAction === 'view' ? 'preview' : 'edit'}
              fullScreen={isMobile ? true : false}
            />
          )}
        </div>
      </Modal>
      <ConfirmPanel
        id={`note-delete-confirm-modal-${title}`}
        onConfirm={handleDeleteNote}
        cancelText="Cancel"
        confirmText="Confirm"
        headerText="Are you sure?"
        message="You are about to delete this note."
      />
    </>
  );
};

export default ProblemItem;
