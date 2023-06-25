import {
  CodeLine,
  CodeOptions,
  Note,
  Submission
} from '@/types/dataTypes';
import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { setDebuggingCode } from '@/store';

type UseCodeCustomEffectProps = {
  title: string;
  language: string;
  prompts: { python: string; javascript: string; [key: string]: string };
  notes: Note[];
  codeInputPython: string | undefined;
  codeInputJavascript: string | undefined;
  codeLines: CodeLine[];
  reviewCode: { code: string; language: string } | undefined;
  submissions: Submission[];
  codeError: string | null;
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
  setEditorHeight: Dispatch<SetStateAction<number>>;
  setNoteContent: Dispatch<SetStateAction<string | null>>;
  showConsole: boolean;
  setShowConsole: Dispatch<SetStateAction<boolean>>;

  setEditorMaxHeight: Dispatch<SetStateAction<number>>;
  availableHeight: number | null;
  setAvailableHeight: Dispatch<SetStateAction<number | null>>;
};

const useCodeCustomEffect = ({
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
}: UseCodeCustomEffectProps) => {
  let problemNoteContent: string | undefined = '';
  if (notes) {
    const result = notes.find((el: Note) => el.title === title);
    problemNoteContent = result ? result.content : '';
  }

  const { debugging, hasDebuggingError } = useAppSelector((state) => state.debugger);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResetAvailableHeight = () => {
      setAvailableHeight(window.innerHeight - 175);
    };

    if (typeof window !== 'undefined') {
      setAvailableHeight(window.innerHeight - 175);
      window.addEventListener('resize', handleResetAvailableHeight);

      return () => {
        window.removeEventListener('resize', handleResetAvailableHeight);
      };
    }
  }, [setAvailableHeight]);

  useEffect(() => {
    if (availableHeight) {
      if (showConsole) {
        setEditorMaxHeight(availableHeight * 0.7 - 8);
        setEditorHeight(availableHeight * 0.7 - 8);
      } else {
        setEditorMaxHeight(availableHeight - 8);
        setEditorHeight(availableHeight - 8);
      }
    }
  }, [availableHeight, setEditorHeight, setEditorMaxHeight, showConsole]);

  useEffect(() => {
    if (debugging) {
      language === 'python'
        ? dispatch(setDebuggingCode(codeInputPython!))
        : dispatch(setDebuggingCode(codeInputJavascript!));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debugging, setDebuggingCode]);

  useEffect(() => {
    if (debugging) {
      setShowConsole(true);
    }
  }, [debugging, setShowConsole]);

  useEffect(() => {
    if (problemNoteContent) {
      setNoteContent(problemNoteContent);
    }
  }, [problemNoteContent, setNoteContent]);

  useEffect(() => {
    if (codeInputPython) {
      setTimeout(() => {
        const codes = getCodeLines();
        setCodeLines(codes);
      }, 500);
    }
  }, [codeInputPython, codeInputJavascript, getCodeLines, setCodeLines]);

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
  }, [reviewCode, setOptions]);

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
    if (editorRef.current) {
      handleHighLightError(codeLines, codeError || '');
    }
  }, [codeError, codeLines, editorRef, handleHighLightError]);
};

export default useCodeCustomEffect;
