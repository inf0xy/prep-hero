import { Dispatch, SetStateAction, useCallback } from 'react';
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
  showConsole: boolean;
  setShowConsole: Dispatch<SetStateAction<boolean>>;
  setEditorHeight: Dispatch<SetStateAction<number>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  setNotification: Dispatch<SetStateAction<NotificationType | null>>;
  setCodeError: Dispatch<SetStateAction<string | null>>;
  setRunResults: Dispatch<SetStateAction<RunResult | null>>;
  setResultMessage: Dispatch<SetStateAction<ResultMessage | null>>;
  setTestCode: Dispatch<SetStateAction<boolean>>;
  setOutput: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

type UseHandleCodeReturnType = {
  handleRunCodeManually: (
    reviewCode: { code: string; language: string } | undefined,
    language: string,
    codeInputPython: string | undefined,
    codeInputJavascript: string | undefined,
    checkDebuggingError: boolean
  ) => Promise<{ error: any }>;
  handleSubmission: (
    action: 'test' | 'submit',
    reviewCode: { code: string; language: string } | undefined,
    language: string,
    codeInputPython: string | undefined,
    codeInputJavascript: string | undefined,
    duration?: number,
    timer?: number
  ) => Promise<void>;
};

const useHandleCode = ({
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
}: UseHandleCodeProps): UseHandleCodeReturnType => {
  const dispatch = useAppDispatch();

  const handleRunCodeManually = useCallback(
    async (
      reviewCode: { code: string; language: string } | undefined,
      language: string,
      codeInputPython: string | undefined,
      codeInputJavascript: string | undefined,
      checkDebuggingError: boolean
    ) => {
      setIsLoading(true);
      setCodeError(null);
      setRunResults(null);
      setResultMessage(null);
      setTestCode(true);
      setShowConsole(true);
      // setEditorHeight(`${window.innerHeight - 400}px`);

      let codeInput: string | undefined;
      // let submitLanguage: string;
      if (reviewCode) {
        codeInput = reviewCode.code;
        // submitLanguage = reviewCode.language;
      } else {
        codeInput =
          language === 'python' ? codeInputPython : codeInputJavascript;
        // submitLanguage = language;
      }

      const result = await runCode(codeInput!);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      if (result.hasOwnProperty('error')) {
        setTestCode(false);
        setCodeError(result.error);
        return { error: result.error };
      } else {
        if (checkDebuggingError) {
          return { error: undefined };
        }
        const formattedStr = result.output
          .replace(/"None"/g, JSON.stringify(null))
          .replace(/"True"/g, JSON.stringify(true))
          .replace(/"False"/g, JSON.stringify(false));
        setOutput(formattedStr);
        return { error: undefined };
      }
    },

    [
      setCodeError,
      setIsLoading,
      setOutput,
      setResultMessage,
      setRunResults,
      setShowConsole,
      setTestCode
    ]
  );

  const handleSubmission = useCallback(
    async (
      action: 'test' | 'submit',
      reviewCode: { code: string; language: string } | undefined,
      language: string,
      codeInputPython: string | undefined,
      codeInputJavascript: string | undefined,
      duration?: number,
      timer?: number
    ) => {
      if (!showConsole) {
        setShowConsole(true);
        // setEditorHeight(`${window.innerHeight - 400}px`);
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
      setCodeError(null);

      let codeInput: string | undefined;
      let submitLanguage: string;
      if (reviewCode) {
        codeInput = reviewCode.code;
        submitLanguage = reviewCode.language;
      } else {
        codeInput =
          language === 'python' ? codeInputPython : codeInputJavascript;
        submitLanguage = language;
      }

      const result = await submitCode(
        codeInput!,
        submitLanguage,
        title,
        action
      );

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

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
        if (action === 'test') {
          setResultMessage(null);
          setRunResults(result);
        } else {
          const { results, runtime, totalTests } = result;
          const isPassed = results.every(
            (el: Result) => el.result === 'passed'
          );
          const totalPassedTests = results.filter(
            (el: Result) => el.result === 'passed'
          );

          const totalFailedTest = results.filter((el: Result) =>
            el.result.includes('failed')
          );

          setResultMessage({
            passResult: isPassed,
            testPassed: `${totalPassedTests.length}/${totalTests}`,
            testFailed: `${totalTests - totalPassedTests.length}`,
            failedTestCases: totalFailedTest,
            runtime: `${runtime}`
          });

          const userSubmission: {
            date: Date;
            title: string;
            language: string;
            code: string;
            accepted: boolean;
            duration?: number;
          } = {
            date: new Date(),
            title,
            language,
            code: JSON.stringify(codeInput),
            accepted: isPassed
          };
          if (duration) {
            userSubmission.duration =
              timer && timer > 0 ? timer * 60 - duration : duration;
          }
          await dispatch(saveSubmittedCode(userSubmission));
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [
      dispatch,
      prompts,
      setCodeError,
      setIsLoading,
      setNotification,
      setResultMessage,
      setRunResults,
      setShowAlert,
      setShowConsole,
      setTestCode,
      showConsole,
      title
    ]
  );

  return {
    handleRunCodeManually,
    handleSubmission
  };
};

export default useHandleCode;
