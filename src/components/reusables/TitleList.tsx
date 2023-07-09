import {
  ReactNode,
  useState,
  useCallback,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction
} from 'react';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import useSubmitNote from '@/hooks/useSubmitNote';
import { toggleFullScreen } from '@/store';
import { Note, NotificationType } from '@/types/dataTypes';
import SearchBar from '@/components/reusables/SearchBar';
import TextEditor from './TextEditor';
import Alert from './Alert';
import NoteAction from '../user/NoteAction';
import Button from '@/components/reusables/Button';
import ResetIcon from '@/components/icons/ResetIcon';
import Modal from './Modal';
import CheckIcon from '../icons/CheckIcon';
import InProgressIcon from '../icons/InProgressIcon';
import classes from './TitleList.module.scss';

type TitleListProps = {
  listType: 'problems' | 'notes' | string;
  titles: string[];
  showTopBar: boolean;
  showHeader: boolean;
  firstIconText?: string;
  secondIconText?: string;
  firstIcon?: ReactNode;
  secondIcon?: ReactNode;
  testTitles?: string[];
  actionBar?: ReactNode;
  firstIconAction?: (val?: string) => Promise<any> | undefined;
  secondIconAction?: (val?: string) => Promise<any> | undefined;
  currentModal?: string;
  setCurrentModal?: Dispatch<SetStateAction<string>>;
};

const TitleList: React.FC<TitleListProps> = ({
  listType,
  titles,
  showTopBar,
  showHeader,
  firstIconText,
  secondIconText,
  firstIcon,
  secondIcon,
  testTitles,
  actionBar,
  firstIconAction,
  secondIconAction,
  currentModal,
  setCurrentModal
}) => {
  const [currentTitles, setCurrentTitles] = useState(titles);
  const [searchTerm, setSearchTerm] = useState('');

  const tableWrapperRef = useRef(null);
  const [tableBodyHeight, setTableBodyHeight] = useState<number | undefined>(
    undefined
  );

  const dispatch = useAppDispatch();
  const { theme, submissions, notes } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { submissions, notes } = state.user;
    return { theme, submissions, notes };
  });

  const [showNote, setShowNote] = useState(false);
  const [note, setNote] = useState<{
    list_name: string | undefined;
    content: string | undefined;
  }>({
    list_name: undefined,
    content: undefined
  });
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const isMobilePortrait = useMediaQuery({ query: '(max-width: 642px)' });

  const { handleSubmitNote } = useSubmitNote(setShowAlert, setNotification);

  const handleOpenNote = (title: string) => {
    const selectedNote = notes.find((el) => el.title === title) as Note;
    if (selectedNote) {
      setNote({
        list_name: selectedNote.list_name,
        content: selectedNote.content
      });
      if (setCurrentModal) {
        setCurrentModal(`modal__notebook-note-${title}`);
      }
      setShowNote(true);
    }
  };

  const handleCloseNote = async (title: string | undefined) => {
    const savingNote = {
      list_name: note.list_name,
      title,
      content: note.content
    };

    setShowNote(false);
    dispatch(toggleFullScreen(false));

    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.style.overflow = '';
    }

    if (setCurrentModal) {
      setCurrentModal('');
    }

    await handleSubmitNote(undefined, savingNote);
  };

  const handleSearch = useCallback(() => {
    if (searchTerm === '') {
      setCurrentTitles(titles);
      return;
    }

    const searchResults: string[] = [];
    const regex = new RegExp(searchTerm, 'i');

    for (const title of titles) {
      if (regex.test(title)) {
        searchResults.push(title);
      }
    }
    setCurrentTitles(searchResults);
  }, [searchTerm, titles]);

  const getStatusIcon = (title: string) => {
    if (submissions.some((el) => el.title === title && el.accepted)) {
      return <CheckIcon width="18" height="18" />;
    } else if (submissions.some((el) => el.title === title && !el.accepted)) {
      return <InProgressIcon width={19} height={19} />;
    }
    return null;
  };

  const handleSetTableHeight = () => {
    const height = (tableWrapperRef.current as any).clientHeight;
    setTableBodyHeight(height);
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch, searchTerm]);

  const renderedTitles = currentTitles.map((title) => (
    <div key={title} className={classes['title__cell']}>
      {firstIconText !== undefined && (
        <div
          className={classes['first-col-icon']}
          style={
            firstIconText.length === 0 ? { gridColumn: 'span 1' } : undefined
          }
        >
          <span
            onClick={firstIconAction ? () => firstIconAction(title) : undefined}
          >
            {listType !== 'problems' ? firstIcon : getStatusIcon(title)}
          </span>
        </div>
      )}
      {secondIconText !== undefined && (
        <div
          className={classes['second-col-icon']}
          style={
            secondIconText.length === 0 ? { gridColumn: 'span 1' } : undefined
          }
        >
          <span
            onClick={
              secondIconAction ? () => secondIconAction(title) : undefined
            }
            className={`${
              testTitles && testTitles.includes(title) ? 'text-cyan-500' : ''
            } ${
              listType !== 'notes'
                ? 'transition duration-300 ease hover:text-primary'
                : ''
            }`}
          >
            {listType === 'notes' ? <NoteAction title={title} /> : secondIcon}
          </span>
        </div>
      )}
      <p
        className={classes['title-content']}
        onClick={listType === 'notes' ? () => handleOpenNote(title) : undefined}
      >
        {listType !== 'notes' ? (
          <a href={`/problem/${title}`}>{title}</a>
        ) : (
          <label
            htmlFor={`modal__notebook-note-${title}`}
            className="cursor-pointer"
          >
            {title}
          </label>
        )}
      </p>
      <Modal
        id={`modal__notebook-note-${title}`}
        className={`max-w-[70vw] max-h-[60vh] w-[70vw] h-[60vh] ${
          theme === 'dark' ? 'bg-[#2b2b2b]' : 'bg-white'
        }`}
        isOpen={currentModal === `modal__notebook-note-${title}`}
      >
        <div className={isMobilePortrait ? 'modal-note' : ''}>
          {showNote && (
            <TextEditor
              value={note.content!}
              setValue={(val: string) =>
                setNote((prev) => ({ ...prev, content: val }))
              }
              onCloseNote={() => handleCloseNote(title)}
              previewMode="preview"
              fullScreen={isMobilePortrait ? true : false}
            />
          )}
        </div>
      </Modal>
    </div>
  ));

  return (
    <>
      {showAlert && (
        <Alert
          status={notification?.status!}
          onClose={() => setShowAlert(false)}
          setNotification={setNotification}
        >
          {notification?.message}
        </Alert>
      )}
      <div
        className={`${classes['titles-selection']} ${
          classes[`titles-selection--${theme}`]
        }`}
      >
        {showTopBar && (
          <div
            onClick={handleSetTableHeight}
            className={`top-bar ${classes['top-bar']}`}
          >
            <div className={classes['title__searchbar']}>
              <SearchBar
                setSingleSearchTerm={setSearchTerm}
                currentSearch={searchTerm}
              />
              <Button
                color="secondary"
                extraStyle={{ padding: '1rem' }}
                onClick={() => setSearchTerm('')}
              >
                <ResetIcon />
              </Button>
            </div>
            {actionBar && actionBar}
          </div>
        )}
        <div
          ref={tableWrapperRef}
          className={`${classes['titles-table-wrapper']}`}
          style={{
            minHeight: tableBodyHeight ? `${tableBodyHeight}px` : undefined
          }}
        >
          <div
            role="table"
            className={`${classes['titles__table']} ${
              classes[`titles-table--${theme}`]
            }`}
          >
            {showHeader && (
              <div
                className={`${classes['titles-table__header']} ${
                  classes[`titles-table__header--${theme}`]
                }`}
              >
                {firstIconText !== undefined && (
                  <div
                    role="row"
                    className={classes['first-col-header']}
                    style={
                      firstIconText.length === 0
                        ? { gridColumn: 'span 1' }
                        : undefined
                    }
                  >
                    {firstIconText}
                  </div>
                )}
                {secondIconText !== undefined && (
                  <div
                    role="row"
                    className={classes['second-col-header']}
                    style={
                      secondIconText.length === 0
                        ? { gridColumn: 'span 1' }
                        : undefined
                    }
                  >
                    {secondIconText}
                  </div>
                )}
                <div role="row" className={classes['title-header']}>
                  Title
                </div>
              </div>
            )}
            <div
              role="table-body"
              className={`title-list-wrapper--${theme} ${classes['title-table__body']}`}
            >
              {renderedTitles}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TitleList;
