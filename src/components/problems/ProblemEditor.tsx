import { useState, useRef, Dispatch, SetStateAction } from 'react';
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
import Loading from '../reusables/Loading';
import RunResults from './RunResults';
import SubmissionResults from './SubmissionResults';
import EditorActionBar from '../reusables/codeEditor/EditorActionBar';
import Alert from '../reusables/Alert';
import TextEditor from '../reusables/TextEditor';

import variables from '@/styles/variables.module.scss';
import classes from './ProblemEditor.module.scss';

import {
  RunResult,
  ResultMessage,
  NotificationType,
  Submission,
  Note,
  CodeLine
} from '@/types/dataTypes';
import ClipboardIcon from '../icons/ClipboardIcon';
import Tooltip from '../reusables/Tooltip';
import ClipboardCopiedIcon from '../icons/ClipboardCopiedIcon';
import DocumentIcon from '../icons/DocumentIcon';
import useCodeLines from '@/hooks/useCodeLines';
import useCodeCustomEffect from '@/hooks/useCodeCustomEffect';

type ProblemEditorProps = {
  prompts: { python: string; javascript: string; [key: string]: string };
  title: string;
  listNames: string[];
  reviewCode: { code: string; language: string } | undefined;
  setReviewCode: Dispatch<
    SetStateAction<{ code: string; language: string } | undefined>
  >;
};

const ProblemEditor: React.FC<ProblemEditorProps> = ({
  prompts,
  title,
  listNames,
  reviewCode,
  setReviewCode
}) => {
  const { theme, submissions, notes } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { submissions, notes } = state.user;
    return {
      theme,
      submissions,
      notes
    };
  });
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({
    fontSize: 14,
    tabSize: 4,
    readOnly: false
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
  const [editorHeight, setEditorHeight] = useState<string | null>(null);
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
    setNoteContent
  });

  const handleShowConsole = () => {
    if (showConsole) {
      setEditorHeight(`${window.innerHeight - 188}px`);
      setShowConsole(false);
    } else {
      setEditorHeight(`${window.innerHeight - 400}px`);
      setShowConsole(true);
    }
  };

  const handleCloseNoteModal = async () => {
    const note = {
      list_name: listNames.join(', '),
      title,
      content: noteContent!
    };
    await handleSubmitNote(undefined, note);
    setShowNote(false);
  };

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
        <div className={classes['problem-editor__main']}>
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
                    <label
                      htmlFor={`modal__editor-note-${title}`}
                      className="w-fit cursor-pointer"
                    >
                      <span className="opacity-[0.7]">
                        <DocumentIcon width={7} height={7} />
                      </span>
                    </label>
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
            <>
              {codeInputPython !== undefined &&
                codeInputJavascript !== undefined && (
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
          )}

          {codeInputPython !== undefined &&
            codeInputJavascript !== undefined &&
            editorHeight && (
              <>
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
                    language={reviewCode ? reviewCode.language : language}
                    setCodeInput={
                      language === 'python'
                        ? setCodeInputPython
                        : setCodeInputJavascript
                    }
                    height={editorHeight}
                  />
                </div>
                {showConsole && (
                  <Resizable setEditorHeight={setEditorHeight}>
                    <div className={classes.console}>
                      <div className={classes.output}>
                        {isLoading && (
                          <div className="flex items-center justify-center h-full space-x-4">
                            <span className="w-[35px] h-[35px]">
                              <Loading width={35} height={35} />
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
                            >
                              Stdout:
                            </h2>
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
                            className={`${classes.code} ${classes['code--error']}`}
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
                        {!isLoading && !resultMessage && runResults && (
                          <RunResults type="test" testResults={runResults} />
                        )}
                      </div>
                    </div>
                  </Resizable>
                )}
              </>
            )}
        </div>
        <ConsoleActionBar
          showConsole={showConsole}
          isLoading={isLoading}
          reviewCode={reviewCode}
          language={language}
          codeInputPython={codeInputPython}
          codeInputJavascript={codeInputJavascript}
          handleShowConsole={handleShowConsole}
          handleRunCodeManually={handleRunCodeManually}
          handleSubmission={handleSubmission}
        />
        <Modal
          id="modal-settings"
          type="close-button"
          className="overflow-visible"
        >
          <div
            className={`${classes.settings} ${classes[`settings--${theme}`]}`}
          >
            <h1>Settings</h1>
            <div className={classes.font}>
              <div className={classes['font-description']}>
                <p className={`${classes.title} ${classes[`title--${theme}`]}`}>
                  Font Size
                </p>
                <p>Select font size for code editor.</p>
              </div>
              <FontSelection options={options} setFont={setOptions} />
            </div>
            <div className={classes.tab}>
              <div className={classes['tab-description']}>
                <p className={`${classes.title} ${classes[`title--${theme}`]}`}>
                  Tab Size
                </p>
                <p>Select tab size for code editor.</p>
              </div>
              <TabSizeSelection options={options} setTabSize={setOptions} />
            </div>
          </div>
        </Modal>
        <Modal
          id={`modal__editor-note-${title}`}
          type="close-button"
          className={`max-w-[100vw] max-h-[100vh] w-[70vw] h-[60vh] px-8 pt-24 ${
            theme === 'dark' ? 'bg-[#2b2b2b]' : 'bg-white'
          }`}
          onClose={handleCloseNoteModal}
        >
          <div className={`code-editor__note code-editor__note--${theme}`}>
            {showNote && (
              <TextEditor value={noteContent!} setValue={setNoteContent} />
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ProblemEditor;
