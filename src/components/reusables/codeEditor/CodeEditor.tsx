import { useRef, Dispatch, SetStateAction, RefObject } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useAppSelector } from '@/hooks/hooks';
import { CodeOptions } from '@/types/dataTypes';
import Loading from '../Loading';

type CodeEditorProps = {
  value: string;
  options: CodeOptions;
  language: string;
  height: string;
  setCodeInput: (val: string) => void | Dispatch<SetStateAction<string>>;
  editorRef?: RefObject<HTMLDivElement>;
  breakpoints: number[];
  setBreakpoints: Dispatch<SetStateAction<number[]>>;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  options,
  language,
  height,
  setCodeInput,
  editorRef,
  breakpoints,
  setBreakpoints
}) => {
  const { theme } = useAppSelector((state) => state.theme);

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
    if (event.target?.position && event.target.position.column === 1) {
      const { lineNumber } = event.target?.position;
      if (
        // breakpointState.current &&
        !breakpointState.current.includes(lineNumber)
      ) {
        setBreakpoints((prev) => [...prev, lineNumber]);
        breakpointState.current = [...breakpointState.current, lineNumber];
        renderedBreakpointsDecorations('add', lineNumber, event.target.range);
      } else {
        setBreakpoints((prev) => prev.filter((line) => line !== lineNumber));
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
      const newId = (codeEditorModelRef.current as any).deltaDecorations(
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
      if (event.target.position.column === 1) {
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
    if (!options.readOnly) {
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
          ...options
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
