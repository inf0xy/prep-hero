import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useAppSelector } from '@/hooks/hooks';
import { CodeOptions } from '@/types/dataTypes';

type CodeEditorProps = {
  value?: string;
  options: CodeOptions;
  language: string;
  height: string;
  setCodeInput: Dispatch<SetStateAction<string>>;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  options,
  language,
  height,
  setCodeInput
}) => {
  const { theme } = useAppSelector((state) => state.theme);

  const handleEditorChange = (value: string | undefined) => {
    setCodeInput(value!);
  };

  return (
    <MonacoEditor
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      language={language}
      height={height}
      defaultValue={value}
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
    />
  );
};

export default CodeEditor;
