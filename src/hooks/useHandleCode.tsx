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
  showConsole: boolean;
  setShowConsole: Dispatch<SetStateAction<boolean>>;
  setEditorHeight: Dispatch<SetStateAction<string | null>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  setNotification: Dispatch<SetStateAction<NotificationType | null>>;
  setCodeError: Dispatch<SetStateAction<string | null>>;
  setCodeErrorDetail: Dispatch<SetStateAction<string | null>>;
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
    codeInputJavascript: string | undefined
  ) => Promise<void>;
  handleSubmission: (
    action: 'test' | 'submit',
    reviewCode: { code: string; language: string } | undefined,
    language: string,
    codeInputPython: string | undefined,
    codeInputJavascript: string | undefined
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
  setCodeErrorDetail,
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
      codeInputJavascript: string | undefined
    ) => {
      setCodeError(null);
      setCodeErrorDetail(null);
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
        codeInput =
          language === 'python' ? codeInputPython : codeInputJavascript;
        // submitLanguage = language;
      }

      const result = await runCode(codeInput!);

      if (result.hasOwnProperty('error')) {
        setTestCode(false);
        const errMessage = result.error.split('\n').reduce((acc: string[], line: string) => {
          if (!acc.includes(line)) {
            acc.push(line);
          }
          return acc;
        }, []).join('\n');
        setCodeError(errMessage);
        if ('errorDetail' in result) {
          setCodeErrorDetail(result.errorDetail);
        }
      } else {
        const formattedStr = result.output.replace(/'None'/g, JSON.stringify(null));
        setOutput(formattedStr);
      }
    },
    []
  );

  const handleSubmission = useCallback(
    async (
      action: 'test' | 'submit',
      reviewCode: { code: string; language: string } | undefined,
      language: string,
      codeInputPython: string | undefined,
      codeInputJavascript: string | undefined
    ) => {
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
      setCodeError(null);
      setCodeErrorDetail(null);

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

      setIsLoading(false);

      if (result.hasOwnProperty('error')) {
        setResultMessage(null);
        setRunResults(null);

        if (result.errorType === 'code') {
          const errMessage = result.error.split('\n').reduce((acc: string[], line: string) => {
            if (!acc.includes(line)) {
              acc.push(line);
            }
            return acc;
          }, []).join('\n');
          setCodeError(errMessage);
          if ('errorDetail' in result) {
            setCodeErrorDetail(result.errorDetail);
          }
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
          const { results, runtime } = result;
          const isPassed = results.every(
            (el: Result) => el.result === 'passed'
          );
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
    },
    []
  );

  return {
    handleRunCodeManually,
    handleSubmission
  };
};

export default useHandleCode;
