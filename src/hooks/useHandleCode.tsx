import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useAppDispatch } from './hooks';
import { runCode, submitCode } from '@/helpers/submission-api-util';
import { saveSubmittedCode } from '@/store/slices/userSlice';

import {
  Result,
  RunResult,
  ResultMessage,
  NotificationType
} from '@/types/dataTypes';

type UseHandleCodeProps = {
  title: string;
  prompts: { python: string; javascript: string; [key: string]: string };
  reviewCode: { code: string; language: string } | undefined;
  language: string;
  // codeInputPython: string | undefined;
  // codeInputJavascript: string | undefined;
  showConsole: boolean;
  setShowConsole: Dispatch<SetStateAction<boolean>>;
  setEditorHeight: Dispatch<SetStateAction<string | null>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  setNotification: Dispatch<SetStateAction<NotificationType | null>>;
};

type UseHandleCodeReturnType = {
  isLoading: boolean;
  testCode: boolean;
  output: string;
  codeError: string | null;
  resultMessage: ResultMessage | null;
  runResults: RunResult | null;
  handleSubmission: (action: 'test' | 'submit') => Promise<void>;
  handleRunCodeManually: () => Promise<void>;
  codeInputPython: string | undefined;
  codeInputJavascript: string | undefined;
  setCodeInputPython: Dispatch<SetStateAction<string | undefined>>;
  setCodeInputJavascript: Dispatch<SetStateAction<string | undefined>>;
};

const useHandleCode = ({
  title,
  prompts,
  reviewCode,
  language,
  showConsole,
  setShowConsole,
  setEditorHeight,
  setShowAlert,
  setNotification
}: UseHandleCodeProps): UseHandleCodeReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [testCode, setTestCode] = useState(false);
  const [output, setOutput] = useState('');
  const [runResults, setRunResults] = useState<RunResult | null>(null);
  const [resultMessage, setResultMessage] = useState<ResultMessage | null>(
    null
  );

  const [codeInputPython, setCodeInputPython] = useState<string | undefined>(
    undefined
  );
  const [codeInputJavascript, setCodeInputJavascript] = useState<
    string | undefined
  >(undefined);

  const dispatch = useAppDispatch();

  const handleRunCodeManually = useCallback(async () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmission = useCallback(async (action: 'test' | 'submit') => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    testCode,
    output,
    codeError,
    resultMessage,
    runResults,
    handleSubmission,
    handleRunCodeManually,
    codeInputPython,
    codeInputJavascript,
    setCodeInputPython,
    setCodeInputJavascript
  };
};

export default useHandleCode;
