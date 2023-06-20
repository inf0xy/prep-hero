import { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { removeProblemFromList, addProblemToList, setBreakpoints } from '@/store';
import { NotificationType, Submission } from '@/types/dataTypes';
import LanguageSelection from './LanguageSelection';
import ConfirmPanel from '../ConfirmPanel';
import Tooltip from '../Tooltip';
import FullScreenButton from './FullScreenButton';
import Alert from '../Alert';
import classes from './EditorActionBar.module.scss';

import SettingsIcon from '@/components/icons/SettingsIcon';
import BookmarkFill from '@/components/icons/BookmarkFill';
import BookmarkOutline from '@/components/icons/BookmarkOutline';
import SourceCode from '@/components/icons/SourceCodeIcon';
import ArrowPathIcon from '@/components/icons/ArrowPathIcon';
import DocumentIcon from '@/components/icons/DocumentIcon';

type EditorActionBarProps = {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  title: string;
  prompts: { python: string; javascript: string; [key: string]: string };
  setCodeInputPython: Dispatch<SetStateAction<string | undefined>>;
  setCodeInputJavascript: Dispatch<SetStateAction<string | undefined>>;
  setShowNote: Dispatch<SetStateAction<boolean>>;
  userPythonSubmission: Submission | undefined;
  userJavascriptSubmission: Submission | undefined;
};

const EditorActionBar: React.FC<EditorActionBarProps> = ({
  prompts,
  language,
  setLanguage,
  setCodeInputPython,
  setCodeInputJavascript,
  setShowNote,
  userPythonSubmission,
  userJavascriptSubmission,
  title
}) => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.user);
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const handleReset = () => {
    if (language === 'python') {
      setCodeInputPython(JSON.parse(prompts['python']));
    } else {
      setCodeInputJavascript(JSON.parse(prompts['javascript']));
    }
    dispatch(setBreakpoints([]))
  };

  const handleRetrieveLastSubmission = () => {
    if (language === 'python') {
      if (userPythonSubmission) {
        setCodeInputPython(JSON.parse(userPythonSubmission.code));
      } else {
        setNotification({
          status: 'warning',
          message: "You don't have any submissions to retrive."
        });
        setShowAlert(true);
      }
    } else if (language === 'javascript') {
      if (userJavascriptSubmission) {
        setCodeInputPython(JSON.parse(userJavascriptSubmission.code));
      } else {
        setNotification({
          status: 'warning',
          message: "You don't have any submissions to retrive."
        });
        setShowAlert(true);
      }
    }
    dispatch(setBreakpoints([]));
  };

  return (
    <>
      {showAlert && (
        <Alert
          status={notification!.status!}
          onClose={() => setShowAlert(false)}
          setNotification={setNotification}
        >
          {notification?.message}
        </Alert>
      )}
      <div className={classes['editor-menu']}>
        <LanguageSelection setLanguage={setLanguage} multiOptions={false} />
        <ul className={classes.options}>
          <li onClick={() => setShowNote(true)}>
            <Tooltip text="Note" direction="bottom" className="w-fit px-6 py-4">
              <label
                htmlFor={`modal__editor-note-${title}`}
                className="w-fit cursor-pointer"
              >
                <DocumentIcon width={7} height={7} />
              </label>
            </Tooltip>
          </li>
          <li>
            <Tooltip
              text={list.includes(title!) ? 'Remove' : 'Add to list'}
              direction="bottom"
              className={`${
                list.includes(title!) ? 'w-fit' : 'w-[10rem]'
              } px-6 py-4`}
            >
              {list.includes(title!) ? (
                <span onClick={() => dispatch(removeProblemFromList(title!))}>
                  <BookmarkFill width={7} height={7} className="text-primary" />
                </span>
              ) : (
                <span onClick={() => dispatch(addProblemToList(title!))}>
                  <BookmarkOutline width={7} height={7} />
                </span>
              )}
            </Tooltip>
          </li>
          <li>
            <Tooltip
              text="Retrieve last submission"
              direction="bottom"
              className="w-[19rem] px-6 py-4"
            >
              <label
                htmlFor="restore-last-submission-confirm-modal"
                className="cursor-pointer"
              >
                <SourceCode width="7" height="7" />
              </label>
            </Tooltip>
          </li>
          <li>
            <Tooltip
              text="Reset prompt"
              direction="bottom"
              className="w-[12rem] px-6 py-4"
            >
              <label
                htmlFor="editor-reset-confirm-modal"
                className="cursor-pointer"
              >
                <ArrowPathIcon width="7" height="7" />
              </label>
            </Tooltip>
          </li>
          <li>
            <Tooltip
              text="Settings"
              direction="bottom"
              className="left-[-0.5rem] w-[8rem] px-6 py-4"
            >
              <label htmlFor="modal-settings" className="cursor-pointer">
                <SettingsIcon width="8" height="8" />
              </label>
            </Tooltip>
          </li>
          <li>
            <label htmlFor="modal-settings" className="cursor-pointer">
              <FullScreenButton width={7} height={7} />
            </label>
          </li>
        </ul>
      </div>
      <ConfirmPanel
        id="editor-reset-confirm-modal"
        onConfirm={() => {
          handleReset();
        }}
        cancelText="Cancel"
        confirmText="Confirm"
        headerText="Are you sure?"
        message="You are about to reset the code editor. Current code will be discarded."
        className="max-w-[50vw]"
      />
      <ConfirmPanel
        id="restore-last-submission-confirm-modal"
        onConfirm={handleRetrieveLastSubmission}
        cancelText="Cancel"
        confirmText="Confirm"
        headerText="Are you sure?"
        message="Current code will be discarded and replaced with last submission code."
        className="max-w-[50vw]"
      />
    </>
  );
};

export default EditorActionBar;
