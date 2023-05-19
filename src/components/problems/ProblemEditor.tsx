import { useState, useEffect } from 'react';
import CodeEditor from '@/components/reusables/codeEditor/CodeEditor';
import Resizable from '../reusables/Resizable';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { saveSubmittedCode } from '@/store/slices/userSlice';
import ConsoleActionBar from '../reusables/codeEditor/ConsoleActionBar';
import FontSelection from '../reusables/codeEditor/FontSelection';
import TabSizeSelection from '../reusables/codeEditor/TabSizeSelection';
import Modal from '../reusables/Modal';
import Loading from '../reusables/Loading';
import RunResults from './RunResults';
import SubmissionResults from './SubmissionResults';
import EditorActionBar from '../reusables/codeEditor/EditorActionBar';
import Alert from '../reusables/Alert';

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

type ProblemEditorProps = {
  prompts: { python: string; javascript: string; [key: string]: string };
  title: string;
};

const ProblemEditor: React.FC<ProblemEditorProps> = ({ prompts, title }) => {
  const { theme, submissions } = useAppSelector((state) => {
    const { theme } = state.theme;
    const { submissions } = state.user;
    return {
      theme,
      submissions
    };
  });
  const dispatch = useAppDispatch();

  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({ fontSize: 14, tabSize: 4 });
  const [language, setLanguage] = useState('python');

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
  const [userPythonSubmission, setUserPythonSubmission] = useState<
    Submission | undefined
  >(pythonSubmission[0]);
  const [userJavascriptSubmission, setUserJavascriptSubmission] = useState<
    Submission | undefined
  >(javascriptSubmission[0]);

  const [codeInputPython, setCodeInputPython] = useState(pythonCode);
  const [codeInputJavascript, setCodeInputJavascript] =
    useState(javascriptCode);
  // const [output, setOutput] = useState('');
  const [showConsole, setShowConsole] = useState(false);
  const [editorHeight, setEditorHeight] = useState<string | null>(null);
  const [runResults, setRunResults] = useState<RunResult | null>(null);
  const [resultMessage, setResultMessage] = useState<ResultMessage | null>(
    null
  );
  const [codeError, setCodeError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setEditorHeight(`${window.innerHeight - 195}px`);
    }
  }, []);

  // const handleRunCode = async () => {
  //   setShowConsole(true);
  //   setEditorHeight(`${window.innerHeight - 400}px`);
  //   const result = await runCode(codeInput);
  //   if (typeof result !== 'string') {
  //     setOutput(result.output);
  //   }
  // };

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

    const codeInput =
      language === 'python' ? codeInputPython : codeInputJavascript;
    const result = await submitCode(codeInput, language, title, action);
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
          runtime: `${runtime}`
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
      setEditorHeight(`${window.innerHeight - 195}px`);
      setShowConsole(false);
    } else {
      setEditorHeight(`${window.innerHeight - 400}px`);
      setShowConsole(true);
    }
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
          <EditorActionBar
            title={title}
            language={language}
            setLanguage={setLanguage}
            setCodeInputPython={setCodeInputPython}
            setCodeInputJavascript={setCodeInputJavascript}
            userPythonSubmission={userPythonSubmission}
            userJavascriptSubmission={userJavascriptSubmission}
            prompts={prompts}
          />
          {editorHeight && (
            <>
              <div
                className={`${classes['md-editor']} ${
                  classes[`md-editor--${theme}`]
                }`}
              >
                <CodeEditor
                  value={
                    language === 'python'
                      ? codeInputPython
                      : codeInputJavascript
                  }
                  options={options}
                  language={language}
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
                      {/* <code
                      className={`${classes.code} ${classes[`code--${theme}`]}`}
                    >
                      {output}
                    </code> */}
                      {!isLoading && codeError && (
                        <code
                          className={`${classes.code} ${
                            classes[`code--${theme}`]
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
      </div>
    </>
  );
};

export default ProblemEditor;
