import {
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  RefObject,
  useEffect
} from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { CodeOptions } from '@/types/dataTypes';
import Loading from '../Loading';
import { setBreakpoints } from '@/store';

type CodeEditorProps = {
  value: string;
  options: CodeOptions;
  readOnly: boolean;
  language: string;
  height: string;
  setCodeInput: (val: string) => void | Dispatch<SetStateAction<string>>;
  editorRef?: RefObject<HTMLDivElement>;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  options,
  readOnly,
  language,
  height,
  setCodeInput,
  editorRef
}) => {
  const { theme, debugging, breakpoints, currentDebuggingLineNumber } =
    useAppSelector((state) => {
      const { theme } = state.theme;
      const { breakpoints, debugging, currentDebuggingLineNumber } =
        state.debugger;
      return { theme, breakpoints, debugging, currentDebuggingLineNumber };
    });
  const [lastDebugLineNumber, setLastDebugLineNumber] = useState(0);

  const dispatch = useAppDispatch();

  const breakpointsRef = useRef<number[] | null>(null);
  const codeEditorModelRef = useRef(null);
  const monacolRef = useRef(null);
  const breakpointState = useRef<number[]>([]);
  const lastHoverState = useRef<{
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
  } | null>(null);

  const handleMouseDown = (event: any) => {
    if (
      event.target?.position &&
      event.target.position.column === 1 &&
      event.target.range.endColumn > 1
    ) {
      const { lineNumber } = event.target?.position;
      if (!breakpointState.current.includes(lineNumber)) {
        const newBreakpoints = [...breakpoints, lineNumber];
        dispatch(setBreakpoints(newBreakpoints));
        breakpointState.current = [...breakpointState.current, lineNumber];
        renderedBreakpointsDecorations('add', lineNumber, event.target.range);
      } else {
        const newBreakpoints = breakpoints.filter(
          (line) => line !== lineNumber
        );
        dispatch(setBreakpoints(newBreakpoints));
        breakpointState.current = breakpointState.current.filter(
          (el) => el !== lineNumber
        );
        renderedBreakpointsDecorations(
          'remove',
          lineNumber,
          event.target.range
        );
      }
    }
  };

  const handleHighLightDebuggingLine = (
    action: 'add' | 'remove',
    lineNumber: number
  ) => {
    if (action === 'add') {
      (codeEditorModelRef.current as any).deltaDecorations(
        [],
        [
          {
            range: new (monacolRef.current as any).Range(
              lineNumber,
              1,
              lineNumber,
              1
            ),
            options: {
              isWholeLine: true,
              className:
                theme === 'dark'
                  ? 'code-debug-highlight--dark'
                  : 'code-debug-highlight--light'
            }
          }
        ]
      );
    } else {
      const decorations = (
        codeEditorModelRef.current as any
      ).getDecorationsInRange(
        new (monacolRef.current as any).Range(lineNumber, 1, lineNumber, 1)
      );

      const breakpointDecorations = decorations.filter(
        (decoration: any) =>
          decoration.options.className === 'code-debug-highlight--dark' ||
          decoration.options.className === 'code-debug-highlight--light'
      );

      (codeEditorModelRef.current as any).deltaDecorations(
        breakpointDecorations.map((decoration: any) => decoration.id),
        []
      );
    }
  };

  useEffect(() => {
    if (breakpoints.length > 0) {
      breakpointsRef.current = breakpoints;
    } else if (breakpoints.length === 0 && breakpointsRef.current) {
      breakpointsRef.current.forEach((line) => {
        renderedBreakpointsDecorations('remove', line, {
          startLineNumber: line,
          startColumn: 1,
          endLineNumber: line,
          endColumn: 1
        });
      });
    }
  }, [breakpoints]);

  useEffect(() => {
    if (debugging && debugging === true && currentDebuggingLineNumber) {
      if (lastDebugLineNumber) {
        handleHighLightDebuggingLine('remove', lastDebugLineNumber);
      }

      handleHighLightDebuggingLine('add', currentDebuggingLineNumber);
      setLastDebugLineNumber(currentDebuggingLineNumber);
    } else if (lastDebugLineNumber) {
      handleHighLightDebuggingLine('remove', lastDebugLineNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDebuggingLineNumber, debugging]);

  const renderedBreakpointsDecorations = (
    action: string,
    lineNumber: number,
    range: {
      startLineNumber: number;
      startColumn: number;
      endLineNumber: number;
      endColumn: number;
    }
  ) => {
    const { startLineNumber, startColumn, endLineNumber, endColumn } = range;
    if (action === 'add') {
      (codeEditorModelRef.current as any).deltaDecorations(
        [],
        [
          {
            range: new (monacolRef.current as any).Range(
              startLineNumber,
              startColumn,
              endLineNumber,
              endColumn
            ),
            options: {
              isWholeLine: false,
              glyphMarginClassName: 'breakpoint-set'
            }
          }
        ]
      );
    } else {
      const decorations = (
        codeEditorModelRef.current as any
      ).getDecorationsInRange(
        new (monacolRef.current as any).Range(
          startLineNumber,
          startColumn,
          endLineNumber,
          endColumn
        )
      );

      const breakpointDecorations = decorations.filter(
        (decoration: any) =>
          decoration.options.glyphMarginClassName === 'breakpoint-set'
      );

      (codeEditorModelRef.current as any).deltaDecorations(
        breakpointDecorations.map((decoration: any) => decoration.id),
        []
      );
    }
  };

  const handleHoverOnLineNumber = (range: {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
  }) => {
    const { startLineNumber, startColumn, endLineNumber, endColumn } = range;
    if (codeEditorModelRef.current && monacolRef.current) {
      (codeEditorModelRef.current as any).deltaDecorations(
        [],
        [
          {
            range: new (monacolRef.current as any).Range(
              startLineNumber,
              startColumn,
              endLineNumber,
              endColumn
            ),
            options: {
              isWholeLine: false,
              glyphMarginClassName: 'breakpoint-hover'
            }
          }
        ]
      );
    }
  };

  const handleHoverOffLineNumber = (range: {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
  }) => {
    const { startLineNumber, startColumn, endLineNumber, endColumn } = range;
    const decorations = (
      codeEditorModelRef.current as any
    ).getDecorationsInRange(
      new (monacolRef.current as any).Range(
        startLineNumber,
        startColumn,
        endLineNumber,
        endColumn
      )
    );

    const breakpointDecorations = decorations.filter(
      (decoration: any) =>
        decoration.options.glyphMarginClassName === 'breakpoint-hover'
    );

    (codeEditorModelRef.current as any).deltaDecorations(
      breakpointDecorations.map((decoration: any) => decoration.id),
      []
    );
  };

  const handleMouseMove = (event: any) => {
    if (event.target?.position) {
      if (
        event.target.position.column === 1 &&
        event.target.range.endColumn > 1
      ) {
        if (!lastHoverState.current) {
          lastHoverState.current = event.target.range;
          handleHoverOnLineNumber(event.target.range);
        } else {
          handleHoverOffLineNumber(lastHoverState.current);
          lastHoverState.current = event.target.range;
          handleHoverOnLineNumber(event.target.range);
        }
      } else if (lastHoverState.current) {
        handleHoverOffLineNumber(lastHoverState.current);
      }
    }
  };

  const handleMouseLeave = (event: any) => {
    if (lastHoverState.current) {
      handleHoverOffLineNumber(lastHoverState.current);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (!readOnly) {
      setCodeInput(value!);
    }
  };

  return (
    <div className="code-editor" ref={editorRef}>
      <MonacoEditor
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        language={language}
        height={height}
        value={value}
        options={{
          glyphMargin: true,
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          renderLineHighlight: 'none',
          quickSuggestions: false,
          renderWhitespace: 'none',
          folding: false,
          lineNumbersMinChars: 3,
          ...options,
          readOnly
        }}
        onChange={handleEditorChange}
        loading={<Loading width={40} height={40} />}
        onMount={(editor, monaco) => {
          (codeEditorModelRef as any).current = editor;
          (monacolRef as any).current = monaco;
          editor.onMouseDown(handleMouseDown);
          editor.onMouseMove(handleMouseMove);
          editor.onMouseLeave(handleMouseLeave);
        }}
      />
    </div>
  );
};

export default CodeEditor;
