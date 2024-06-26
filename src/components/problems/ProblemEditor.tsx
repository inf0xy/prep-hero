import { useState, useRef, Dispatch, SetStateAction, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import CodeEditor from '@/components/reusables/codeEditor/CodeEditor';
import Resizable from '../reusables/Resizable';
import { useAppSelector } from '@/hooks/hooks';
import useCopy from '@/hooks/useCopy';
import useHandleCode from '@/hooks/useHandleCode';
import useSubmitNote from '@/hooks/useSubmitNote';
import ConsoleActionBar from '../reusables/codeEditor/ConsoleActionBar';
import FontSelection from '../reusables/codeEditor/FontSelection';
import TabSizeSelection from '../reusables/codeEditor/TabSizeSelection';
import Modal from '../reusables/Modal';
import RunResults from './RunResults';
import SubmissionResults from './SubmissionResults';
import WorkingNote from '../reusables/codeEditor/WorkingNote';
import DebugConsole from '../reusables/codeEditor/DebugConsole';
import EditorActionBar from '../reusables/codeEditor/EditorActionBar';
import Alert from '../reusables/Alert';
import DebuggingActionBar from '../reusables/codeEditor/DebuggingActionBar';
import {
  RunResult,
  ResultMessage,
  NotificationType,
  Submission,
  CodeLine,
  SocketType
} from '@/types/dataTypes';
import ClipboardIcon from '../icons/ClipboardIcon';
import Tooltip from '../reusables/Tooltip';
import ClipboardCopiedIcon from '../icons/ClipboardCopiedIcon';
import DocumentIcon from '../icons/DocumentIcon';
import useCodeLines from '@/hooks/useCodeLines';
import useCodeCustomEffect from '@/hooks/useCodeCustomEffect';
import Link from 'next/link';
import LockIcon from '../icons/LockIcon';
import SmallLoading from '../reusables/SmallLoading';
import variables from '@/styles/variables.module.scss';
import classes from './ProblemEditor.module.scss';

type ProblemEditorProps = {
  prompts: { python: string; javascript: string; [key: string]: string };
  title: string;
  listNames: string[];
  reviewCode: { code: string; language: string } | undefined;
  setReviewCode: Dispatch<
    SetStateAction<{ code: string; language: string } | undefined>
  >;
  socketConnection: SocketType;
  availableWidth: number;
};

const ProblemEditor: React.FC<ProblemEditorProps> = ({
  prompts,
  title,
  listNames,
  reviewCode,
  setReviewCode,
  socketConnection,
  availableWidth
}) => {
  const session = useSession();
  const { theme, submissions, notes, debugging } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { submissions, notes } = state.user;
    const { debugging } = state.debugger;
    return {
      theme,
      submissions,
      notes,
      debugging
    };
  });

  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({
    fontSize: 14,
    tabSize: 4
  });
  const [language, setLanguage] = useState('python');
  const [userPythonSubmission, setUserPythonSubmission] = useState<
    Submission | undefined
  >(undefined);
  const [userJavascriptSubmission, setUserJavascriptSubmission] = useState<
    Submission | undefined
  >(undefined);
  const [codeInputPython, setCodeInputPython] = useState<string | undefined>(
    undefined
  );
  const [codeInputJavascript, setCodeInputJavascript] = useState<
    string | undefined
  >(undefined);
  const [showConsole, setShowConsole] = useState(false);

  const [editorHeight, setEditorHeight] = useState(100);
  const [editorMinHeight, setEditorMinHeight] = useState(50);
  const [editorMaxHeight, setEditorMaxHeight] = useState(100);
  const [availableHeight, setAvailableHeight] = useState<number | null>(null);

  const [codeError, setCodeError] = useState<string | null>(null);
  const [output, setOutput] = useState('');
  const [testCode, setTestCode] = useState(false);
  const [runResults, setRunResults] = useState<RunResult | null>(null);
  const [resultMessage, setResultMessage] = useState<ResultMessage | null>(
    null
  );

  const [noteContent, setNoteContent] = useState<string | null>(null);
  const [showNote, setShowNote] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [codeLines, setCodeLines] = useState<CodeLine[]>([]);

  const { getCodeLines, handleHighLightError } = useCodeLines(editorRef);
  const { handleSubmitNote } = useSubmitNote(setShowAlert, setNotification);
  const { isCopied, setIsCopied, handleCopyClick } = useCopy();
  const { handleRunCodeManually, handleSubmission } = useHandleCode({
    title,
    prompts,
    showConsole,
    setShowConsole,
    setEditorHeight,
    setShowAlert,
    setNotification,
    setCodeError,
    setRunResults,
    setResultMessage,
    setTestCode,
    setOutput,
    setIsLoading
  });

  useCodeCustomEffect({
    title,
    language,
    prompts,
    notes,
    codeInputPython,
    codeInputJavascript,
    codeLines,
    reviewCode,
    submissions,
    codeError,
    editorRef,
    getCodeLines,
    handleHighLightError,
    setCodeInputPython,
    setCodeInputJavascript,
    setUserPythonSubmission,
    setUserJavascriptSubmission,
    setOptions,
    setCodeLines,
    setEditorHeight,
    setEditorMaxHeight,
    availableHeight,
    setAvailableHeight,
    setNoteContent,
    showConsole,
    setShowConsole
  });

  const handleShowConsole = () => {
    if (availableHeight) {
      if (showConsole) {
        setEditorHeight(availableHeight * 0.6);
        setShowConsole(false);
      } else {
        setEditorHeight(availableHeight - 105);
        setShowConsole(true);
      }
    }
  };

  const handleCloseNote = async () => {
    const note = {
      list_name: listNames.join(', '),
      title,
      content: noteContent!
    };
    setShowNote(false);

    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.style.overflow = '';
    }

    await handleSubmitNote(undefined, note);
  };

  const renderedTopBar = debugging ? (
    <DebuggingActionBar
      setShowNote={setShowNote}
      title={title}
      socketConnection={socketConnection}
    />
  ) : (
    <>
      {codeInputPython !== undefined && codeInputJavascript !== undefined && (
        <EditorActionBar
          title={title}
          language={language}
          setLanguage={setLanguage}
          setCodeInputPython={setCodeInputPython}
          setCodeInputJavascript={setCodeInputJavascript}
          setShowNote={setShowNote}
          userPythonSubmission={userPythonSubmission}
          userJavascriptSubmission={userJavascriptSubmission}
          prompts={prompts}
        />
      )}
    </>
  );

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
        className={`${classes['problem-editor']} ${
          classes[`problem-editor--${theme}`]
        }`}
      >
        <div
          className={`problem-editor ${
            showConsole ? 'show-console' : ''
          } ${theme} ${classes['problem-editor__main']}`}
        >
          {reviewCode ? (
            <div
              className={`${classes['submission-review']} ${
                classes[`submission-review--${theme}`]
              }`}
            >
              <button
                className={classes['editor__close-button']}
                onClick={() => {
                  setReviewCode(undefined);
                  setIsCopied(false);
                }}
              >
                ✕
              </button>
              <ul className="flex items-center pt-1 justify-end ml-auto space-x-4">
                <li onClick={() => setShowNote(true)}>
                  <Tooltip
                    text="Note"
                    direction="bottom"
                    className="w-fit px-6 py-4"
                  >
                    <span className="opacity-[0.7]">
                      <DocumentIcon width={7} height={7} />
                    </span>
                  </Tooltip>
                </li>
                <li>
                  <button
                    className={classes['editor__copy-button']}
                    onClick={() => handleCopyClick(reviewCode.code)}
                  >
                    <Tooltip
                      text={isCopied ? 'Copied' : 'Copy'}
                      direction="bottom"
                      className="w-fit py-3 px-6"
                    >
                      {isCopied ? (
                        <span className="opacity-[0.7]">
                          <ClipboardCopiedIcon width="8" height="8" />
                        </span>
                      ) : (
                        <span className="opacity-[0.7]">
                          <ClipboardIcon width="8" height="8" />
                        </span>
                      )}
                    </Tooltip>
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>{renderedTopBar}</>
          )}
          {availableHeight && (
            <Resizable
              axis="y"
              resizeHandles="s"
              height={editorHeight}
              setHeight={setEditorHeight}
              minHeight={editorMinHeight}
              maxHeight={editorMaxHeight}
            >
              {codeInputPython !== undefined &&
                codeInputJavascript !== undefined &&
                editorHeight && (
                  <div
                    className={`${classes['md-editor']} ${
                      classes[`md-editor--${theme}`]
                    }`}
                  >
                    <CodeEditor
                      editorRef={editorRef}
                      value={
                        reviewCode
                          ? reviewCode.code
                          : language === 'python'
                          ? codeInputPython
                          : codeInputJavascript
                      }
                      options={options}
                      readOnly={false}
                      language={reviewCode ? reviewCode.language : language}
                      setCodeInput={
                        language === 'python'
                          ? setCodeInputPython
                          : setCodeInputJavascript
                      }
                      height={`${editorHeight}px`}
                    />
                  </div>
                )}
            </Resizable>
          )}
          {showConsole && availableHeight && (
            <div
              className={classes.console}
              style={{
                height: `${availableHeight - editorHeight + 35}px`,
                maxHeight: `${availableHeight - editorHeight + 35}px`
              }}
            >
              <div
                className={classes['output-wrapper']}
                style={{
                  height: `${availableHeight - editorHeight - 5}px`,
                  maxHeight: `${availableHeight - editorHeight - 5}px`
                }}
              >
                <div
                  className={`console-output ${theme} ${classes.output}`}
                  style={{
                    height: `${availableHeight - editorHeight - 45}px`,
                    maxHeight: `${availableHeight - editorHeight - 45}px`
                  }}
                >
                  {debugging ? (
                    <DebugConsole
                      consoleHeight={availableHeight - editorHeight - 45}
                    />
                  ) : (
                    <>
                      {isLoading && (
                        <div className="flex items-center justify-center h-full space-x-4">
                          <span className="w-[35px] h-[35px]">
                            <SmallLoading width={35} height={35} />
                          </span>
                          <p
                            className="text-[1.8rem]"
                            style={{
                              color:
                                theme === 'dark'
                                  ? variables.textOffWhite
                                  : variables.colorGray700
                            }}
                          >
                            Hang tight...
                          </p>
                        </div>
                      )}
                      {!isLoading && testCode && (
                        <>
                          <h2
                            className={
                              theme === 'light' ? `text-[#4f4c52]` : ''
                            }
                          ></h2>
                          <code
                            className={`${classes.code} ${
                              classes[`code--${theme}`]
                            }`}
                          >
                            {output.includes('\n')
                              ? output.split('\n').map((str, index) => (
                                  <p key={index} className="mb-2">
                                    {str}
                                  </p>
                                ))
                              : output}
                          </code>
                        </>
                      )}
                      {!isLoading && codeError && (
                        <code
                          className={`${classes.code} ${
                            classes[`code--error--${theme}`]
                          }`}
                        >
                          {!codeError.includes('\n') ? (
                            <p className="text-red-500 mt-4 mb-4 text-[1.4rem]">
                              {codeError}
                            </p>
                          ) : (
                            <div className="my-4 space-y-2">
                              {codeError.split('\n').map((el, index) => (
                                <p
                                  key={index}
                                  className={`text-red-500 ${
                                    el.includes('Error')
                                      ? 'text-[1.4rem]'
                                      : 'ml-2'
                                  }`}
                                >
                                  {el}
                                </p>
                              ))}
                            </div>
                          )}
                        </code>
                      )}
                      {!isLoading && !codeError && resultMessage && (
                        <SubmissionResults result={resultMessage} />
                      )}
                      {!isLoading &&
                        availableHeight &&
                        !resultMessage &&
                        runResults && (
                          <RunResults type="test" testResults={runResults} />
                        )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          <div
            className={classes['console-action-bar__container']}
            style={{ width: `${availableWidth}px` }}
          >
            {!session.data && editorRef.current && (
              <div
                className={`${classes['code-actions-backdrop']} ${
                  classes[`code-actions-backdrop--${theme}`]
                }`}
                style={{ width: `${availableWidth}px` }}
              >
                <p
                  className={`${classes['lock-message']} ${
                    classes[`lock-message--${theme}`]
                  }`}
                >
                  <span className={classes['lock-icon']}>
                    <LockIcon width={8} height={8} />
                  </span>{' '}
                  You need to &nbsp;{' '}
                  <Link
                    className={classes['lock-message__login']}
                    href="/auth/login"
                  >
                    Login
                  </Link>
                  <span className={classes.slash}>/</span>
                  <Link
                    className={classes['lock-message__signup']}
                    href="/auth/signup"
                  >
                    Sign Up
                  </Link>{' '}
                  &nbsp; to run code
                </p>
              </div>
            )}
            <ConsoleActionBar
              showConsole={showConsole}
              isLoading={isLoading}
              reviewCode={reviewCode}
              language={language}
              codeInputPython={codeInputPython}
              codeInputJavascript={codeInputJavascript}
              socketConnection={socketConnection}
              handleShowConsole={handleShowConsole}
              handleRunCodeManually={handleRunCodeManually}
              handleSubmission={handleSubmission}
            />
          </div>

          <Modal
            id="modal-settings"
            type="close-button"
            buttonPosition="top-5 right-[-1.5rem]"
            className="overflow-visible"
            noBorderRadius={false}
          >
            <div
              className={`${classes.settings} ${classes[`settings--${theme}`]}`}
            >
              <h1>Settings</h1>
              <div className={classes.font}>
                <div className={classes['font-description']}>
                  <p
                    className={`${classes.title} ${classes[`title--${theme}`]}`}
                  >
                    Font Size
                  </p>
                  <p>Select font size for code editor.</p>
                </div>
                <FontSelection options={options} setFont={setOptions} />
              </div>
              <div className={classes.tab}>
                <div className={classes['tab-description']}>
                  <p
                    className={`${classes.title} ${classes[`title--${theme}`]}`}
                  >
                    Tab Size
                  </p>
                  <p>Select tab size for code editor.</p>
                </div>
                <TabSizeSelection options={options} setTabSize={setOptions} />
              </div>
            </div>
          </Modal>
          <WorkingNote
            showNote={showNote}
            closeNote={handleCloseNote}
            noteContent={noteContent}
            setNoteContent={setNoteContent}
          />
        </div>
      </div>
    </>
  );
};

export default ProblemEditor;
