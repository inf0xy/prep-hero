import { useState, useEffect, Dispatch, SetStateAction, RefObject } from 'react';
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
  editorRef?: RefObject<HTMLDivElement>
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  options,
  language,
  height,
  setCodeInput,
  editorRef
}) => {
  const { theme } = useAppSelector(state => state.theme);

  const handleEditorChange = (value: string | undefined) => {
    if (!options.readOnly) {
      setCodeInput(value!);
    }
  };

  // const [breakpoints, setBreakpoints] = useState<number[]>([]);
  // const [currentDecorationId, setCurrentDecorationId] = useState<string | null>(null);


  // const handleLineClick = (lineNumber: number, editor: any, monaco: any) => {
  //   const updatedBreakpoints = breakpoints.includes(lineNumber)
  //     ? breakpoints.filter((line) => line !== lineNumber)
  //     : [...breakpoints, lineNumber];
  //   setBreakpoints(updatedBreakpoints);

  //   if (currentDecorationId) {
  //     editor.deltaDecorations([currentDecorationId], []);
  //   }
  //   const newDecorationId = editor.deltaDecorations([], [
  //     {
  //       range: new monaco.Range(lineNumber, 1, lineNumber, 1),
  //       options: {
  //         isWholeLine: true,
  //         className: 'view-line.code-error-highlight',
  //       },
  //     },
  //   ]);

  //   setCurrentDecorationId(newDecorationId[0]);


    // Send updated breakpoints to the backend debugger through the WebSocket connection
    // sendBreakpointsToDebugger(updatedBreakpoints);
  // };

//   const highlightBreakpointLine = (lineNumber: number, editor: any, monaco: any) => {
//   if (editor) {
//     editor.revealLineInCenter(lineNumber);
//     editor.deltaDecorations([], [
//       {
//         range: new monaco.Range(lineNumber, 1, lineNumber, 1),
//         options: {
//           isWholeLine: true,
//           className: 'breakpoint-hit-line',
//         },
//       },
//     ]);
//   }
// };

  return (
    <div className="code-editor" ref={editorRef}>
      <MonacoEditor
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        language={language}
        height={height}
        value={value}
        options={{
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
        // onMount={(editor, monaco) => {
        //   editor.onMouseDown((event) => {
        //     if (event.target.position) {
        //       const lineNumber = event.target.position.lineNumber;
        //       // highlightBreakpointLine(lineNumber, editor, monaco)
        //       handleLineClick(lineNumber, editor, monaco)
        //     }
        //   })
        // }}
      />
    </div>
  );
};

export default CodeEditor;
