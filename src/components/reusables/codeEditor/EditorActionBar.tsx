import { Dispatch, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { removeProblemFromList, addProblemToList } from '@/store';
import { Submission } from '@/types/dataTypes';
import LanguageSelection from './LanguageSelection';
import ConfirmPanel from '../ConfirmPanel';
import classes from './EditorActionBar.module.scss';

import SettingsIcon from '@/components/icons/SettingsIcon';
import BookmarkFill from '@/components/icons/BookmarkFill';
import BookmarkOutline from '@/components/icons/BookmarkOutline';
import SourceCode from '@/components/icons/SourceCodeIcon';
import ArrowPathIcon from '@/components/icons/ArrowPathIcon';
import Tooltip from '../Tooltip';

type EditorActionBarProps = {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  title: string;
  prompts: { python: string; javascript: string; [key: string]: string };
  setCodeInputPython: Dispatch<SetStateAction<string | undefined>>;
  setCodeInputJavascript: Dispatch<SetStateAction<string | undefined>>;
  userPythonSubmission: Submission | undefined;
  userJavascriptSubmission: Submission | undefined;
};

const EditorActionBar: React.FC<EditorActionBarProps> = ({
  prompts,
  language,
  setLanguage,
  setCodeInputPython,
  setCodeInputJavascript,
  userPythonSubmission,
  userJavascriptSubmission,
  title
}) => {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector((state) => state.user);

  const handleReset = () => {
    if (language === 'python') {
      setCodeInputPython(JSON.parse(prompts['python']));
    } else {
      setCodeInputJavascript(JSON.parse(prompts['javascript']));
    }
  };

  const handleRetrieveLastSubmission = () => {
    if (language === 'python') {
      userPythonSubmission
        ? setCodeInputPython(JSON.parse(userPythonSubmission.code))
        : setCodeInputPython(JSON.parse(prompts['python']));
    } else if (language === 'javascript') {
      userJavascriptSubmission
        ? setCodeInputJavascript(JSON.parse(userJavascriptSubmission.code))
        : setCodeInputJavascript(JSON.parse(prompts['javascript']));
    }
  };

  return (
    <>
      <div className={classes['editor-menu']}>
        <LanguageSelection setLanguage={setLanguage} />
        <ul className={classes.options}>
          <li>
            <Tooltip
              text="Add to list"
              direction="bottom"
              className="w-[10rem] px-6 py-4"
            >
              {list.includes(title!) ? (
                <span
                  data-tooltip="Remove"
                  onClick={() => dispatch(removeProblemFromList(title!))}
                >
                  <BookmarkFill width={7} height={7} className="text-primary" />
                </span>
              ) : (
                <span
                  data-tooltip="Add to list"
                  onClick={() => dispatch(addProblemToList(title!))}
                >
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
        onConfirm={() => {
          handleRetrieveLastSubmission();
        }}
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
