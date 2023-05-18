import { useState, useEffect } from 'react';
import CodeEditor from '@/components/reusables/codeEditor/CodeEditor';
import Resizable from '../reusables/Resizable';
import { useAppSelector } from '@/hooks/hooks';
import FontSelection from '../reusables/codeEditor/FontSelection';
import classes from './ProblemEditor.module.scss';
import LanguageSelection from '../reusables/codeEditor/LanguageSelection';
import TabSizeSelection from '../reusables/codeEditor/TabSizeSelection';
import SettingsIcon from '../icons/SettingsIcon';
import Modal from '../reusables/Modal';
import Alert from '../reusables/Alert';

import { runCode, submitCode } from '@/helpers/submission-api-util';
import Button from '../reusables/Button';
import variables from '@/styles/variables.module.scss';
import ChevronDown from '../icons/ChevronDown';
import SubmissionResults from './SubmissionResults';
import { SubmissionResult, Result, ResultMessage } from '@/types/dataTypes';

import { NotificationType } from '@/types/dataTypes';
import PassIcon from '../icons/PassIcon';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import FailedCircleIcon from '../icons/FailedCircleIcon';
import Loading from '../reusables/Loading';

type ProblemEditorProps = {
  prompts: { python: string; javascript: string; [key: string]: string };
  title: string;
};

const ProblemEditor: React.FC<ProblemEditorProps> = ({ prompts, title }) => {
  const { theme } = useAppSelector((state) => state.theme);
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState({ fontSize: 14, tabSize: 4 });
  const [language, setLanguage] = useState('python');
  const [codeInput, setCodeInput] = useState('');
  // const [output, setOutput] = useState('');
  const [showConsole, setShowConsole] = useState(false);
  const [editorHeight, setEditorHeight] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResult | null>(null);
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
  //   setEditorHeight(`${window.innerHeight - 350}px`);
  //   const result = await runCode(codeInput);
  //   if (typeof result !== 'string') {
  //     setOutput(result.output);
  //   }
  // };

  const handleSubmission = async (action: 'test' | 'submit') => {
    if (!showConsole) {
      setShowConsole(true);
      setEditorHeight(`${window.innerHeight - 350}px`);
    }

    if (codeInput === '') {
      return;
    }

    setIsLoading(true);

    const result = await submitCode(codeInput, language, title, action);
    setIsLoading(false);

    if (result.hasOwnProperty('error')) {
      setResultMessage(null);
      setSubmissionResult(null);
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
        setSubmissionResult(result);
      } else {
        const { results, runtime } = result;
        const isPassed = results.every((el: Result) => el.result === 'passed');
        const totalPassedTests = results.filter(
          (el: Result) => el.result === 'passed'
        );

        setResultMessage({
          passResult: isPassed,
          testPassed: `${totalPassedTests.length}/${results.length}`,
          testFailed: `${results.length - totalPassedTests.length}`,
          runtime: `${runtime} ms`
        });
      }
    }
  };

  const handleShowConsole = () => {
    if (showConsole) {
      setEditorHeight(`${window.innerHeight - 195}px`);
      setShowConsole(false);
    } else {
      setEditorHeight(`${window.innerHeight - 350}px`);
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
          <div className={classes['editor-menu']}>
            <LanguageSelection setLanguage={setLanguage} />
            <ul className={classes.options}>
              <li>
                <label htmlFor="modal-settings" className="cursor-pointer">
                  <SettingsIcon width="8" height="8" />
                </label>
              </li>
            </ul>
          </div>
          {editorHeight && (
            <>
              <div
                className={`${classes['md-editor']} ${
                  classes[`md-editor--${theme}`]
                }`}
              >
                <CodeEditor
                  value={prompts}
                  options={options}
                  language={language}
                  setCodeInput={setCodeInput}
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
                        <div className={`${classes['submission__message']}`}>
                          {resultMessage.passResult ? (
                            <h1 className="text-green-500">
                              <span>
                                <CheckCircleIcon width={23} height={23} />
                              </span>
                              You passed all tests
                            </h1>
                          ) : (
                            <h1 className="text-red-500">
                              <span>
                                <FailedCircleIcon width={23} height={23} />
                              </span>
                              {`${resultMessage.testFailed} ${
                                +resultMessage.testFailed > 1 ? 'tests' : 'test'
                              }`}{' '}
                              failed
                            </h1>
                          )}
                          <h3
                            className={`${
                              resultMessage.passResult
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                          >
                            {resultMessage.testPassed}
                          </h3>
                          <p className={`${classes[`runtime--${theme}`]}`}>
                            Runtime {resultMessage.runtime}
                          </p>
                        </div>
                      )}
                      {!isLoading && !resultMessage && submissionResult && (
                        <SubmissionResults testResults={submissionResult} />
                      )}
                    </div>
                  </div>
                </Resizable>
              )}
            </>
          )}
        </div>
        <div
          className={`${classes['code-actions']} ${
            classes[`code-actions--${theme}`]
          }`}
        >
          <Button
            extraStyle={{
              padding: '0 1rem',
              backgroundColor: variables.colorGray700
            }}
            onClick={handleShowConsole}
          >
            Console
            <span className="ml-3">
              <ChevronDown
                className={`${showConsole ? classes.down : classes.up}`}
              />
            </span>
          </Button>
          <div className="flex space-x-5">
            <Button
              extraStyle={{
                backgroundColor: variables.colorGray500,
                padding: '0 2rem'
              }}
              onClick={() => handleSubmission('test')}
            >
              Run
            </Button>
            <Button
              extraStyle={{
                backgroundColor: variables.colorSuccess500,
                padding: '0 2rem'
              }}
              onClick={() => handleSubmission('submit')}
            >
              Submit
            </Button>
          </div>
        </div>
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
