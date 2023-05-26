import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import CodeEditor from '@/components/reusables/codeEditor/CodeEditor';
import Resizable from '../reusables/Resizable';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import useCopy from '@/hooks/useCopy';
import useHandleCode from '@/hooks/useHandleCode';
import useSubmitNote from '@/hooks/useSubmitNote';
import { saveSubmittedCode, setSelectedNote } from '@/store';
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

import { runCode, submitCode } from '@/helpers/submission-api-util';
import {
  RunResult,
  Result,
  ResultMessage,
  NotificationType,
  Submission
} from '@/types/dataTypes';
import ClipboardIcon from '../icons/ClipboardIcon';
import Tooltip from '../reusables/Tooltip';
import ClipboardCopiedIcon from '../icons/ClipboardCopiedIcon';
import DocumentIcon from '../icons/DocumentIcon';

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
  const dispatch = useAppDispatch();
  const { isCopied, setIsCopied, handleCopyClick } = useCopy();

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

  const { handleSubmitNote } = useSubmitNote(setShowAlert, setNotification);
  // const {
  //   isLoading,
  //   testCode,
  //   output,
  //   codeError,
  //   resultMessage,
  //   runResults,
  //   handleSubmission,
  //   handleRunCodeManually,
  //   codeInputPython,
  //   codeInputJavascript,
  //   setCodeInputPython,
  //   setCodeInputJavascript
  // } = useHandleCode({
  //   title,
  //   prompts,
  //   reviewCode,
  //   language,
  //   showConsole,
  //   setShowConsole,
  //   setEditorHeight,
  //   setShowAlert,
  //   setNotification
  // });

  const [output, setOutput] = useState('');
  const [testCode, setTestCode] = useState(false);

  const [runResults, setRunResults] = useState<RunResult | null>(null);
  const [resultMessage, setResultMessage] = useState<ResultMessage | null>(
    null
  );
  const [codeError, setCodeError] = useState<string | null>(null);

  let problemNoteContent: string | undefined = '';
  if (notes) {
    const result = notes.find((el) => el.title === title);
    problemNoteContent = result ? result.content : '';
  }

  const [noteContent, setNoteContent] = useState(problemNoteContent);
  const [showNote, setShowNote] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setEditorHeight(`${window.innerHeight - 188}px`);
    }
  }, []);

  useEffect(() => {
    if (reviewCode) {
      setOptions((prev) => ({
        ...prev,
        readOnly: true
      }));
    } else {
      setOptions((prev) => ({
        ...prev,
        readOnly: false
      }));
    }
  }, [reviewCode]);

  useEffect(() => {
    const foundSubmissions = submissions.filter((el) => el.title === title);

    let pythonCode, javascriptCode: string;
    let pythonSubmission: Submission[] = [];
    let javascriptSubmission: Submission[] = [];
    if (foundSubmissions.length) {
      foundSubmissions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      pythonSubmission = foundSubmissions.filter(
        (el) => el.language === 'python'
      );

      pythonCode = pythonSubmission.length
        ? JSON.parse(pythonSubmission[0].code)
        : JSON.parse(prompts['python']);

      javascriptSubmission = foundSubmissions.filter(
        (el) => el.language === 'javascript'
      );
      javascriptCode = javascriptSubmission.length
        ? JSON.parse(javascriptSubmission[0].code)
        : JSON.parse(prompts['javascript']);
    } else {
      pythonCode = JSON.parse(prompts['python']);
      javascriptCode = JSON.parse(prompts['javascript']);
    }

    setCodeInputPython(pythonCode);
    setCodeInputJavascript(javascriptCode);

    setUserPythonSubmission(pythonSubmission[0]);
    setUserJavascriptSubmission(javascriptSubmission[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissions]);

  const handleRunCodeManually = async () => {
    setCodeError(null);
    setRunResults(null);
    setResultMessage(null);
    setTestCode(true);
    setShowConsole(true);
    setEditorHeight(`${window.innerHeight - 400}px`);

    let codeInput: string | undefined;
    // let submitLanguage: string;
    if (reviewCode) {
      codeInput = reviewCode.code;
      // submitLanguage = reviewCode.language;
    } else {
      codeInput = language === 'python' ? codeInputPython : codeInputJavascript;
      // submitLanguage = language;
    }

    const result = await runCode(codeInput!);

    if (result.hasOwnProperty('error')) {
      setTestCode(false);
      setCodeError(result.error);
    } else {
      setOutput(result.output);
    }
  };

  const handleSubmission = async (action: 'test' | 'submit') => {
    if (!showConsole) {
      setShowConsole(true);
      setEditorHeight(`${window.innerHeight - 400}px`);
    }

    if (
      (language === 'python' &&
        codeInputPython === JSON.parse(prompts['python'])) ||
      (language === 'javascript' &&
        codeInputPython === JSON.parse(prompts['javascript']))
    ) {
      return;
    }

    setIsLoading(true);
    setTestCode(false);

    let codeInput: string | undefined;
    let submitLanguage: string;
    if (reviewCode) {
      codeInput = reviewCode.code;
      submitLanguage = reviewCode.language;
    } else {
      codeInput = language === 'python' ? codeInputPython : codeInputJavascript;
      submitLanguage = language;
    }

    const result = await submitCode(codeInput!, submitLanguage, title, action);

    setIsLoading(false);

    if (result.hasOwnProperty('error')) {
      setResultMessage(null);
      setRunResults(null);
      if (result.errorType === 'code') {
        setCodeError(result.error);
      } else {
        setNotification({
          status: 'error',
          message: 'Something went wrong. Please try again.'
        });
        setShowAlert(true);
      }
    } else {
      setCodeError(null);
      if (action === 'test') {
        setResultMessage(null);
        setRunResults(result);
      } else {
        const { results, runtime } = result;
        const isPassed = results.every((el: Result) => el.result === 'passed');
        const totalPassedTests = results.filter(
          (el: Result) => el.result === 'passed'
        );

        const totalFailedTest = results.filter(
          (el: Result) => el.result === 'failed'
        );

        setResultMessage({
          passResult: isPassed,
          testPassed: `${totalPassedTests.length}/${results.length}`,
          testFailed: `${results.length - totalPassedTests.length}`,
          failedTestCases: totalFailedTest,
          runtime: `${runtime}`,
          stdOut: result.stdOut
        });

        const userSubmission = {
          date: new Date(),
          title,
          language,
          code: JSON.stringify(codeInput),
          accepted: isPassed
        };
        await dispatch(saveSubmittedCode(userSubmission));
      }
    }
  };

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
      listName: listNames.join(', '),
      title,
      content: noteContent
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
                <li>
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
                        {testCode && (
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
          handleShowConsole={handleShowConsole}
          handleSubmission={handleSubmission}
          handleRunCodeManually={handleRunCodeManually}
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
