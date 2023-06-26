import { ReactNode, useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/hooks';
import SearchBar from '@/components/reusables/SearchBar';
import Button from '@/components/reusables/Button';
import ResetIcon from '@/components/icons/ResetIcon';
import CheckIcon from '../icons/CheckIcon';
import InProgressIcon from '../icons/InProgressIcon';
import classes from './TitleList.module.scss';

type TitleListProps = {
  listType: 'problems' | 'notes' | string;
  titles: string[];
  firstIconText?: string;
  secondIconText?: string;
  firstIcon?: ReactNode;
  secondIcon?: ReactNode;
  testTitles?: string[];
  actionBar?: ReactNode;
  firstIconAction?: (val?: string) => Promise<any> | undefined;
  secondIconAction?: (val?: string) => Promise<any> | undefined;
};

import Modal from './Modal';
import TextEditor from './TextEditor';
import { NotificationType } from '@/types/dataTypes';
import useSubmitNote from '@/hooks/useSubmitNote';
import { Note } from '@/types/dataTypes';
import Alert from './Alert';
import NoteAction from '../user/NoteAction';

const TitleList: React.FC<TitleListProps> = ({
  listType,
  titles,
  firstIconText,
  secondIconText,
  firstIcon,
  secondIcon,
  testTitles,
  actionBar,
  firstIconAction,
  secondIconAction
}) => {
  const [currentTitles, setCurrentTitles] = useState(titles);
  const [searchTerm, setSearchTerm] = useState('');

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

  const { handleSubmitNote } = useSubmitNote(setShowAlert, setNotification);

  const handleOpenNote = (title: string) => {
    const selectedNote = notes.find((el) => el.title === title) as Note;
    if (selectedNote) {
      setNote({
        list_name: selectedNote.list_name,
        content: selectedNote.content
      });
      setShowNote(true);
    }
  };

  const handleCloseNote = async (title: string) => {
    const savingNote = {
      list_name: note.list_name,
      title,
      content: note.content
    };
    await handleSubmitNote(undefined, savingNote);
    setShowNote(false);
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
      return <CheckIcon width="17" height="17" />;
    } else if (submissions.some((el) => el.title === title && !el.accepted)) {
      return <InProgressIcon width={25} height={25} />;
    }
    return null;
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
          <Link href={`/problem/${title}`}>{title}</Link>
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
        type="close-button"
        buttonSize="btn-sm"
        className={`max-w-[100vw] max-h-[100vh] w-[70vw] h-[60vh] px-8 pt-24 ${
          theme === 'dark' ? 'bg-[#2b2b2b]' : 'bg-white'
        }`}
        onClose={() => handleCloseNote(title)}
        fullScreenToggle={listType === 'notes'}
      >
        <div className={`code-editor__note code-editor__note--${theme}`}>
          {showNote && note.content && (
            <TextEditor
              value={note.content}
              setValue={(val: string) =>
                setNote((prev) => ({ ...prev, content: val }))
              }
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
        <div className={`top-bar ${classes['top-bar']}`}>
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
        <div
          role="table"
          className={`${classes['titles__table']} ${
            classes[`titles-table--${theme}`]
          }`}
        >
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
          <div
            role="table-body"
            className={`title-list-wrapper--${theme} ${classes['title-table__body']}`}
          >
            {renderedTitles}
          </div>
        </div>
      </div>
    </>
  );
};

export default TitleList;
