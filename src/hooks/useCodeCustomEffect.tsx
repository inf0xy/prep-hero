import { CodeLine, CodeOptions, Submission } from '@/types/dataTypes';
import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

type UseCodeCustomEffectProps = {
  title: string;
  prompts: { python: string; javascript: string; [key: string]: string };
  codeInputPython: string | undefined;
  codeInputJavascript: string | undefined;
  codeLines: CodeLine[];
  reviewCode: { code: string; language: string } | undefined;
  submissions: Submission[];
  codeErrorDetail: string | null;
  editorRef: RefObject<HTMLDivElement>;
  getCodeLines: () => CodeLine[];
  handleHighLightError: (
    codeLines: CodeLine[],
    codeErrorDetail: string
  ) => void;
  setCodeInputPython: Dispatch<SetStateAction<string | undefined>>;
  setCodeInputJavascript: Dispatch<SetStateAction<string | undefined>>;
  setUserPythonSubmission: Dispatch<
    SetStateAction<Submission | undefined | undefined>
  >;
  setUserJavascriptSubmission: Dispatch<
    SetStateAction<Submission | undefined | undefined>
  >;
  setOptions: Dispatch<SetStateAction<CodeOptions>>;
  setCodeLines: Dispatch<SetStateAction<CodeLine[]>>;
  setEditorHeight: Dispatch<SetStateAction<string | null>>;
};

const useCodeCustomEffect = ({
  title,
  prompts,
  codeInputPython,
  codeInputJavascript,
  codeLines,
  reviewCode,
  submissions,
  codeErrorDetail,
  editorRef,
  getCodeLines,
  handleHighLightError,
  setCodeInputPython,
  setCodeInputJavascript,
  setUserPythonSubmission,
  setUserJavascriptSubmission,
  setOptions,
  setCodeLines,
  setEditorHeight
}: UseCodeCustomEffectProps) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setEditorHeight(`${window.innerHeight - 188}px`);
    }
  }, []);

  useEffect(() => {
    if (codeInputPython) {
      setTimeout(() => {
        const codes = getCodeLines();
        setCodeLines(codes);
      }, 500);
    }
  }, [codeInputPython, codeInputJavascript]);

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

    let pythonCode, javascriptCode;
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

  useEffect(() => {
    if (codeErrorDetail && editorRef.current) {
      handleHighLightError(codeLines, codeErrorDetail);
    }
  }, [codeErrorDetail, codeLines]);
};

export default useCodeCustomEffect;
