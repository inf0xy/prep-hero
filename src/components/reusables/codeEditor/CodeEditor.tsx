import { Dispatch, SetStateAction, RefObject } from 'react';
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
  const { theme } = useAppSelector((state) => state.theme);

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
      />
    </div>
  );
};

export default CodeEditor;
